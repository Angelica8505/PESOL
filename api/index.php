<?php
declare(strict_types=1);

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/PESOL/',
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/database.php';
require_once __DIR__ . '/gemini.php';

$config = require __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = trim((string)($_GET['route'] ?? ''), '/');
if ($path === '') {
    $uri = $_SERVER['REQUEST_URI'] ?? '/';
    $path = parse_url($uri, PHP_URL_PATH) ?? '';
    $path = preg_replace('#^.*/api#', '', $path);
    $path = trim($path, '/');
}

function jsonResponse(array $data, int $code = 200): void
{
    http_response_code($code);
    echo json_encode($data);
    exit;
}

function jsonError(string $message, int $code = 400): void
{
    jsonResponse(['error' => $message], $code);
}

function requireAuth(): array
{
    if (empty($_SESSION['user_id'])) {
        jsonError('Unauthorized', 401);
    }
    return [
        'id' => $_SESSION['user_id'],
        'email' => $_SESSION['email'] ?? '',
        'name' => $_SESSION['name'] ?? '',
        'role' => $_SESSION['role'] ?? 'applicant',
    ];
}

function userPayload(array $row): array
{
    return [
        'id' => $row['id'],
        'email' => $row['email'],
        'name' => $row['name'] ?? '',
        'role' => $row['role'],
    ];
}

function profilePayload(array $user, ?array $profile): array
{
    return [
        'id' => $user['id'],
        'email' => $user['email'],
        'full_name' => $user['name'] ?? '',
        'role' => $user['role'],
        'location' => $profile['location'] ?? null,
        'avatar' => null,
    ];
}

function fullProfilePayload(array $user, ?array $profile): array
{
    $decode = static function (?string $json): array {
        if (!$json) {
            return [];
        }
        $data = json_decode($json, true);
        return is_array($data) ? $data : [];
    };

    return [
        'id' => $user['id'],
        'name' => $user['name'] ?? '',
        'email' => $user['email'],
        'phone' => $profile['phone'] ?? '',
        'location' => $profile['location'] ?? '',
        'about' => $profile['bio'] ?? '',
        'skills' => $decode($profile['skills'] ?? null),
        'experience' => $decode($profile['experience'] ?? null),
        'education' => $decode($profile['education'] ?? null),
        'achievements' => $decode($profile['achievements'] ?? null),
    ];
}

try {
    $db = getDb();
} catch (Throwable $e) {
    jsonError('Database connection failed. Run setup.php first.', 500);
}

$body = [];
if ($method === 'POST' || $method === 'PUT') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw ?: '{}', true) ?? [];
}

// --- Routes ---

if ($path === 'health' && $method === 'GET') {
    jsonResponse(['status' => 'ok', 'database' => 'mysql', 'secured' => true]);
}

if ($path === 'auth/register' && $method === 'POST') {
    $email = strtolower(trim($body['email'] ?? ''));
    $password = $body['password'] ?? '';
    $name = trim($body['name'] ?? '');
    $role = $body['role'] ?? 'applicant';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonError('Invalid email address');
    }
    if (strlen($password) < 6) {
        jsonError('Password must be at least 6 characters');
    }
    if (!in_array($role, ['applicant', 'employer', 'admin'], true)) {
        jsonError('Invalid role');
    }

    $check = $db->prepare('SELECT id FROM users WHERE email = ?');
    $check->execute([$email]);
    if ($check->fetch()) {
        jsonError('Email already registered', 409);
    }

    $id = bin2hex(random_bytes(16));
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $insert = $db->prepare(
        'INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)'
    );
    $insert->execute([$id, $email, $hash, $name, $role]);

    $profileInsert = $db->prepare(
        'INSERT INTO profiles (user_id, skills, experience, education, achievements)
         VALUES (?, ?, ?, ?, ?)'
    );
    $profileInsert->execute([$id, '[]', '[]', '[]', '[]']);

    $_SESSION['user_id'] = $id;
    $_SESSION['email'] = $email;
    $_SESSION['name'] = $name;
    $_SESSION['role'] = $role;

    $user = userPayload(['id' => $id, 'email' => $email, 'name' => $name, 'role' => $role]);
    jsonResponse([
        'user' => $user,
        'profile' => profilePayload($user, null),
    ], 201);
}

if ($path === 'auth/login' && $method === 'POST') {
    $email = strtolower(trim($body['email'] ?? ''));
    $password = $body['password'] ?? '';

    $stmt = $db->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $row = $stmt->fetch();

    if (!$row || !password_verify($password, $row['password_hash'])) {
        jsonError('Invalid email or password', 401);
    }

    $_SESSION['user_id'] = $row['id'];
    $_SESSION['email'] = $row['email'];
    $_SESSION['name'] = $row['name'];
    $_SESSION['role'] = $row['role'];

    $prof = $db->prepare('SELECT * FROM profiles WHERE user_id = ?');
    $prof->execute([$row['id']]);
    $profileRow = $prof->fetch() ?: null;

    $user = userPayload($row);
    jsonResponse([
        'user' => $user,
        'profile' => profilePayload($user, $profileRow),
    ]);
}

if ($path === 'auth/logout' && $method === 'POST') {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    session_destroy();
    jsonResponse(['ok' => true]);
}

if ($path === 'auth/me' && $method === 'GET') {
    if (empty($_SESSION['user_id'])) {
        jsonResponse(['user' => null, 'profile' => null]);
    }

    $stmt = $db->prepare('SELECT * FROM users WHERE id = ?');
    $stmt->execute([$_SESSION['user_id']]);
    $row = $stmt->fetch();
    if (!$row) {
        jsonResponse(['user' => null, 'profile' => null]);
    }

    $prof = $db->prepare('SELECT * FROM profiles WHERE user_id = ?');
    $prof->execute([$row['id']]);
    $profileRow = $prof->fetch() ?: null;

    $user = userPayload($row);
    jsonResponse([
        'user' => $user,
        'profile' => profilePayload($user, $profileRow),
    ]);
}

if ($path === 'profile' && $method === 'GET') {
    $auth = requireAuth();
    $stmt = $db->prepare('SELECT * FROM profiles WHERE user_id = ?');
    $stmt->execute([$auth['id']]);
    $profileRow = $stmt->fetch() ?: null;
    jsonResponse(['profile' => fullProfilePayload($auth, $profileRow)]);
}

if ($path === 'profile' && ($method === 'PUT' || $method === 'POST')) {
    $auth = requireAuth();
    $skills = json_encode($body['skills'] ?? []);
    $experience = json_encode($body['experience'] ?? []);
    $education = json_encode($body['education'] ?? []);
    $achievements = json_encode($body['achievements'] ?? []);

    $stmt = $db->prepare(
        'UPDATE profiles SET phone = ?, location = ?, bio = ?, skills = ?, experience = ?, education = ?, achievements = ?
         WHERE user_id = ?'
    );
    $stmt->execute([
        $body['phone'] ?? '',
        $body['location'] ?? '',
        $body['about'] ?? $body['bio'] ?? '',
        $skills,
        $experience,
        $education,
        $achievements,
        $auth['id'],
    ]);

    if ($stmt->rowCount() === 0) {
        $ins = $db->prepare(
            'INSERT INTO profiles (user_id, phone, location, bio, skills, experience, education, achievements)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $ins->execute([
            $auth['id'],
            $body['phone'] ?? '',
            $body['location'] ?? '',
            $body['about'] ?? '',
            $skills,
            $experience,
            $education,
            $achievements,
        ]);
    }

    if (!empty($body['name'])) {
        $u = $db->prepare('UPDATE users SET name = ? WHERE id = ?');
        $u->execute([trim($body['name']), $auth['id']]);
        $_SESSION['name'] = trim($body['name']);
    }

    $userStmt = $db->prepare('SELECT * FROM users WHERE id = ?');
    $userStmt->execute([$auth['id']]);
    $userRow = $userStmt->fetch();

    $prof = $db->prepare('SELECT * FROM profiles WHERE user_id = ?');
    $prof->execute([$auth['id']]);
    $profileRow = $prof->fetch() ?: null;

    jsonResponse(['profile' => fullProfilePayload($userRow, $profileRow)]);
}

if ($path === 'bookmarks' && $method === 'GET') {
    $auth = requireAuth();
    $stmt = $db->prepare('SELECT job_ids FROM bookmarks WHERE user_id = ?');
    $stmt->execute([$auth['id']]);
    $row = $stmt->fetch();
    $ids = [];
    if ($row && $row['job_ids']) {
        $decoded = json_decode($row['job_ids'], true);
        $ids = is_array($decoded) ? $decoded : [];
    }
    jsonResponse(['jobIds' => $ids]);
}

if ($path === 'bookmarks/toggle' && $method === 'POST') {
    $auth = requireAuth();
    $jobId = (string)($body['jobId'] ?? '');
    if ($jobId === '') {
        jsonError('jobId required');
    }

    $stmt = $db->prepare('SELECT job_ids FROM bookmarks WHERE user_id = ?');
    $stmt->execute([$auth['id']]);
    $row = $stmt->fetch();
    $ids = [];
    if ($row && $row['job_ids']) {
        $decoded = json_decode($row['job_ids'], true);
        $ids = is_array($decoded) ? array_map('strval', $decoded) : [];
    }

    $wasBookmarked = in_array($jobId, $ids, true);
    if ($wasBookmarked) {
        $ids = array_values(array_filter($ids, fn($id) => $id !== $jobId));
    } else {
        $ids[] = $jobId;
    }

    $json = json_encode($ids);
    if ($row) {
        $up = $db->prepare('UPDATE bookmarks SET job_ids = ? WHERE user_id = ?');
        $up->execute([$json, $auth['id']]);
    } else {
        $ins = $db->prepare('INSERT INTO bookmarks (user_id, job_ids) VALUES (?, ?)');
        $ins->execute([$auth['id'], $json]);
    }

    jsonResponse(['jobIds' => $ids, 'bookmarked' => !$wasBookmarked]);
}

// AI endpoints (Gemini via .env GEMINI_API_KEY)
if (str_starts_with($path, 'ai/')) {
    $lang = ($body['language'] ?? 'en') === 'tl' ? 'tl' : 'en';
    $geminiKey = $config['gemini_key'] ?? '';

    if ($path === 'ai/roadmap' && $method === 'POST') {
        $gaps = $body['skillGaps'] ?? [];
        $fallback = $lang === 'tl'
            ? [
                'Mag-enroll sa TESDA Lipa para sa NC-II certifications na tumutugma sa iyong skill gaps.',
                'Bisitahin ang PESO Lipa Skill-Boost Hub para sa career coaching at local job fairs.',
                'Mag-apply sa mga trabaho sa LIMA Technology Center at local BPOs sa Lipa City.',
                'I-update ang iyong PESOLUTION profile araw-araw para mas tumaas ang match score.',
            ]
            : [
                'Enroll at TESDA Lipa for NC-II certifications aligned with your skill gaps.',
                'Visit the PESO Lipa Skill-Boost Hub for coaching and local job fair schedules.',
                'Apply to roles at LIMA Technology Center and Lipa City BPO employers.',
                'Update your PESOLUTION profile regularly to improve your employability match score.',
            ];

        $result = $geminiKey ? geminiGenerate($geminiKey, geminiRoadmapPrompt($body, $lang), true) : null;
        if ($result && !empty($result['roadmap']) && is_array($result['roadmap'])) {
            jsonResponse(['roadmap' => array_slice(array_values($result['roadmap']), 0, 4)]);
        }
        if (is_array($gaps) && count($gaps) > 0) {
            $gapText = implode(', ', $gaps);
            $fallback[0] = $lang === 'tl'
                ? "Unahin ang pag-aaral ng: $gapText sa TESDA Lipa."
                : "Prioritize learning: $gapText through TESDA Lipa programs.";
        }
        jsonResponse(['roadmap' => $fallback]);
    }

    if ($path === 'ai/recommendations' && $method === 'POST') {
        $gaps = is_array($body['gaps'] ?? null) ? $body['gaps'] : [];
        $gaps = array_values(array_filter($gaps, fn($g) => is_string($g) && trim($g) !== ''));

        if (count($gaps) === 0) {
            jsonResponse([
                'gapRoadmaps' => [],
                'message' => $lang === 'tl'
                    ? 'Perpekto ang iyong mga kasanayan para sa trabahong ito!'
                    : 'You have a perfect match for this role!',
            ]);
        }

        $result = $geminiKey ? geminiGenerate($geminiKey, geminiJobGapRoadmapPrompt($body, $lang), true) : null;
        if ($result && !empty($result['gapRoadmaps']) && is_array($result['gapRoadmaps'])) {
            jsonResponse(['gapRoadmaps' => $result['gapRoadmaps']]);
        }
        jsonResponse(['gapRoadmaps' => fallbackJobGapRoadmaps($gaps, $lang)]);
    }

    if ($path === 'ai/chat' && $method === 'POST') {
        $messages = $body['messages'] ?? [];
        if (!is_array($messages)) {
            $messages = [];
        }
        $messages = array_values(array_filter($messages, function ($m) {
            return is_array($m)
                && in_array($m['role'] ?? '', ['user', 'assistant'], true)
                && is_string($m['content'] ?? null)
                && trim($m['content']) !== '';
        }));
        $messages = array_slice($messages, -12);
        foreach ($messages as &$m) {
            $m['content'] = mb_substr(trim($m['content']), 0, 2000);
        }
        unset($m);

        $lastUser = '';
        for ($i = count($messages) - 1; $i >= 0; $i--) {
            if (($messages[$i]['role'] ?? '') === 'user') {
                $lastUser = $messages[$i]['content'];
                break;
            }
        }
        if ($lastUser === '') {
            jsonError('Message is required', 400);
        }

        $result = $geminiKey ? geminiGenerate($geminiKey, geminiLandingChatPrompt($messages, $lang), true) : null;
        if ($result && !empty($result['reply']) && is_string($result['reply'])) {
            jsonResponse(['reply' => trim($result['reply'])]);
        }

        jsonResponse(['reply' => fallbackLandingChatReply($lastUser, $lang)]);
    }

    if ($path === 'ai/extract' && $method === 'POST') {
        $text = $body['text'] ?? '';
        if ($geminiKey && $text) {
            $prompt = 'Extract resume data as JSON with keys: name, email, location, education[], experience[], skills[]. Use gender-neutral language. Location: City, Province only. Resume: ' . substr($text, 0, 12000);
            $result = geminiGenerate($geminiKey, $prompt, true);
            if ($result) {
                jsonResponse($result);
            }
        }
        jsonResponse([
            'name' => '',
            'email' => '',
            'location' => 'Lipa City, Batangas',
            'education' => [],
            'experience' => [],
            'skills' => [],
        ]);
    }
}

if ($path === 'analytics/powerbi' && $method === 'GET') {
    jsonResponse([
        'embedUrl' => $config['powerbi_url'] ?? 'https://app.powerbi.com/view?r=eyJrIjoi...',
    ]);
}

jsonError('Not found', 404);
