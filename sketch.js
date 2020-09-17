var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var resetgame,gameover
  var gameoverImg,resetImg

gameState="PLAY";

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  gameoverImg=loadImage("gameOver.png")
  
  resetImg=loadImage("restart.png")
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup()
 {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  resetgame=createSprite(250,100,0,0)
  resetgame.addImage(resetImg)
  
  gameover=createSprite(250,100,0,0)
  gameover.addImage(gameoverImg)
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background(180);
  
 
  text("Score: "+ score, 500,50);

  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if (gameState=="PLAY"){
    
    spawnClouds();
    spawnObstacles();
    
     if(keyDown("space")) {
    trex.velocityY = -10;
       
     }
  gameover.visible=false
  resetgame.visible=false
    
  score = score + Math.round(getFrameRate()/60);
  
       
     
  ground.velocityX = -4;
       
  
  }  
    else if (gameState=="END"){
      ground.velocityX = 0;
      
      obstaclesGroup.destroyEach()
      cloudsGroup.destroyEach()
      
     gameover.visible=true
     resetgame.visible=true
     
      
    }
    
    if (obstaclesGroup.collide(trex)){
      gameState="END"

  }
    
  trex.collide(invisibleGround);
 
  if (mousePressedOver(resetgame)){
reset()
      
      }
  drawSprites()
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }

}

function reset()
{
 
  score=0
  gameState="PLAY"
  
  
  
}


