<template>
  <div class="input-field">
    <label :for="id">{{ label }}:</label>
    <input
      :id="id"
      type="text"
      :value="value"
      :required="required"
      :pattern="pattern"
      :title="title"
      @input="updateValue"
    >
  </div>
</template>

<script>
import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  props: {
    label: String,
    id: String,
    value: String,
    required: Boolean,
    pattern: String,
    title: String
  }
})
export default class TextInput extends Vue {
  updateValue(event) {
    this.$emit('update:value', event.target.value)
  }
}
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

input {
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

label {
  margin-bottom: 5px;
}

.input-field {
  display: flex;
  flex-direction: column;
  text-align: start;
}
</style>
