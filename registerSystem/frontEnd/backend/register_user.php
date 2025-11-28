<?php
header('Content-Type: application/json; charset=utf-8');
function respond($s,$m='') { echo json_encode(['success'=>$s,'message'=>$m], JSON_UNESCAPED_UNICODE); exit; }
$user = isset($_POST['username']) ? trim($_POST['username']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$senha = isset($_POST['senha']) ? $_POST['senha'] : '';

if ($user==='') respond(false,'Nome de usuário é obrigatório.');
if ($email==='') respond(false,'E-mail é obrigatório.');

$record=['id'=>time().rand(100,999),'username'=>$user,'email'=>$email,'senha'=>$senha,'created_at'=>date('c')];
$file=__DIR__.'/../cadastros/cadastroUser.txt'; if(!is_dir(dirname($file))) mkdir(dirname($file),0777,true);
$fp=fopen($file,'a'); if($fp && flock($fp,LOCK_EX)){ fwrite($fp,json_encode($record, JSON_UNESCAPED_UNICODE).PHP_EOL); fflush($fp); flock($fp,LOCK_UN); fclose($fp); respond(true,'Usuário cadastrado.'); }
respond(false,'Falha ao salvar usuário.');

?>
