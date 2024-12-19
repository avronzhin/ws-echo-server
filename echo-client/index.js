const WebSocket = require("ws");
const readline = require("readline");

const serverUrl = "ws:/localhost:8080/ws/api/v1";
var client = null;
var connecting = false;
var connected = false;


const consoleInterface = createConsoleInterface();
printMenuText();
consoleInterface.prompt();

function createConsoleInterface() {
    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ""
    })
    readlineInterface.on("line", onConsoleLine);
    readlineInterface.on("close", onConsoleClose);
    return readlineInterface;
}

function onConsoleLine(line) {
    line = line.trim();
    if (connecting) {
        console.log("Подождите! Идет настройка соединения");
    }

    if (connected) {
        handleLineInSession(line);
    } else {
        handleLineInMenu(line);
    }
    consoleInterface.prompt();
}

function handleLineInMenu(line) {
    const command = line;
    switch (command) {
        case "help":
            printHelp();
            break;
        case "connect":
            connect();
            break;
        case "exit":
            consoleInterface.close()
            break;
        default:
            console.log("Неизвестная команда")
            break;
    }
}

function printHelp() {
    console.log("connect - для подключения к серверу")
    console.log("exit - для закрытия приложения")
    console.log("help - для вывода возможных команд")
}

function connect() {
    console.log("Установка соединения с " + serverUrl);
    client = new WebSocket(serverUrl);
    client.on("open", onConnectionOpen);
    client.on("message", onServerMessage);
    client.on("error", console.error);
    connecting = true;
}

function onConnectionOpen() {
    console.log("Установка успешно выполнена. Можете отправлять сообщения. Для отсоединения введите !q")
    connected = true;
    connecting = false;
}

function onServerMessage(message) {
    console.log("Пришло сообщение от сервера: " + message)
}

function handleLineInSession(line) {
    if (line === "!q") {
        disconect();
    } else {
        sendMessage(line);
    }
}

function disconect() {
    console.log("Остановка соединения с сервером");
    client.close();
    client = null;

    printMenuText();
    connected = false;
}

function sendMessage(message) {
    console.log("Отправка сообщения: " + message);
    client.send(message);
}

function onConsoleClose() {
    console.log("Завершение работы программы");
    process.exit(0);
}

function printMenuText() {
    console.log("Вы в меню, для вывода списка возможных команд введите help")
}