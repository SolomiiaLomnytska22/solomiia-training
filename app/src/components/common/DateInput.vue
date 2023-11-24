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

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import {Prop} from 'vue-property-decorator'

@Component
export default class DateInput extends Vue {
  @Prop({required: true}) label!: string;
  @Prop({required: true}) id!: string;
  @Prop({required: true}) value!: string;
  @Prop({
    required: false,
    default: false
  })
  required!: boolean;
  @Prop({required: true}) maxDate!: string;
  @Prop({required: true}) minDate!: string;

  updateValue(event: Event): void {
    this.$emit('update:value', (event.target as HTMLInputElement).value)
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