var canvas = document.getElementById('signature');
var ctx = canvas.getContext('2d');
/* Перетворює координати на реальні у тезі Canvas */
function getRealMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
var pos = { x: 0, y: 0 };
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', setPosition);
canvas.addEventListener('mouseenter', setPosition);
document.getElementById('changeSizeBut').addEventListener('click', changeCanvasSize);
document.getElementById('clearCanvasBut').addEventListener('click', clearCanvas);
document.getElementById('sendToServerBut').addEventListener('click', sendToServer);
function sendToServer(e)
{
    var dataURL = canvas.toDataURL();
    fetch("http://localhost:8000/", {
        method: "POST",
        body: dataURL
    }).then(d => d.json()).then(d =>
    {
        document.getElementById('result').innerHTML = d.status;
    });
}
function clearCanvas(e)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function changeCanvasSize(e)
{
    canvas.setAttribute('width', parseInt(document.getElementById('canvasWidth').value));
    canvas.setAttribute('height', parseInt(document.getElementById('canvasHeight').value));
}
function setPosition(e) {
    pos = getRealMousePos(canvas, e);
}
function draw(e) {
    if (e.buttons !== 1)
        return;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}