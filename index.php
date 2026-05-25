<?php
/**
 * Fallback entry when dist/ is not built yet.
 * After running `npm run build`, Apache serves dist/index.html via .htaccess.
 */
$distIndex = __DIR__ . '/dist/index.html';
if (is_file($distIndex)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($distIndex);
    exit;
}
?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PESOLUTION — Setup Required</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f4f6fb; color: #0f172a; padding: 2rem; }
    .card { max-width: 520px; background: #fff; border-radius: 24px; padding: 2rem; box-shadow: 0 20px 50px rgba(37,99,235,.12); border: 1px solid #e2e8f0; }
    h1 { margin: 0 0 .5rem; font-size: 1.5rem; }
    .logo { width: 48px; height: 48px; background: #2563eb; color: #fff; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.25rem; margin-bottom: 1rem; }
    ol { padding-left: 1.25rem; line-height: 1.7; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 6px; font-size: .9em; }
    a { color: #2563eb; font-weight: 600; }
    .ok { color: #047857; font-weight: 600; }
    .warn { color: #b45309; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">P</div>
    <h1>PESOLUTION backend is ready</h1>
    <p class="warn">The React frontend has not been built yet (<code>dist/index.html</code> missing).</p>
    <p>Free some disk space on <strong>C:</strong>, then in the PESOL folder run:</p>
    <ol>
      <li><code>npm run build</code></li>
      <li>Open <a href="/PESOL/setup.php">setup.php</a> to create the MySQL database</li>
      <li>Reload <a href="/PESOL/">http://localhost/PESOL/</a></li>
    </ol>
    <p class="ok">API status: <a href="/PESOL/api/health">/PESOL/api/health</a></p>
  </div>
</body>
</html>
