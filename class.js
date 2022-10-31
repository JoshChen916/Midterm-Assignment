
class Character {
  
  constructor(x, y, dir,x1, y1) {
    this.x = x;
    this.y = y;
    this.w = charaterPosW
    this.h = charaterPosH;
    this.x1 = x1;
    this.y1 = y1;
    this.toolW = 100+(1-dir)*30;//the left one is a little small,increase its size
    this.toolH = 100+(1-dir)*30;
    this.toolW1 = 100;
    this.toolH1 = 100;
    this.moveH = 10;
    this.moveW = 10;
    this.dir= dir;//0-left 1-right
    this.bullets = [];
    this.step0Clicked = 0;
    this.imNum=2*dir;
    this.timer=0;
  }
  
  move() {//clicked the ball-->pokemons + tools appear
    if(this.step0Clicked==0){
        image(ball[1-this.dir],this.x+random(-this.moveW, this.moveW), this.y+random(-this.moveH, this.moveH), this.w, this.h);
    }else if(this.step0Clicked>=1){
      image(pk[this.imNum],this.x+random(-this.moveW, this.moveW), this.y+random(-this.moveH, this.moveH), this.w, this.h);
      image(tool[this.dir],this.x1, this.y1, this.toolW, this.toolH);
    //because i have images in different sequences, so I put them in different arraies: ball[0]-left one,ball[1]-right one; pk[0]-pk1.png(left),pk[2]-pk3.png(right);tool[0]-left,tool[1]-right
    }
  }
  //Thank you my friend xiao for helping me in this part
  clickShoot() {
    if(mouseIsPressed && millis()-this.timer>400){//dalay: detect the time to aviod both changing and shooting inspiration& referrence:https://forum.processing.org/two/discussion/22459/how-to-use-timer-millis-properly.html;https://forum.processing.org/one/topic/create-a-delay.html
      this.timer=millis(); //Update the time the bullet was fired, otherwise delay only works the first time
      if(this.step0Clicked==0){
        if(abs(mouseX-this.x)<this.w/2 && abs(mouseY-this.y)<this.h/2){
            this.step0Clicked=1;
            this.w=this.w+40;
            this.h=this.h+40;
          }//because the pixel is too small,so after the balls are clicked, it can automatically change size tips from TA: https://p5js.org/reference/#/p5.Image/resize also can resize
      }else if(this.step0Clicked==1){
        if(abs(mouseX-this.x)<this.w && abs(mouseY-this.y)<this.h/2){
          this.bullets.push(new Bullet(this.x,this.y,this.dir));
        }//send out bullets
        if(abs(mouseX-this.x1)<this.toolW/2 && abs(mouseY-this.y1)<this.toolH/2){
          this.step0Clicked=2;
          this.imNum=this.imNum+1;
          //all these functions is for state one
        }//change into final mode!!!!!
      }else{//in short of this.step0Clicked==2
        if(abs(mouseX-this.x)<this.w/2 && abs(mouseY-this.y)<this.h/2){
          this.bullets.push(new Bullet(this.x,this.y,this.dir));
        }//final mode can send out bullets:Troubleshoot:I firstly put this sentence above and it went into bug. 
        //Answer from TA Dawn: There are 3 states for pokemons-0,1,2 the first if is for state 0:put pokemon out, the second is for what normal pokemon can do, this else is for state 2, they can still send out bullets. They are separated and irrelavant to each other.
        
      }
    }
  }
  shooting(){
    for(let i=0;i<this.bullets.length;i++){
      this.bullets[i].move();
      if(this.bullets[i].die()){
        this.bullets.splice(i,i+1);// referrence:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      //splice i,i+1 delete from i ->i+1 not include i+1
        //let bullet die if it is over the screen, otherwise it will restore all, harm to your laptop.-->advice and thank you my friend Xiao
      }
    }
  }
  shot(){
    // Determine whether have been hit by bullets
    for(let i=0;i<characters[1-this.dir].bullets.length;i++){
      let chx=characters[1-this.dir].bullets[i].x;
      let chw=characters[1-this.dir].bullets[i].w;   
      let chy=characters[1-this.dir].bullets[i].y
      let chh=characters[1-this.dir].bullets[i].h;
      if(abs(chx-this.x)<this.w/2 && abs(chy-this.y)<this.h/2){
          characters[1-this.dir].bullets.splice(i,1);
        fight[this.dir].play();
      }
    }
  }
}


