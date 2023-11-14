<template>
    <div>
      <label :for="id">{{ label }}:</label>
      <input type="date" :id="id" :value="value" @input="updateValue" :required="isRequired" :max="maxDate" :min="minDate" />
    </div>
  </template>
  
  <script>
  export default {
    data(){
        return{
        minDate: new Date(new Date().getFullYear() - 100, 0, 1).toISOString().split("T")[0],
        maxDate: new Date(new Date().getFullYear() - 14, 11, 31).toISOString().split("T")[0],
        };
    },
    props: {
      label: String,
      id: String,
      value: String,
      isRequired: Boolean
    },
    methods: {
      updateValue(event) {
        this.$emit("update:value", event.target.value);
      },
    },
  };
  </script>
  