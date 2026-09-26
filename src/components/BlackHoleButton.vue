<template>
    <div
      ref="blackhole"
      class="blackhole"
      :style="{ height: `${height}px`, width: `${width}px` }"
    >
      <canvas  ref="canvas"></canvas>
      <div class="centerHover"
        :style="{ height: `${height}px`, width: `${width}px`, marginLeft: `-${centerX}px`, marginTop: `-${centerY}px` }"
        @mouseover="centerHoverMouseOver"
        @mouseout="centerHoverMouseOut"
      >
        <slot></slot>
      </div>
    </div>
</template>

<script lang="ts">
import Star from "../models/Star.ts";

export default {
  name: "BlackHoleButton",
  props: [
    "maxOrbit",
    "starCount"
  ],
  data() {
    return {
      startTime: new Date().getTime(),
      currentTime: 0,
      height: this.maxOrbit * 2,
      width: this.maxOrbit * 2,
      centerY: this.maxOrbit,
      centerX: this.maxOrbit,
      stars: [] as Star[],
      collapse: false,
    }
  },
  mounted() {
    // https://codepen.io/ruijadom/pen/jGKjML
    
    // const blackholeElement = this.$refs.blackhole as HTMLDivElement;

    // this.height = blackholeElement.clientHeight;
    // this.width = blackholeElement.clientWidth;
    // this.centerY = this.height / 2;
    // this.centerX = this.width / 2;

    const canvasElement = this.$refs.canvas as HTMLCanvasElement;
    const context = canvasElement.getContext("2d");
    
    this.setDPI(canvasElement);
    
    if (context) {
      // context.globalCompositeOperation = "multiply";
      // context.fillStyle = 'rgba(25,25,25,1)';  // Initial clear of the canvas, to avoid an issue where it all gets too dark
		  // context.fillRect(0, 0, this.width, this.height);
    }
    
		for (let i = 0; i < this.starCount; i++) {  // create stars
			const star = new Star(i, +this.maxOrbit, +this.centerX, +this.centerY);
      this.stars.push(star);
		}
		
    this.loop();
  },
  methods: {
    setDPI(canvas: HTMLCanvasElement | null) {
      if (!canvas) {
        return;
      }

      // Set up CSS size if it's not set up already
      if (!canvas.style.width)
        canvas.style.width = this.width + 'px';
      if (!canvas.style.height)
        canvas.style.height = this.height + 'px';

      canvas.width = Math.ceil(this.width);
      canvas.height = Math.ceil(this.height);
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
        context.globalCompositeOperation = "destination-in";

        context.fillStyle = "rgba(0, 0, 0, 0.50)"; 
        context.fillRect(0, 0, this.width, this.height);

        context.globalCompositeOperation = "source-over";

        // const gradient = context.createRadialGradient(this.centerX, this.centerY, 0, this.centerX, this.centerY, this.maxOrbit);

        // gradient.addColorStop(0, "rgba(0, 0, 0, 1)");   // Opaque red at the center
        // gradient.addColorStop(0.8, "rgba(0, 0, 0, 0.5)"); // Semi-transparent
        // gradient.addColorStop(1, "rgba(0, 0, 0, 0)");     // Fully transparent at the edge

        // context.fillStyle = gradient;
        // context.beginPath();
        // context.arc(this.centerX, this.centerY, this.maxOrbit, 0, 2 * Math.PI, false);
        // context.fill();

        for (const star of this.stars) {  // For each star
          star.draw(context, !this.collapse, +this.currentTime, +this.centerX, +this.centerY);
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
  @apply flex-col content-center;

	border-radius: 50%;
	position: absolute;
  top: 50%;
  left: 50%;
	z-index: 2;
	cursor: pointer;
}

canvas {
	position: relative;
	z-index: 1;
	width: 100%;
	height: 100%;
	margin: auto;
}
</style>
