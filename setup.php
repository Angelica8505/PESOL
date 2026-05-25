<?php
/**
 * One-time database setup for XAMPP
 * Open: http://localhost/PESOL/setup.php
 */
declare(strict_types=1);

$config = [
    'host' => 'localhost',
    'user' => 'root',
    'pass' => '',
    'name' => 'pesolution',
];

$envFile = __DIR__ . '/.env';
if (is_file($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
            continue;
        }
        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value, " \t\"'");
        if ($key === 'DB_HOST') $config['host'] = $value;
        if ($key === 'DB_USER') $config['user'] = $value;
        if ($key === 'DB_PASSWORD') $config['pass'] = $value;
        if ($key === 'DB_NAME') $config['name'] = $value;
    }
}

$messages = [];
$ok = true;

$tablesSql = [
    "CREATE TABLE IF NOT EXISTS `users` (
      `id` varchar(128) NOT NULL,
      `email` varchar(255) NOT NULL,
      `password_hash` varchar(255) NOT NULL,
      `name` varchar(255) DEFAULT NULL,
      `role` enum('applicant','employer','admin') DEFAULT 'applicant',
      `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
      `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
      PRIMARY KEY (`id`),
      UNIQUE KEY `email` (`email`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS `profiles` (
      `user_id` varchar(128) NOT NULL,
      `phone` varchar(20) DEFAULT NULL,
      `location` varchar(255) DEFAULT NULL,
      `bio` text DEFAULT NULL,
      `education` longtext DEFAULT NULL,
      `experience` longtext DEFAULT NULL,
      `skills` longtext DEFAULT NULL,
      `achievements` longtext DEFAULT NULL,
      PRIMARY KEY (`user_id`),
      CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS `bookmarks` (
      `user_id` varchar(128) NOT NULL,
      `job_ids` longtext DEFAULT NULL,
      PRIMARY KEY (`user_id`),
      CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS `jobs` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `employer_id` varchar(128) NOT NULL,
      `title` varchar(255) NOT NULL,
      `company` varchar(255) NOT NULL,
      `location` varchar(255) DEFAULT NULL,
      `type` varchar(50) DEFAULT NULL,
      `salary` varchar(100) DEFAULT NULL,
      `description` text DEFAULT NULL,
      `category` varchar(100) DEFAULT NULL,
      `posted_at` timestamp NOT NULL DEFAULT current_timestamp(),
      PRIMARY KEY (`id`),
      KEY `employer_id` (`employer_id`),
      CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`employer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS `applications` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `job_id` int(11) NOT NULL,
      `applicant_id` varchar(128) NOT NULL,
      `status` enum('pending','reviewed','shortlisted','hired','rejected') DEFAULT 'pending',
      `applied_at` timestamp NOT NULL DEFAULT current_timestamp(),
      PRIMARY KEY (`id`),
      KEY `job_id` (`job_id`),
      KEY `applicant_id` (`applicant_id`),
      CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
      CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`applicant_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
];

try {
    $pdo = new PDO(
        sprintf('mysql:host=%s;charset=utf8mb4', $config['host']),
        $config['user'],
        $config['pass'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $pdo->exec('SET FOREIGN_KEY_CHECKS = 0');
    $pdo->exec("DROP DATABASE IF EXISTS `{$config['name']}`");
    $pdo->exec("CREATE DATABASE `{$config['name']}` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci");
    $pdo->exec("USE `{$config['name']}`");
    $pdo->exec('SET FOREIGN_KEY_CHECKS = 1');
    $messages[] = 'Recreated database for fresh MySQL install.';

    foreach ($tablesSql as $sql) {
        $pdo->exec($sql);
    }
    $messages[] = 'Database tables created successfully.';

    $demoPassword = password_hash('password123', PASSWORD_DEFAULT);
    $demos = [
        ['id' => 'demo_applicant_001', 'email' => 'applicant@demo.com', 'name' => 'Juan Dela Cruz', 'role' => 'applicant'],
        ['id' => 'demo_employer_001', 'email' => 'employer@demo.com', 'name' => 'Lipa Tech HR', 'role' => 'employer'],
        ['id' => 'demo_admin_001', 'email' => 'admin@demo.com', 'name' => 'PESO Admin', 'role' => 'admin'],
    ];

    foreach ($demos as $demo) {
        $ins = $pdo->prepare(
            'INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)'
        );
        $ins->execute([$demo['id'], $demo['email'], $demoPassword, $demo['name'], $demo['role']]);

        $prof = $pdo->prepare(
            'INSERT INTO profiles (user_id, location, bio, skills, experience, education, achievements)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $prof->execute([
            $demo['id'],
            'Lipa City, Batangas',
            'PESOLUTION demo account',
            '[]',
            '[]',
            '[]',
            '[]',
        ]);
        $messages[] = "Demo user: {$demo['email']} / password123";
    }
} catch (Throwable $e) {
    $ok = false;
    $messages[] = 'Error: ' . $e->getMessage();
}

?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PESOLUTION Setup</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 640px; margin: 3rem auto; padding: 0 1.5rem; }
    .ok { color: #047857; } .err { color: #b91c1c; }
    a { color: #2563eb; font-weight: 600; }
    li { margin: 0.5rem 0; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>PESOLUTION — XAMPP Setup</h1>
  <p class="<?= $ok ? 'ok' : 'err' ?>"><?= $ok ? 'Setup complete.' : 'Setup failed.' ?></p>
  <ul>
    <?php foreach ($messages as $msg): ?>
      <li><?= htmlspecialchars($msg) ?></li>
    <?php endforeach; ?>
  </ul>
  <?php if ($ok): ?>
    <p>Open the app: <a href="/PESOL/">http://localhost/PESOL/</a></p>
  <?php endif; ?>
</body>
</html>
