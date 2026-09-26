<template>
    <div
      ref="blackhole"
      class="blackhole"
    >
      <canvas  ref="canvas"></canvas>
      <div class="centerHover"
        @mouseover="centerHoverMouseOver"
        @mouseout="centerHoverMouseOut"
      >
        <span>{{ text }}</span>
      </div>
    </div>
</template>

<script lang="ts">
import Star from "../models/Star.ts";

export default {
  name: "BlackHoleButton",
  props: [
    "maxOrbit",
    "starCount",
    "text"
  ],
  data() {
    return {
      startTime: new Date().getTime(),
      currentTime: 0,
      height: 0,
      width: 0,
      centerY: 0,
      centerX: 0,
      stars: [] as Star[],
      collapse: false,
    }
  },
  mounted() {
    // https://codepen.io/ruijadom/pen/jGKjML
    
    const blackholeElement = this.$refs.blackhole as HTMLDivElement;

    this.height = blackholeElement.clientHeight;
    this.width = blackholeElement.clientWidth;
    this.centerY = this.height / 2;
    this.centerX = this.width / 2;

    const canvasElement = this.$refs.canvas as HTMLCanvasElement;
    const context = canvasElement.getContext("2d");
    
    this.setDPI(canvasElement, 192);
    
    if (context) {
      // context.globalCompositeOperation = "multiply";
      context.fillStyle = 'rgba(25,25,25,1)';  // Initial clear of the canvas, to avoid an issue where it all gets too dark
		  context.fillRect(0, 0, this.width, this.height);
    }
    
		for (let i = 0; i < this.starCount; i++) {  // create stars
			const star = new Star(i, +this.maxOrbit, +this.centerX, +this.centerY);
      this.stars.push(star);
		}
		
    this.loop();
  },
  methods: {
    setDPI(canvas: HTMLCanvasElement | null, dpi: number) {
      if (!canvas) {
        return;
      }

      // Set up CSS size if it's not set up already
      if (!canvas.style.width)
        canvas.style.width = this.width + 'px';
      if (!canvas.style.height)
        canvas.style.height = this.height + 'px';

      const scaleFactor = dpi / 96;
      canvas.width = Math.ceil(this.width * scaleFactor);
      canvas.height = Math.ceil(this.height * scaleFactor);
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return;
      }

      ctx.scale(scaleFactor, scaleFactor);
    },
    centerHoverMouseOver() {
      this.collapse = true;
    },
    centerHoverMouseOut() {
      this.collapse = false;
    },
    loop() {
      const now = new Date().getTime();
      this.currentTime = (now - this.startTime) / 50;

      const canvasElement = this.$refs.canvas as HTMLCanvasElement;
      const context = canvasElement.getContext("2d");

      if (context) {
        context.fillStyle = 'rgba(0,0,0,0.3)'; // somewhat clear the context, this way there will be trails behind the stars 
        context.fillRect(0, 0, +this.width, +this.height);

        for (const star of this.stars) {  // For each star
          star.draw(context, this.collapse, +this.currentTime, +this.centerX, +this.centerY);
        }
      }

      requestAnimationFrame(this.loop);
    }
  }
};
</script>

<style scoped>
@reference "tailwindcss";

.blackhole {
	position: relative;
	display: flex;
}

.centerHover {
	width: 255px;
	height: 255px;
	background-color: transparent;
	border-radius: 50%;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-top: -128px;
	margin-left: -128px;
	z-index: 2;
	cursor: pointer;
	line-height: 255px;
	text-align: center;
	transition: all 500ms;
	
	&.open  {
		opacity: 0;
		pointer-events: none;
	}
	
	&:hover span {
		color: #DDD;
		
		&:before { background-color: #DDD; }
		&:after { background-color: #DDD; }
	}
	
	span {
		color: #666;
		font-family: serif;
		font-size: 18px;
		position: relative;
		transition: all 500ms;
		
		&:before {
			content: '';
			display: inline-block;
			height: 1px;
			width: 16px;
			margin-right: 12px;
			margin-bottom: 4px;
			background-color: #666;
			transition: all 500ms;
		}
		&:after {
			content: '';
			display: inline-block;
			height: 1px;
			width: 16px;
			margin-left: 12px;
			margin-bottom: 4px;
			background-color: #666;
			transition: all 500ms;
		}
	}
}
canvas {
	position: relative;
	z-index: 1;
	width: 100%;
	height: 100%;
	margin: auto;
}
</style>
