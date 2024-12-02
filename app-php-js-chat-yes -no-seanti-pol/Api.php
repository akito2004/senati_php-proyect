<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Content-Type: application/json");

$metodo = $_SERVER['REQUEST_METHOD'];
$respuesta = [];

switch ($metodo) {
    case 'GET':
        $respuesta = [
            'mensaje' => 'El método HTTP utilizado es GET',
            'data' => $_GET
        ];
        break;

    case 'POST':
        $data_entrante = json_decode(file_get_contents('php://input'), true);
        $respuesta = [
            'mensaje' => 'El método HTTP utilizado es POST',
            'data' => $data_entrante
        ];
        break;

    case 'PUT':
        $data_entrante = json_decode(file_get_contents('php://input'), true);
        $respuesta = [
            'mensaje' => 'El método HTTP utilizado es PUT',
            'data' => $data_entrante
        ];
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $respuesta = [
                'mensaje' => 'El método HTTP utilizado es DELETE',
                'id_eliminado' => $_GET['id']
            ];
        } else {
            $respuesta = [
                'mensaje' => 'El método HTTP utilizado es DELETE, pero no se proporcionó un ID'
            ];
        }
        break;

    default:
        http_response_code(405);
        $respuesta = [
            'mensaje' => 'Método HTTP no permitido'
        ];
        break;
}

echo json_encode($respuesta);
