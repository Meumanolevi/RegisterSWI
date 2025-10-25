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

$cpf_cnpj = isset($_POST['cpf_cnpj']) ? trim($_POST['cpf_cnpj']) : '';

if ($cpf_cnpj === '') respond(false, 'CPF/CNPJ é obrigatório.', ['cpf_cnpj' => 'Informe CPF ou CNPJ.']);

$digits = only_digits($cpf_cnpj);
if (strlen($digits) === 11) {
    if (!is_valid_cpf($digits)) respond(false, 'CPF inválido.', ['cpf_cnpj' => 'CPF inválido.']);
    respond(true, 'CPF válido.');
} elseif (strlen($digits) === 14) {
    if (!is_valid_cnpj($digits)) respond(false, 'CNPJ inválido.', ['cpf_cnpj' => 'CNPJ inválido.']);
    respond(true, 'CNPJ válido.');
} else {
    respond(false, 'CPF ou CNPJ com tamanho inválido.', ['cpf_cnpj' => 'CPF/CNPJ deve ter 11 (CPF) ou 14 (CNPJ) dígitos.']);
}
?>
