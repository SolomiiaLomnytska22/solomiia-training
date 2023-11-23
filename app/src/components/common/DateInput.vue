<template>
  <div class="input-field">
    <label :for="id">{{ label }}:</label>
    <input
      :id="id"
      type="date"
      :value="value"
      :required="required"
      :max="maxDate"
      :min="minDate"
      @input="updateValue"
    >
  </div>
</template>

<script>
import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'

@Component
export default class DateInput extends Vue {
  @Prop({ type: String }) label
  @Prop({ type: String }) id
  @Prop({ type: String }) value
  @Prop({ type: Boolean }) required
  @Prop({ type: String }) maxDate
  @Prop({ type: String }) minDate
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

.input-field {
  display: flex;
  flex-direction: column;
  text-align: start;
}
</style>