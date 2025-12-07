<?php
header('Content-Type: text/plain');

echo "=== Network Diagnostic ===\n";
echo "Server IP: " . $_SERVER['SERVER_ADDR'] . "\n";
echo "PHP Version: " . phpversion() . "\n";
echo "OpenSSL: " . (extension_loaded('openssl') ? "Enabled" : "Disabled") . "\n\n";

$host = 'smtp.gmail.com';
$ports = [587, 465, 25];

echo "Resolving $host...\n";
$ip = gethostbyname($host);
echo "Resolved IP: $ip\n\n";

foreach ($ports as $port) {
    echo "Testing connection to $host:$port...\n";
    $start = microtime(true);
    $fp = @fsockopen($host, $port, $errno, $errstr, 5);
    $end = microtime(true);
    $duration = round(($end - $start) * 1000, 2);

    if ($fp) {
        echo "[SUCCESS] Connected in {$duration}ms\n";
        fclose($fp);
    } else {
        echo "[FAILURE] Error $errno: $errstr\n";
    }
    echo "\n";
}

echo "=== End Diagnostic ===\n";
