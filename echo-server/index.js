import { WebSocketServer } from "ws";

startServer();

function startServer() {
    const wss = new WebSocketServer({ port: 8080, path: "/ws/api/v1" });
    wss.on("connection", onClientConnection);
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