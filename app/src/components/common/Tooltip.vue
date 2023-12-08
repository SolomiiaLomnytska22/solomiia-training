<template>
  <div
    class="tooltip-box"
    @mousemove="handleMouseMove"
  >
    <slot />
    <div :class="['tooltip', styleType]">
      <span :class="['text', styleType]">{{ text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { Point, Size } from '@/types'

@Component
export default class Tooltip extends Vue {
  @Prop({ required: true }) text!: string
  position: Point = { x: 0, y: 0 }
  tooltipBoxSize: Size = { width: 100, height: 50 } //max-height and max-width values

  get styleType (): string {
    if (this.position.y < this.tooltipBoxSize.height + 50) {
      //taking into account margin (50px)
      return 'bottom'
    } else if (
      this.position.x >
      window.innerWidth - this.tooltipBoxSize.width + 20
    ) {
      //taking into account margin (20px)
      return 'left'
    } else if (this.position.x < this.tooltipBoxSize.width + 20) {
      //taking into account margin (20px)
      return 'right'
    } else {
      return 'top'
    }
  }

  handleMouseMove (event: MouseEvent) {
    this.position = { x: event.clientX, y: event.clientY }
  }
}
</script>

<style scoped>
.tooltip-box {
  max-width: 100px;
  max-height: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tooltip-box:hover .tooltip {
  display: block;
}

.tooltip {
  color: #ffffff;
  text-align: center;
  padding: 5px 10px;
  border-radius: 2px;
  display: none;
  position: absolute;
  z-index: 5;
  background: rgba(51, 51, 51, 0.7);
}

.top {
  bottom: 100%;
}

.bottom {
  top: 100%;
}

.right {
  left: 100%;
}

.left {
  right: 100%;
}

.text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text::after {
  content: ' ';
  position: absolute;
  border-width: 5px;
  border-style: solid;
}

.text.top::after {
  top: 100%;
  border-color: rgba(51, 51, 51, 0.7) transparent transparent transparent;
}

.text.bottom::after {
  bottom: 100%;
  border-color: transparent transparent rgba(51, 51, 51, 0.7) transparent;
}

.text.right::after {
  right: 100%;
  border-color: transparent rgba(51, 51, 51, 0.7) transparent transparent;
}

.text.left::after {
  left: 100%;
  border-color: transparent transparent transparent rgba(51, 51, 51, 0.7);
}
</style>
