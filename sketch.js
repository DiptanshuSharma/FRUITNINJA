var play = 1;
var end = 0;
var gamestate = 1;
var sword,swordim;
var fruit1,fruit2,fruit3,fruit4,monster,mosterimage;
var gameim;
var gams;
var swos;
//variables are given

function preload(){
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterimage = loadAnimation("alien1.png","alien2.png");
  swordim = loadImage("sword.png");
  gameim = loadImage("gameover.png");
  gams = loadSound("gameover.mp3");
  swos = loadSound("knifeSwooshSound.mp3");
  //images and sounds are loaded
  
}
 function setup() {
  createCanvas(600, 600);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordim); 
  sword.scale = 0.7;
  //sword is created 
  
  score = 0; 
  //score is given 
  
  fruitgroup = new Group();
  enemygroup = new Group();
  //groups are created
}

function draw() {
  
  background("peru");
  //background colour is given

  drawSprites();
  textSize(25);
  textFont("comic sans ms");
  fill("red");
  text("Score: "+ score, 250,50);
  //score is displayed
  
  if(gamestate === play){
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    //sword is made to move
   
    fruits();
    enemy();
    //functions are displayed
    
    if(fruitgroup.isTouching(sword)){
    fruitgroup.destroyEach(); 
    swos.play();  
    score=score+1;
    //if sword is touching the fruit score is added  
  }  
   if(enemygroup.isTouching(sword)){
    enemygroup.destroyEach();
    gamestate = end;
    gams.play(); 
    //if sword is touching the enemy gamestate goes to end  
  }   
}
   else if (gamestate === end) {
    sword.addImage(gameim);
    sword.x=200;
    sword.y=200;
    fruitgroup.setVelocityXEach(0); 
    enemygroup.setVelocityXEach(0);  
   }
}

function fruits() {
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
  if (r==1) {
      fruit.addImage(fruit1);
  }else if (r==2) {
      fruit.addImage(fruit2);
  }else if (r==3) {
      fruit.addImage(fruit3);
  }else if (r==4) {
      fruit.addImage(fruit4);
  }
    
  fruit.y=Math.round(random(50,340));
  fruit.velocityX=-(7+(score/4));
  fruit.setLifetime=100;
  fruitgroup.add(fruit);
    //fruits are created
  }
}

function enemy() {
  if (World.frameCount%200===0) {
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterimage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    enemygroup.add(monster);
    //monster is crdeated
  }
}