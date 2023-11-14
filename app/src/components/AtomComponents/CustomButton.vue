<template>
    <button @click="handleClick" :class="buttonClass" :type="type">
      {{caption}}
    </button>
  </template>
  
  <script>
  export default {
    props: {
      buttonClass: String,
      caption: String,
      type: {
      type: String,
      required: true,
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
  button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>