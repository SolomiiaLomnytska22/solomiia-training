<template>
    <button @click="handleClick" :class="styleType" :type="type">
      {{title}}
    </button>
  </template>
  
  <script>
  export default {
    props: {
      styleType: {
        type: String,
        default: 'primary',
        validator: value => ['primary', 'secondary'].includes(value)
      },
      title: String,
      type: {
      type: String,
      default: 'button',
      validator: value => ['button', 'submit', 'reset'].includes(value),
      }
    },
    methods: {
    handleClick() {
      this.$emit('click'); 
    },
  },
  };
  </script>
  <style scoped>
  .primary {
    background-color: #4caf50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .primary:hover {
    background-color: #45a049;
  }

  .secondary{
    background: #fff;
    border-color: #4caf50;
    color:#4caf50;
    border-width: 2px;
    border-style: solid;
    border-radius: 4px;
    padding: 10px;
  }
  .secondary:hover{
    background: #c9c9c9;
    border-color:#327136;
    color:#327136;
  }
  </style>