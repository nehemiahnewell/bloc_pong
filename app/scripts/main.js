var pong_canvas = document.getElementById('pong_table');
var size = (pong_canvas.clientWidth > pong_canvas.clientHeight) ? pong_canvas.clientHeight : pong_canvas.clientWidth;
pong_canvas.width = size;
pong_canvas.height = size;
var pong_context = pong_canvas.getContext("2d");

function paddle(direction, position, length) {
  pong_context.beginPath();
  pong_context.arc(position, length/2, length/8, 1.5 * Math.PI, .5 * Math.PI, direction);
  pong_context.lineWidth = 10;
  pong_context.strokeStyle = 'black';
  pong_context.stroke();
}
/*paddle.render = function()
{
  pong_context.strokeStyle = 'black';
  pong_context.stroke();
};*/

function pong_ball(position, length) {
  pong_context.beginPath();
  pong_context.arc(position, length/2, length/30, 0, 2 * Math.PI, false);
  pong_context.fillStyle = 'DarkGoldenRod';
  pong_context.fill();
} 
/*pong_ball.render = function()
{
  pong_context.fillStyle = 'DarkGoldenRod';
  pong_context.fill();
};*/

/*function render()
{
  var player = new paddle(false,10,size);
  var enemy = new paddle(true,size - 10,size);
  var ball = new pong_ball(size/2,size);
}*/
var player = new paddle(false,10,size);
var enemy = new paddle(true,size - 10,size);
var ball = new pong_ball(size/2,size);