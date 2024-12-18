import WebSocket from "ws";
import readline from "readline";
import { on } from "events";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ""
})

var serverUrl = "ws:/localhost:8080/ws/api/v1";

var client

rl.prompt();

console.log("Вы в меню, для вывода списка возможных комманд введите help")
var online = false
rl.on("line", (line) => {
    const arg = line.trim()
    if (!online) {
        switch (arg) {
            case "help":
                console.log("connect - для подключения к серверу")
                console.log("exit - для закрытия приложения")
                console.log("help - для вывода возможных комманд")
                break;
            case "connect":
                console.log("Установка соединения с " + serverUrl)
                client = new WebSocket(serverUrl);
                client.on("message", (message) => {
                    console.log("Пришло сообщение от сервера: " + message)
                })

                client.on("open", () => {
                    console.log("Установка успешно выполнена. Можете отправлять сообщения. Для отключения введите !q")
                })
                online = true
                break;
            case "exit":
                rl.close()
                break;
        }
    } else {
        if (arg === "!q") {
            online = false
            console.log("Остановка соединения с сервером")
            client.close()
            client = null
            console.log("Вы в меню, для вывода списка возможных комманд введите help")
        } else {
            console.log("Отправка сообщения: " + arg)
            client.send(arg)
        }
    }
    rl.prompt();
})

rl.on("close", () => {
    console.log("Завершение работы программы")
    process.exit(0);
})