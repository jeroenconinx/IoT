const socket = new WebSocket('ws://localhost:3000');

socket.onopen = function(event) {
    console.log("ws connection!");
}

var markerX = 245;
var markerY = 185;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 5;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(markerX, markerY, 17, 0, 2 * Math.PI);
    ctx.fillStyle = 'aqua';
    ctx.fill();
}

socket.onmessage = function (event) {
    const data = event.data;
    const coordinate = JSON.parse(data);
    markerX = coordinate.x*2;
    markerY = coordinate.y*2;
    requestAnimationFrame(draw);
}


document.addEventListener('DOMContentLoaded', function () {
    const rectangle = document.querySelector("canvas");

    rectangle.addEventListener('click', function (event) {
        const rect = rectangle.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        const xPos = Math.floor(clickX/2)
        const yPos = Math.floor(clickY/2)

        // Check if click is within the rectangle
        if (clickX >= 0 && clickX <= rect.width && clickY >= 0 && clickY <= rect.height) {
            const body = JSON.stringify({
                'x': xPos,
                'y': yPos 
            })
            fetch("http://localhost:3000/set", {
                method: "POST",
                body: body,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                mode: 'cors'
            });
            console.log(body)
        }
    });
});