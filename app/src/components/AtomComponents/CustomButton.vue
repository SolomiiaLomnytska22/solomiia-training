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