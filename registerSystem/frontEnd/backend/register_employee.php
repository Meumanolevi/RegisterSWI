<?php
header('Content-Type: application/json; charset=utf-8');

function respond($success, $message = '', $fieldErrors = []){
    echo json_encode(['success'=>$success,'message'=>$message,'fieldErrors'=>$fieldErrors], JSON_UNESCAPED_UNICODE);
    exit;
}

function only_digits($s){ return preg_replace('/\D+/','',$s); }

$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$cpf = isset($_POST['cpf']) ? only_digits($_POST['cpf']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$senha = isset($_POST['senha']) ? $_POST['senha'] : '';
$cargo = isset($_POST['cargo']) ? trim($_POST['cargo']) : '';
$telefone = isset($_POST['telefone']) ? only_digits($_POST['telefone']) : '';

if ($nome === '') respond(false, 'Nome é obrigatório.', ['nome'=>'Informe o nome.']);
if (strlen($cpf) !== 11) respond(false, 'CPF inválido.', ['cpf'=>'Informe CPF com 11 dígitos.']);
if ($email === '') respond(false, 'E-mail é obrigatório.', ['email'=>'Informe o e-mail.']);

$record = [
    'id' => time() . rand(100,999),
    'nome'=>$nome,
    'cpf'=>$cpf,
    'email'=>$email,
    'senha'=>$senha,
    'cargo'=>$cargo,
    'telefone'=>$telefone,
    'created_at'=>date('c')
];

$file = __DIR__ . '/../cadastros/cadastroEmployee.txt';
$json = json_encode($record, JSON_UNESCAPED_UNICODE);
if (!is_dir(dirname($file))) mkdir(dirname($file),0777,true);
$fp = fopen($file,'a');
if ($fp && flock($fp, LOCK_EX)){
    fwrite($fp, $json . PHP_EOL);
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    respond(true, 'Cadastro de funcionário efetuado com sucesso.');
}
respond(false, 'Não foi possível salvar cadastro.');

?>
