<template>
    <div class="input-field">
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

  <style scoped>
  input {
    margin-bottom: 15px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    
  }

  label {
    margin-bottom: 5px;
  }

  .input-field{
    display: flex;
    flex-direction: column;
    text-align: start;
  }
  </style>
  