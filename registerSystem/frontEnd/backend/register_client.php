<?php
header('Content-Type: application/json; charset=utf-8');

function respond($success, $message = '', $fieldErrors = []){
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'fieldErrors' => $fieldErrors
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function only_digits($s){
    return preg_replace('/\D+/', '', $s);
}

function is_valid_cpf($cpf){
    $cpf = only_digits($cpf);
    if (strlen($cpf) != 11) return false;
    if (preg_match('/^(\d)\1{10}$/', $cpf)) return false;

    for ($t = 9; $t < 11; $t++){
        $sum = 0;
        for ($i = 0; $i < $t; $i++) {
            $sum += $cpf[$i] * (($t + 1) - $i);
        }
        $digit = ((10 * $sum) % 11) % 10;
        if ($cpf[$t] != $digit) return false;
    }
    return true;
}

function is_valid_cnpj($cnpj){
    $cnpj = only_digits($cnpj);
    if (strlen($cnpj) != 14) return false;
    if (preg_match('/^(\d)\1{13}$/', $cnpj)) return false;

    $lengths = [5,6];
    for ($i = 0; $i < 2; $i++){
        $sum = 0;
        $pos = $lengths[$i];
        for ($j = 0; $j < (12 + $i); $j++) {
            $sum += $cnpj[$j] * $pos;
            $pos--;
            if ($pos < 2) $pos = 9;
        }
        $rest = $sum % 11;
        $digit = ($rest < 2) ? 0 : 11 - $rest;
        if ($cnpj[12 + $i] != $digit) return false;
    }
    return true;
}

// collect expected fields from form
$fields = ['nome','cpf_cnpj','cep','email','senha','rua','numero','bairro','cidade','estado','celular'];
$data = [];
foreach ($fields as $f){
    $data[$f] = isset($_POST[$f]) ? trim($_POST[$f]) : '';
}

if ($data['cpf_cnpj'] === '') respond(false, 'CPF/CNPJ é obrigatório.', ['cpf_cnpj' => 'Informe CPF ou CNPJ.']);

$digits = only_digits($data['cpf_cnpj']);
if (strlen($digits) === 11) {
    if (!is_valid_cpf($digits)) respond(false, 'CPF inválido.', ['cpf_cnpj' => 'CPF inválido.']);
} elseif (strlen($digits) === 14) {
    if (!is_valid_cnpj($digits)) respond(false, 'CNPJ inválido.', ['cpf_cnpj' => 'CNPJ inválido.']);
} else {
    respond(false, 'CPF ou CNPJ com tamanho inválido.', ['cpf_cnpj' => 'CPF/CNPJ deve ter 11 (CPF) ou 14 (CNPJ) dígitos.']);
}

// basic validation for required fields
if ($data['nome'] === '') respond(false, 'Nome é obrigatório.', ['nome' => 'Informe o nome.']);
if ($data['email'] === '') respond(false, 'E-mail é obrigatório.', ['email' => 'Informe o e-mail.']);

// prepare record (store CPF/CNPJ digits-only)
$record = [
    'id' => time() . rand(100,999),
    'nome' => $data['nome'],
    'cpf_cnpj' => only_digits($data['cpf_cnpj']),
    'cep' => only_digits($data['cep']),
    'email' => $data['email'],
    'senha' => $data['senha'],
    'rua' => $data['rua'],
    'numero' => $data['numero'],
    'bairro' => $data['bairro'],
    'cidade' => $data['cidade'],
    'estado' => $data['estado'],
    'celular' => only_digits($data['celular']),
    'created_at' => date('c')
];

$file = __DIR__ . '/../cadastros/cadastroClient.txt';
$json = json_encode($record, JSON_UNESCAPED_UNICODE);
if ($json === false) respond(false, 'Erro ao serializar dados.');

// append as JSON line with locking
if (!is_dir(dirname($file))) {
    if (!mkdir(dirname($file), 0777, true)) respond(false, 'Não foi possível criar pasta de cadastros.');
}

$fp = fopen($file, 'a');
if (!$fp) respond(false, 'Não foi possível abrir arquivo de cadastro para escrita.');
if (flock($fp, LOCK_EX)){
    fwrite($fp, $json . PHP_EOL);
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    respond(true, 'Cadastro de cliente efetuado com sucesso.');
} else {
    fclose($fp);
    respond(false, 'Falha ao travar arquivo de cadastro. Tente novamente.');
}

?>
