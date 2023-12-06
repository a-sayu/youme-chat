// login elements

const loginApelido = localStorage.getItem('login-apelido');
const loginPsw = localStorage.getItem('login-password');
const loginColor = localStorage.getItem('login-color')

// chat elements

const chat = document.querySelector(".chat");
const chatForm = chat.querySelector(".chat__form");
const chatInput = chat.querySelector(".chat__input");
const chatMessages = chat.querySelector(".chat__messages");

const user = { id: "", name: "", color: "" }

let websocket

const createMessageSelfElement = (content) => {
    const div = document.createElement("div")

    div.classList.add("message--self")
    div.innerHTML = content

    return div
}

const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("message--other")

    div.classList.add("message--self")
    span.classList.add("message--sender")
    span.style.color = senderColor

    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content

    return div
}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

const processMessage = ({ data }) => {
    const { userId, userName, userColor, content } = JSON.parse(data)

    const message = userId == user.id ? createMessageSelfElement(content) : createMessageOtherElement(content, userName, userColor)

    chatMessages.appendChild(message)
    scrollScreen()
}

user.name = loginApelido;
user.id = crypto.randomUUID();
user.color = loginColor;

websocket = new WebSocket("wss://chat-backend-2zfg.onrender.com")
websocket.onmessage = processMessage

const sendMessage = (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }

    websocket.send(JSON.stringify(message))

    chatInput.value = ""
}

chatForm.addEventListener("submit", sendMessage)