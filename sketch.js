// GAME SETUP
// create player, target, and obstacles
var player, playerAni;
var coin, coinAni;
var rock_1,rock_2,rocksAni,rock_3,rock_4;

var score = 0;

var coinSounds;
var rockSounds;
var loseSounds;

var gameStates = "PLAY";
var canvas;

function preload(){
 playerAni = loadAnimation("bot-removebg-preview.png", "Yay-removebg-preview.png");
 coinAni = loadImage("download (1).png");
 rocksAni = loadImage("download (2).png");
 coinSounds = loadSound("collectcoin-6075.mp3");
 rockSounds = loadSound("human-impact-on-ground-6982.mp3");
 loseSounds = loadSound("negative_beeps-6008.mp3");

 playerAni.playing = true;
 playerAni.loop = true;
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  player = createSprite(windowWidth/2, windowHeight/2);
  player.addAnimation("flying", playerAni);
  player.setCollider("rectangle", 0, 0, 200, 200, 0);
  player.scale = 0.4;
  coin = createSprite(100, 300);
  coin.addImage("coin", coinAni);
  coin.setCollider("circle", 0, 0, coin.width/2);
  rock_1 = createSprite(-30, windowHeight/2);
  rock_1.addImage("rock", rocksAni);
  rock_1.velocityX = 5;
  rock_1.setCollider("rectangle", 0, 0, rock_1.width,rock_1.height, 0);
  rock_2 = createSprite(windowWidth/2,-30);
  rock_2.addImage("rock", rocksAni);
  rock_2.velocityY = 5;
  rock_2.setCollider("rectangle", 0, 0, rock_2.width, rock_2.height, 0);
  rock_3 = createSprite(windowWidth+30, windowHeight/2+50);
  rock_3.addImage("rock", rocksAni);
  rock_3.velocityX = -5;
  rock_3.setCollider("rectangle", 0, 0, rock_3.width,rock_3.height, 0);
  rock_4 = createSprite(windowWidth/2-30,windowHeight+50);
  rock_4.addImage("rock", rocksAni);
  rock_4.velocityY = -5;
  rock_4.setCollider("rectangle", 0, 0, rock_4.width, rock_4.height, 0);
}
function draw() {
  background("lightblue");
  if(gameStates == "PLAY"){
    // FALLING
    player.velocityY = player.velocityY + 0.6;
    // LOOPING
    if(rock_1.x > windowWidth){
      rock_1.x = -30;
      rock_1.y = random(windowHeight-(windowHeight-10), windowHeight-10);
    } 
    if(rock_2.y > windowHeight){
      rock_2.y = -30;
      rock_2.x = random(windowWidth-(windowWidth-10), windowWidth-10);
    }
    if(rock_3.x < 0){
      rock_3.x = windowWidth+30;
      rock_3.y = random(windowHeight-(windowHeight-10), windowHeight-10);
    } 
    if(rock_4.y < 0){
      rock_4.y = windowHeight+30;
      rock_4.x = random(windowWidth-(windowWidth-10), windowWidth-10);
    }
    textSize(20);
    fill("green");
    text("Score: "+score, windowWidth-100, 30);
    // PLAYER CONTROLS
    // change the y velocity when the user clicks "up"
    if(keyDown("up")){
      player.velocityY = -7;
    }
    // decrease the x velocity when user clicks "left"
    if(keyDown("left")){
      player.velocityX = -5; 
    }
    // increase the x velocity when the user clicks "right"
    if(keyDown("right")){
      player.velocityX = 5;
    }
    // SPRITE INTERACTIONS
    // reset the coin when the player touches it
    if(coin.isTouching(player)){
      coin.x = random(windowWidth-(windowWidth-30),windowWidth-30);
      coin.y = random(windowHeight-(windowHeight-30),windowHeight-30);
      score ++;
      coinSounds.play();
    }
    
    // make the obstacles push the player
    if(rock_1.isTouching(player) || rock_2.isTouching(player) || rock_3.isTouching(player) || rock_4.isTouching(player)){
      rockSounds.setVolume(1);
      rockSounds.play();
      rockSounds.setVolume(0);
    }
    rock_1.displace(player);
    rock_2.displace(player);
    rock_3.displace(player);
    rock_4.displace(player);
      
    }
  // DRAW SPRITES
  drawSprites();
  
  // GAME OVER
  if (player.x < 0 || player.x > windowWidth || player.y < 0 || player.y > windowHeight) {
    gameStates = "END";
    loseSounds.play();
  }
  if(gameStates == "END"){
    background("black");
    textSize(50);
    fill("green");
    text("Game Over!", windowWidth/2-130, windowHeight/2);
    text("Press CTRL+R to restart", windowWidth/2-300, windowHeight/2+50);
    player.x = windowWidth/2;
    player.y = windowHeight/2;
  }
}