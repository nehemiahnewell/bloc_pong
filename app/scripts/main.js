//setting up the board goes here

var pong_canvas = document.getElementById('pong_table');
var size = (pong_canvas.clientWidth > pong_canvas.clientHeight) ? pong_canvas.clientHeight : pong_canvas.clientWidth;
pong_canvas.width = size;
pong_canvas.height = size;
var pong_context = pong_canvas.getContext("2d");

function draw_background() {
  pong_context.fillStyle = 'chartreuse';
  pong_context.fillRect(0, 0, size, size);
}

function paddle(position, length) {
  this.measure = length;
  this.column = position;
  this.row = this.measure/2;
  this.paddle_size = this.measure/10;
  this.step = length/40;
  this.move = function(direction)
  {
    if(direction === "up")
    {
      this.row = this.row - this.step;
      if(this.row < (this.step * 2))
      {
        this.row = (this.step * 2);
      }
    }
    if(direction === "down")
      {
      this.row = this.row + this.step;
      if(this.row > (this.measure - (this.step * 2)))
      {
        this.row = (this.measure - (this.step * 2));
      }
    }
  };
  this.render = function()
  {
    pong_context.beginPath();
    pong_context.moveTo(this.column, (this.row - (this.step * 2)));
    pong_context.lineTo(this.column, (this.row + (this.step * 2)));
    pong_context.lineWidth = 10;
    pong_context.strokeStyle = 'black';
    pong_context.stroke();
  };
}

function pong_ball(position, length) {
  this.measure = length;
  this.column = position;
  this.row = this.measure/2;
  this.step = length/40;
  this.render = function()
  {
    pong_context.beginPath();
    pong_context.arc(this.column, this.row, this.step, 0, 2 * Math.PI, false);
    pong_context.fillStyle = 'DarkGoldenRod';
    pong_context.fill();
  };
} 

var player = new paddle(10,size);
var enemy = new paddle(size - 10,size);
var ball = new pong_ball(size/2,size);

function render ()
{
  draw_background();
  player.render();
  enemy.render();
  ball.render();
}
// animating the paddle goes here

var animate = window.requestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) };

function step()
{
  render();
  animate(step);
}

window.addEventListener('keydown',function(e){
    if(e.keyCode === 38 || e.keyCode === 87)
    {
      player.move("up");
    }
    if(e.keyCode === 40 || e.keyCode === 83)
    {
      player.move("down");
    }
  }
)