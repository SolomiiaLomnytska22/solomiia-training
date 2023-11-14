<template>
    <div>
      <label :for="id">{{ label }}:</label>
      <input type="text" :id="id" :value="value" @input="updateValue" :required="isRequired" :pattern="pattern" :title="title" />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      label: String,
      id: String,
      value: String,
      isRequired: Boolean,
      pattern: String,
      title: String,
    },
    methods: {
      updateValue(event) {
        this.$emit("update:value", event.target.value);
      },
    },
  };
  </script>
  