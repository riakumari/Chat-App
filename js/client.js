const socket = io('http://localhost:8000');

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector(".container");

const  append  = (message , position) =>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    if(messageInput.value != ""){
    append(`You: ${message}`,'left');
    socket.emit('send', message);
    messageInput.value = ''
    }
})

const name = prompt("Enter your name to join");

socket.emit('new-user-joined' , name);

socket.on('user-joined' , name =>{
    if(name != null){
        append(`${name} joined the chat`, 'right')
    }
})

socket.on('recieve' , data =>{
    if(name != null){
        append(`${data.name}: ${data.message}`,'right')
    }
})

socket.on('left', name => {
    if(name != null){
        append(`${name}: left the chat`, 'right')
    }
})