const { WebSocketServer } = require("ws");

const port = 8080;
const path = "/ws/api/v1";

startServer();

function startServer() {
    const wss = new WebSocketServer({ port: port, path: path });
    wss.on("connection", onClientConnection);
    console.log("Сервер запущен на порту " + port + ". Подключение для клиентов доступно по пути " + path);
}

function onClientConnection(webSocket) {
    console.log("Новый клиент подключился!");
    webSocket.on("message", (message) => onClientMessage(webSocket, message));
    webSocket.on("close", onClientClose);
    webSocket.on("error", console.error);
}

function onClientMessage(webSocket, message) {
    console.log("Получено сообщение от клиента: " + message);
    sendMessage(webSocket, message);
}

function sendMessage(webSocket, message) {
    console.log("Отправка эхо-ответа");
    webSocket.send(message);
}

function onClientClose() {
    console.log("Клиент отключился");
}