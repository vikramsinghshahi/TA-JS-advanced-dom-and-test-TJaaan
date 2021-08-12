//selcting canvas elements

let cvs= document.getElementById("breakout");

let ctx = cvs.getContext("2d");

const score_image = new Image();

score_image.src = "./img/score.png";

const life_image = new Image();

life_image.src = "./img/life.jpg";

console.log(life_image);


// game variable

const paddle_Width = 100;
const paddle_Height= 20;
const paddle_Margin_Bottom=50;
const ball_Radius = 8;
let score = 0;
let score_unit = 10;
let life = 3;
let leftArrow = false;
let rightArrow = false;
let game_over = false;
//create-paddle

const paddle = {
    x: cvs.width/2 - paddle_Width/2,
    y: cvs.height - paddle_Height - paddle_Margin_Bottom,
    width : paddle_Width,
    height : paddle_Height,
    dx:5,
}

console.log(paddle);

function drawPaddle(){
    ctx.fillStyle = "grey";
    ctx.fillRect(paddle.x , paddle.y , paddle.width, paddle.height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(paddle.x , paddle.y , paddle.width, paddle.height);
}

drawPaddle();

// contorl paddle

document.addEventListener("keydown", function(event){
    if(event.keyCode == 37){
        leftArrow = true;
    } else if(event.keyCode == 39){
        rightArrow = true;
    }

})

document.addEventListener("keyup", function(event){
    if(event.keyCode == 37){
        leftArrow = false;
    } else if(event.keyCode == 39){
        rightArrow = false;
    }

})


// move paddle

function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width){
        paddle.x += paddle.dx;

    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}


// create ball

const ball = {
    x : cvs.width/2,
    y : paddle.y - ball_Radius,
    radius : ball_Radius, 
    speed : 6,
    dx : 6* (Math.random()*2 - 1),
    dy: -6,
}

function drawBall(){
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius,0 , Math.PI*2);

    ctx.fillStyle = "orange";
    ctx.fill();

    ctx.strokeStyle = " black";
    ctx.stroke();

    ctx.closePath();

}

// move ball

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
   

}


//create the brics

const brick = {
    row: 4,
    column : 5,
    width: 55,
    height: 20,
    offSetLeft: 20,
    offSetTop: 20,
    marginTop: 40,
    fillColor: "gery",
    strokeColor: "green",


}

let bricks =[];

function createBricks(){
   for( let r= 0; r< brick.row; r++){
      bricks[r] = [];
       for(let c=0 ; c< brick.column; c++){
        bricks[r][c] = {
            x: c* (brick.offSetLeft +brick.width) + brick.offSetLeft,
            y: r * (brick.offSetTop+ brick.height)+ brick.offSetTop + brick.marginTop,
            status: true,
        }
       }
   }
}

createBricks();

//draw the bricks

function drawBrics(){
    for( let r= 0; r< brick.row; r++){
         for(let c=0 ; c< brick.column; c++){
             let b = bricks[r][c];

          if(b.status){
              ctx.fillStyle = brick.fillColor;
              ctx.fillRect(b.x , b.y, brick.width, brick.height);
              ctx.strokeRect(b.x , b.y, brick.width, brick.height);
          }
         }
     }

}

// ball bricks collision 

function ballBricksCollision(){
    for( let r= 0; r< brick.row; r++){
        for(let c=0 ; c< brick.column; c++){
            let b = bricks[r][c];

         if(b.status){
             if(ball.x + ball.radius> b.x && ball.x - ball.radius < b.x + brick.width &&
                ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){

                ball.dy = -ball.dy;
                b.status = false;
                score += score_unit;

                // console.log(`mahek your score is ${score}`);
             }
         }
        }
    }

}


// show game stats

function showGameStats(text, textX , textY ,img, imgX, imgY){
    ctx.fillStyle = "black";
    ctx.font = "25px Germannia One";
    ctx.fillText(`${text}`, textX, textY);

    ctx.drawImage(img, imgX, imgY, width= 25, height = 25);
   
}



//draw function
function draw(){
    drawPaddle();

    drawBall();
    drawBrics();

showGameStats(score,30, 25, score_image, 5, 5);
showGameStats(life, cvs.width-25 , 25, life_image, cvs.width- 55, 5);
    
}


// ball and wall colllision detection

function ballWallCollision(){
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
    }

    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }

    if(ball.y + ball.radius > cvs.height){
        
        life--
        // alert("Miss Mahek Marwaha focus on winning ");

        resetBall();
    }
  
}


// ball and  paddle collision

function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){

        let collidePoint = ball.x - ( paddle.x + paddle.width/2);

        collidePoint = collidePoint /(paddle.width/2);
        let angle =  collidePoint * Math.PI/3;

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed* Math.cos(angle);
    }
}

// reset ball

function resetBall(){
    ball.x = cvs.width/2;
    ball.y = paddle.y - ball_Radius;
    ball.dx = 6* (Math.random()*2 - 1),
    ball.dy= -6;
}

// game over

function gameOver(){
    if(life <= 0){
        showYouLost();
        game_over = true;
    }

    if(score >= 200){
        showYouWin();
        game_over = true;
    }

}

//update game function
function update(){
    
    movePaddle();
    moveBall();
    ballWallCollision();

    ballPaddleCollision();

    ballBricksCollision();
    gameOver();

    
}
//game loop

function loop(){
    ctx.clearRect(0, 0 , innerWidth, innerHeight);

    draw();
    update();

   if(! game_over){
     requestAnimationFrame(loop);
   }

}

loop();


//show game over message

const gameover = document.getElementById("gameover");
const youwon = document.getElementById("youwon");
const youlost = document.getElementById("youlost");
const restart = document.getElementById("restart");


restart.addEventListener("click", function(){
    location.reload();
})

function showYouWin(){
    gameover.style.display = "block";
    youwon.style.display = "block";
}

function showYouLost(){
    gameover.style.display = "block";
    youlost.style.display = "block";
}
// console.log(gameover);
// console.log( youwon);
// console.log( youlost);
// console.log(restart);