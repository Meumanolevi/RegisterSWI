<?php
header('Content-Type: application/json; charset=utf-8');

$type = isset($_GET['type']) ? $_GET['type'] : '';
$map = [
    'client' => __DIR__ . '/../cadastros/cadastroClient.txt',
    'employee' => __DIR__ . '/../cadastros/cadastroEmployee.txt',
    'product' => __DIR__ . '/../cadastros/cadastroProduct.txt',
    'supplier' => __DIR__ . '/../cadastros/cadastroSupplier.txt',
    'user' => __DIR__ . '/../cadastros/cadastroUser.txt',
];

if (!isset($map[$type])){
    echo json_encode(['success'=>false,'message'=>'Type inválido','data'=>[]], JSON_UNESCAPED_UNICODE);
    exit;
}

$file = $map[$type];
$out = [];
if (is_readable($file)){
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $ln){
        $obj = json_decode($ln, true);
        if ($obj !== null) $out[] = $obj;
    }
}

echo json_encode(['success'=>true,'data'=>$out], JSON_UNESCAPED_UNICODE);
exit;

?>
