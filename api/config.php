<?php
/**
 * PESOLUTION API configuration for XAMPP
 */
declare(strict_types=1);

$envFile = dirname(__DIR__) . '/.env';
if (is_file($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
            continue;
        }
        [$key, $value] = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($value, " \t\"'");
    }
}

return [
    'db_host' => $_ENV['DB_HOST'] ?? 'localhost',
    'db_user' => $_ENV['DB_USER'] ?? 'root',
    'db_pass' => $_ENV['DB_PASSWORD'] ?? '',
    'db_name' => $_ENV['DB_NAME'] ?? 'pesolution',
    'gemini_key' => $_ENV['GEMINI_API_KEY'] ?? '',
    'powerbi_url' => $_ENV['POWER_BI_URL'] ?? $_ENV['POWERBI_EMBED_URL'] ?? '',
];
