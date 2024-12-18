import { WebSocketServer } from "ws";

const port = 8080;
const path = "/ws/api/v1";

startServer();

function startServer() {
    const wss = new WebSocketServer({ port: port, path: path });
    wss.on("connection", onClientConnection);
    console.log("Сервер запущен на порту " + port + ". Подключение для клиентов доступно по пути " + path);
}

function onClientConnection(ws) {
    console.log("Новый клиент подключился!");
    ws.on("message", (message) => onClientMessage(ws, message));
    ws.on("close", onClientClose);
}

function onClientMessage(ws, message) {
    console.log("Получено сообщение от клиента: " + message);
    console.log("Отправка эхо-ответа");
    ws.send(message);
}

function onClientClose() {
    console.log("Клиент отключился");
}