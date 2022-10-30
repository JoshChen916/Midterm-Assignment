//first: click the balls--then click pokemons or the tools
//Thank you TA Dawn and my CS friend Xiao for helping me solving problems and figuring out!
let bg=[];
let ball=[];
let fire=[];
let pk=[];
let tool=[];
let characters=[];
let songs=[];
let fight=[];
let bgNum=0;
function preload() {
  //because the file name is in sequence, i was inspired to load them in array,so that it can be more convenient and clear. inspiration:https://www.youtube.com/watch?v=pbUyIhtGuhc
  for(let i=0;i<2;i++){
    songs[i]=loadSound("music/music"+(i+1)+".mp3");
  }
  songs[2]=loadSound("music/battle.m4a");
  for(let i=0;i<2;i++){
    fight[i]=loadSound("music/fight"+(i+1)+".mp3");
  }
  for(let i=0;i<2;i++){
    bg[i]=loadImage("images/background"+(i+1)+".png");
  }
  bg[2]=loadImage("images/background3.jpg");
  for(let i=0;i<2;i++){
    ball[i]=loadImage("images/ball"+(i+1)+".png");
  }
  for(let i=0;i<2;i++){
    fire[i]=loadImage("images/fire"+(i+1)+".png");
  }
  for(let i=0;i<4;i++){
    pk[i]=loadImage("images/pk"+(i+1)+".png");
  }
  for(let i=0;i<2;i++){
    tool[i]=loadImage("images/tool"+(i+1)+".png");
  }
}

let charaterPosX;
let charaterPosY;
let charaterPosW=150;
let charaterPosH=150;
function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);
  charaterPosX=width/5;
  charaterPosY=height*3/5;
  let toolX=width/10;
  let toolY=height/10;
  characters.push(new Character(charaterPosX,charaterPosY,0,toolX,toolY))//0--left;
  characters.push(new Character(width-charaterPosX,charaterPosY,1,width-toolX,toolY));//1--right
  songs[0].loop();
  frameRate(15);
}
let step=0;
let ch=0;
let songFlag=0;
function draw() {
  background(220);
  image(bg[bgNum],width/2,height/2,width,height);

  for (let i = 0; i < characters.length; i++) {
    characters[i].move();
    characters[i].clickShoot();
    characters[i].shooting();
    characters[i].shot();
  }
  //change the background music with the response of characters--two characters both change->then change the song
  if(characters[0].step0Clicked==1 && characters[1].step0Clicked==1){
    bgNum=1;
    if(songFlag==0){
      songFlag=1;
      songs[0].stop();
      songs[1].loop();//music stop & loopp inspried by coding train :https://www.youtube.com/watch?v=Pn1g1wjxl_0&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW
    }
  }
  if(characters[0].step0Clicked==2 && characters[1].step0Clicked==2){
    bgNum=2;
    
    if(songFlag==1){
      songFlag=2;
      songs[1].stop();
      songs[2].loop();
    }
  }
}