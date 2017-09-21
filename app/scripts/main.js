//setting up the board goes here

var pong_canvas = document.getElementById('pong_table');
var size = (pong_canvas.clientWidth > pong_canvas.clientHeight) ? pong_canvas.clientHeight : pong_canvas.clientWidth;
var player_pos;
var computer_pos;
var ball_pos;
var player_score = document.getElementById('player_score');
var computer_score = document.getElementById('enemy_score');
var you = 0;
var them = 0;
pong_canvas.width = size;
pong_canvas.height = size;
var pong_context = pong_canvas.getContext("2d");
function check_state()
{
  if (you === 11)
  {
    document.getElementById('win').style.display = "inline";
    pong_canvas.style.display = 'none';
  }
  if (them === 11)
  {
    document.getElementById('lose').style.display = "inline";
    pong_canvas.style.display = 'none';
  }
}
function draw_background() {
  pong_context.fillStyle = 'chartreuse';
  pong_context.fillRect(0, 0, size, size);
}

function paddle(position, length) {
  this.step = length/40;
  this.measure = length;
  this.column = position;
  this.row = this.measure/2;
  this.paddle_size = this.measure/10;
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
    pong_context.lineWidth = this.step;
    pong_context.strokeStyle = 'black';
    pong_context.stroke();
    return this.row;
  };
}

function pong_ball(position, length) {
  this.measure = length;
  this.column = position;
  this.row = this.measure/2;
  this.step = length/40;
  this.xmove = 0;
  this.ymove = 0;
  this.playing_flag = false;
  this.start_round = function()
  {
    this.xmove = (Math.floor(Math.random() * 2) == 0) ? 2 : -2;
    this.ymove = Math.floor(Math.random() * (3)) -1;
  };
  this.reinit = function(position, length)
  {
    this.measure = length;
    this.column = position;
    this.row = this.measure/2;
    this.step = length/40;
    this.xmove = 0;
    this.ymove = 0;
    this.playing_flag = false;
  };
  this.bounce = function(player, computer)
  {
    if(this.playing_flag === true)
    {
      // move logic
      this.column += this.xmove;
      this.row += this.ymove;
      //bounce off ceiling logic
      if(this.row < this.step)
      {
        this.row = this.step;
        this.ymove *= -1;
      }
      //bounce off floor logic
      if(this.row > (this.measure - this.step ))
      {
        this.row = (this.measure - this.step);
        this.ymove *= -1;
      }
      //end round logic
      if(this.column <= 0)
      {
        
        this.reinit(size/2,size);
        them++;
        computer_score.innerHTML = them;
        check_state();
      }
      if(this.column >= this.measure)
      {
        
        this.reinit(size/2,size);
        you++;
        player_score.innerHTML = you;
      }
      //bounce off player paddle logic
      if(this.column <= (this.step * 2.5))
      {
        if((this.row - player) < 0 && (this.row - player) > -(2 * this.step))
        {
          if(this.ymove < 2)
          {
            this.ymove += 1;
          }
          this.xmove *= -1;
        }
        if((this.row - player) >= 0 && (this.row - player) < (2 * this.step))
        {
          if(this.ymove < -2)
          {
            this.ymove -= 1;
          }
          this.xmove *= -1;
        }
      }
      //bounce off computer paddle logic
      if(this.column >= (this.measure -(this.step * 2.5)))
      {
        if((this.row - computer) < 0 && (this.row - computer) > -(2 * this.step))
        {
          if(this.ymove < 2)
          {
            this.ymove += 1;
          }
          this.xmove *= -1;
        }
        if((this.row - computer) >= 0 && (this.row - computer) < (2 * this.step))
        {
          if(this.ymove < -2)
          {
            this.ymove -= 1;
          }
          this.xmove *= -1;
        }
      }
    }
  };
  this.render = function()
  {
    pong_context.beginPath();
    pong_context.arc(this.column, this.row, this.step, 0, 2 * Math.PI, false);
    pong_context.fillStyle = 'DarkGoldenRod';
    pong_context.fill();
    return this.row;
  };
} 

var player = new paddle(size/40,size);
var enemy = new paddle(size-(size/40),size);
var ball = new pong_ball(size/2,size);

enemy.moved = 10;
enemy.update = function()
{
  if(this.moved === 0)
  {
    this.moved = 10;
    if(ball_pos > computer_pos)
    {
      enemy.move("down");
    }
    else
    {
      enemy.move("up");
    }
  }
  else
  {
    this.moved--;
  }
};

function render ()
{
  draw_background();
  player_pos = player.render();
  computer_pos = enemy.render();
  ball_pos = ball.render();
}
// animating the paddle goes here

var animate = window.requestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) };

function step()
{
  render();
  ball.bounce(player_pos, computer_pos);
  enemy.update();
  animate(step);
}

window.addEventListener('keydown',function(e){
    console.log(e.keyCode);
    if(e.keyCode === 38 || e.keyCode === 87)
    {
      player.move("up");
    }
    if(e.keyCode === 40 || e.keyCode === 83)
    {
      player.move("down");
    }
    if(e.keyCode === 65)
    {
      console.log("game start");
      ball.start_round();
      ball.playing_flag = true;
    }
  }
)