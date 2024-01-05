import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [score,setScore]=useState(0)
  useEffect(() => {
    const HEIGHT=500
    const WIDTH=500
    const UNIT=25
    let val=0
    let foodX=0
    let foodY=0
    let active=false;
    const canvas = document.querySelector('.board');
    const context = canvas.getContext('2d');
    context.fillStyle='black'
    context.fillRect(0,0,500,500)
    let xVelocity=25
    let yVelocity=0
    const snake=[
      {x:UNIT*3,y:0},{x:UNIT*2,y:0},{x:UNIT,y:0},{x:0,y:0}
    ]

    const createFood=()=>{
   
    foodX=Math.floor(Math.random()*WIDTH/UNIT)*UNIT
    foodY=Math.floor(Math.random()*WIDTH/UNIT)*UNIT
    displayFood()
    }

    const displayFood=()=>{
      context.fillStyle = 'red';
      context.fillRect(foodX,foodY,UNIT,UNIT);
    }


   const drawSnake=()=>{
    context.fillStyle='green';
    snake.forEach((tile)=>{
       context.fillRect(tile.x,tile.y,UNIT,UNIT);
    })
   }

   const moveSnake=()=>{
     const head={x:snake[0].x+xVelocity,y:snake[0].y+yVelocity} 
     snake.unshift(head)
     if(snake[0].x==foodX && snake[0].y==foodY){
      val++;
      setScore(val)
      createFood()
     }
     else snake.pop()
   }
    
   const clearBoard=()=>{
    context.fillStyle='black'
    context.fillRect(0,0,500,500)
   }

   const nextTick=()=>{
   // if(active==true){
    setTimeout(() => {
     clearBoard()
     displayFood()
     moveSnake()
     drawSnake()
     nextTick() 
    }, 100);
    //}
   }

   function keyPress(e){
    active=true 
    let left=37
    let up=38
    let down=40
    let right=39
    switch(true){
        case(e.keyCode==left && xVelocity!=UNIT):
        xVelocity=-UNIT;
        yVelocity=0;
        break
        case(e.keyCode==right && xVelocity!=-UNIT):
        xVelocity=UNIT;
        yVelocity=0;
        break
        case(e.keyCode==up && yVelocity!=UNIT):
        xVelocity=0;
        yVelocity=-UNIT;
        break
        case(e.keyCode==down && yVelocity!=-UNIT):
        xVelocity=0;
        yVelocity=UNIT;
        
    }
  }

    const startGame=()=>{
      drawSnake()
      createFood()
      nextTick()
    }
    window.addEventListener('keydown',keyPress)
    startGame()

   
  }, []);
  return (
    <div >
     <div className="game__wrapper">
        <h1>Snake Game<span>shhhhhhhhhh........</span></h1>
        <div className="instruction">press space to start and pause the game</div>
        <canvas className="board" width="500" height="500">
          
        </canvas>
        <div className="score">score: <span id='point'>{score}</span></div>
     </div>
    </div>
  );
}

export default App;
