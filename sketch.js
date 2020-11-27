
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground,groundImage;
var Play = 1;
var End = 0;
var gamestate = Play;
var invisibleGround;
var defeat,defeatImage;
var restart;

function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_pause=loadImage("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  
  obstaceImage = loadImage("obstacle.png");
 
  groundImage = loadImage("backgroung.jpg");
  
  obstacleImage = loadImage("obstacle.png");
  
  defeatImage = loadImage("defeat.png");
  
  restartImage = loadImage("restart.png");
}



function setup() {
  
  createCanvas(600,400);
  
  ground=createSprite(250,200,400,20);
  ground.addImage("ground",groundImage);
  ground.x = 0
  //console.log(ground.x);
  ground.scale=0.6;
  
  monkey=createSprite(100,265,100,100);
  monkey.addAnimation("running",monkey_running);
  monkey.addImage("pause",monkey_pause);
  monkey.scale=0.12;
  
  defeat=createSprite(300,100,400,20);
  defeat.addImage(defeatImage);
  defeat.scale=0.4;
  defeat.visible=false;
  
  restart=createSprite(300,300,30,30);
  restart.addImage(restartImage);
  restart.visible=false;
  restart.scale=0.3;
  
  invisibleGround=createSprite(190,305,600,10);
  invisibleGround.visible=false;
  
  
  localStorage["HighestScore"] = 0;


  
  obstacleGroup=createGroup();
  
  bananaGroup=createGroup();
}


function draw() {
  background(400);
  
  
  
  console.log(gamestate);
  
  monkey.collide(invisibleGround);
  
  if (gamestate===Play){
    
    ground.velocityX=-5;
    
    Fruits();
  
    Obstacles();
    
    restart.visible = false;
    defeat.visible=false;
    
      if(ground.x<=-175){
     ground.x=2600/5;
     }
    if(keyDown("SPACE") && monkey.y>=200 ) {
        monkey.velocityY = -17;
    }
    
    
    monkey.velocityY = monkey.velocityY + 0.8;
   
  
  if(monkey.isTouching(bananaGroup)){
     score=score+1;
    bananaGroup.destroyEach();
     }
  
    
    
    
  if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    monkey.velocityX=0;
    defeat.visible=true;
    ground.velocityX=0;
    monkey.changeAnimation("pause",monkey_pause);
    obstacleGroup.lifetime=-1;
    bananaGroup.lifetime=-1;
  } 

    
}
  if(monkey.isTouching(obstacleGroup)){
    gamestate=End;
   }
  
  if (gamestate === End) {
      monkey.velocityY=0;
      ground.velocityX=0;
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
    restart.visible=true;
    
    
  }
    
  
  
  drawSprites();
    
  fill("black");
  textSize(15);
  text("SCORE="+score,265,20);
}


function Fruits(){
  
  if (frameCount % 200 === 0) {
  banana=createSprite(300,200,10,10);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocity.x=-5;
  banana.y = Math.round(random(120,220));
  banana.lifetime=700;
  bananaGroup.add(banana);
}
}

function Obstacles(){
  
  if (frameCount % 100 === 0) {
  obstacle=createSprite(300,275,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
  obstacle.velocity.x=-5;
  
  obstacle.lifetime=700;
  obstacleGroup.add(obstacle);
} 
}

function reset(){  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  monkey.changeAnimation("running",monkey_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
  
  
  Fruits();
  
  Obstacles();
  
  gamestate = Play;
}


