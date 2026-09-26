export default class Star {
  rands: number[];
  orbital: number;
  x: number;
  y: number;
  yOrigin: number;
  speed: number;
  rotation: number;
  startRotation: number;
  id: number;
  collapseBonus: number;
  color: string;
  hoverPos: number;
  prevR: number;
  prevX: number;
  prevY: number;

  constructor(id: number, maxOrbit: number, centerX: number, centerY: number) {
    // Get a weighted random number, so that the majority of stars will form in the center of the orbit
		this.rands = [];
		this.rands.push(Math.random() * (maxOrbit/2) + 1);
		this.rands.push(Math.random() * (maxOrbit/2) + +maxOrbit);

    const randsSum = this.rands.reduce((p, c) => p + c, 0);
		this.orbital = randsSum / this.rands.length;
		// Done getting that random number, it's stored in this.orbital

		this.x = centerX; // All of these stars are at the center x position at all times
		this.y = centerY + this.orbital; // Set Y position starting at the center y + the position in the orbit

		this.yOrigin = centerY + this.orbital;  // this is used to track the particles origin

		this.speed = (Math.floor(Math.random() * 2.5) + 1.5)*Math.PI/180; // The rate at which this star will orbit
		this.rotation = 0; // current Rotation
		this.startRotation = (Math.floor(Math.random() * 360) + 1)*Math.PI/180; // Starting rotation.  If not random, all stars will be generated in a single line.  

		this.id = id;  // This will be used when expansion takes place.

		this.collapseBonus = this.orbital - (maxOrbit * 0.7); // This "bonus" is used to randomly place some stars outside of the blackhole on hover
		if(this.collapseBonus < 0){ // if the collapse "bonus" is negative
			this.collapseBonus = 0; // set it to 0, this way no stars will go inside the blackhole
		}

    const redOffset = Math.ceil(Math.random() * 40);
    const greenOffset = Math.ceil(Math.random() * 40);
    const blueOffset = Math.ceil(Math.random() * 40);

		this.color = `rgba(${200 + redOffset}, ${200 + greenOffset}, ${200 + blueOffset}, ${(1 - ((this.orbital) / maxOrbit)) + 0.2})`; // Color the star white, but make it more transparent the further out it is generated

		this.hoverPos = centerY + (maxOrbit/2) + this.collapseBonus;  // Where the star will go on hover of the blackhole


		this.prevR = this.startRotation;
		this.prevX = this.x;
		this.prevY = this.y;

		// The reason why I have yOrigin, hoverPos and expansePos is so that I don't have to do math on each animation frame.  Trying to reduce lag.
  }

  draw(context: CanvasRenderingContext2D | null, collapse: boolean, currentTime: number, centerX: number, centerY: number) {
    // the stars are not actually moving on the X axis in my code.  I'm simply rotating the canvas context for each star individually so that they all get rotated with the use of less complex math in each frame.

    if (!context) {
      return;
    }

    this.rotation = this.startRotation + (currentTime * this.speed);
    if (!collapse) { // not hovered
      if (this.y > this.yOrigin) {
        this.y-= 2.5;
      }
      if (this.y < this.yOrigin-4) {
        this.y+= (this.yOrigin - this.y) / 10;
      }
    } else { // on hover
      if (this.y > this.hoverPos) {
        this.y-= (this.hoverPos - this.y) / -5;
      }
      if (this.y < this.hoverPos-4) {
        this.y+= 2.5;
      }
    }

		context.save();
		context.fillStyle = this.color;
		context.strokeStyle = this.color;
		context.beginPath();
		const oldPos = this.rotate(centerX,centerY,this.prevX,this.prevY,-this.prevR);
		context.moveTo(oldPos[0],oldPos[1]);
		context.translate(centerX, centerY);
		context.rotate(this.rotation);
		context.translate(-centerX, -centerY);
		context.lineTo(this.x,this.y);
		context.stroke();
		context.restore();


		this.prevR = this.rotation;
		this.prevX = this.x;
		this.prevY = this.y;
  }

  rotate(cx: number, cy: number, x: number, y: number, angle: number) {
		const radians = angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
		return [nx, ny];
	}
}