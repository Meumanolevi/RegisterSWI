<?php
header('Content-Type: application/json; charset=utf-8');
function respond($s,$m='') { echo json_encode(['success'=>$s,'message'=>$m], JSON_UNESCAPED_UNICODE); exit; }
$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$codigo = isset($_POST['codigo']) ? trim($_POST['codigo']) : '';
$preco = isset($_POST['preco']) ? trim($_POST['preco']) : '';
$qtd = isset($_POST['quantidade']) ? trim($_POST['quantidade']) : '';

if ($nome==='') respond(false,'Nome do produto é obrigatório.');

$record=['id'=>time().rand(100,999),'nome'=>$nome,'codigo'=>$codigo,'preco'=>$preco,'quantidade'=>$qtd,'created_at'=>date('c')];
$file = __DIR__.'/../cadastros/cadastroProduct.txt';
if (!is_dir(dirname($file))) mkdir(dirname($file),0777,true);
$fp=fopen($file,'a');
if ($fp && flock($fp,LOCK_EX)){
    fwrite($fp,json_encode($record, JSON_UNESCAPED_UNICODE).PHP_EOL);
    fflush($fp); flock($fp,LOCK_UN); fclose($fp); respond(true,'Produto cadastrado.');
}
respond(false,'Falha ao salvar produto.');

?>
