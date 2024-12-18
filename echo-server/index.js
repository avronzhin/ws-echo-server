import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080, path: "/ws/api/v1" });

wss.on("connection", (ws) => {
    console.log("Новый клиент подключился!");

    ws.on("message", (message) => {
        console.log("Получено сообщение от клиента: " + message);
        console.log("Отправка эхо-ответа");
        ws.send(message);
    });

    ws.on("close", () => {
        console.log("Клиент отключился");
    });
});
