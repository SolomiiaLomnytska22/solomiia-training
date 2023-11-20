<template>
  <button
    :class="styleType"
    :type="type"
    @click="handleClick"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    styleType: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary'].includes(value)
    },
    title: String,
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
button {
  cursor: pointer;
  border-radius: 4px;
  padding: 10px;
}

.primary {
  background-color: #4caf50;
  color: #fff;
  border: none;
}

.primary:hover {
  background-color: #45a049;
}

.secondary {
  background: #fff;
  border-color: #4caf50;
  color: #4caf50;
  border-width: 2px;
  border-style: solid;
}

.secondary:hover {
  background: #c9c9c9;
  border-color: #327136;
  color: #327136;
}
</style>
