<?php
header('Content-Type: application/json; charset=utf-8');
function respond($s,$m='') { echo json_encode(['success'=>$s,'message'=>$m], JSON_UNESCAPED_UNICODE); exit; }
$razao = isset($_POST['razao']) ? trim($_POST['razao']) : '';
$cnpj = isset($_POST['cnpj']) ? preg_replace('/\D+/','',$_POST['cnpj']) : '';
$contato = isset($_POST['contato']) ? trim($_POST['contato']) : '';

if ($razao==='') respond(false,'Razão social obrigatória.');

$record=['id'=>time().rand(100,999),'razao'=>$razao,'cnpj'=>$cnpj,'contato'=>$contato,'created_at'=>date('c')];
$file=__DIR__.'/../cadastros/cadastroSupplier.txt'; if(!is_dir(dirname($file))) mkdir(dirname($file),0777,true);
$fp=fopen($file,'a'); if($fp && flock($fp,LOCK_EX)){ fwrite($fp,json_encode($record, JSON_UNESCAPED_UNICODE).PHP_EOL); fflush($fp); flock($fp,LOCK_UN); fclose($fp); respond(true,'Fornecedor cadastrado.'); }
respond(false,'Falha ao salvar fornecedor.');

?>
