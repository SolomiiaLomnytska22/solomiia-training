<template>
  <button
    :class="isDisabled ? 'disabled' : styleType"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
  @Prop({
    required: false,
    default: 'primary',
    validator: (value: string) => [ 'primary', 'secondary', 'disabled' ].includes(value)
  })
  styleType!: string
  @Prop({
    required: false,
    default: 'button',
    validator: (value: string) => [ 'button', 'submit', 'reset' ].includes(value)
  })
  type!: string
  @Prop({ required: false, default: false }) isDisabled!: boolean

  handleClick (): void {
    this.$emit('click')
  }
}
</script>

<style scoped>
button {
  cursor: pointer;
  border-radius: 4px;
  padding: 10px;
  border-width: 2px;
  border-style: solid;
}

.primary {
  background-color: #4caf50;
  border-color: #4caf50;
  color: #fff;
}

.primary:hover {
  background-color: #45a049;
  border-color: #45a049;
}

.secondary {
  background: #fff;
  border-color: #4caf50;
  color: #4caf50;
}

.secondary:hover {
  background: #c9c9c9;
  border-color: #327136;
  color: #327136;
}

.disabled {
  background: #ccc;
  border-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>
