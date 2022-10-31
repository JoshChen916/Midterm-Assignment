class Bullet{ //bullets move in both X & Y directions, and the detection of whether outside the page—return true, else false
  constructor(x, y, dir) {
    this.x = x;
    this.vx = random(4,10);
    this.dir=dir;
    if(this.dir==1){
      this.vx=-this.vx;
    }
    this.y = y;
    this.vy = random(0,1);
    this.w = 30;
    this.h = 30;
    this.imNum = this.dir;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    image(fire[this.imNum],this.x, this.y,this.w, this.h);
  }
  die() {
    if(this.x>width){
      return true;
    }
    return false;
  }
}