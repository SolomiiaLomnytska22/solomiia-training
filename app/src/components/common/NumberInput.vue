<template>
  <div class="input-field">
    <label :for="id">{{ label }}:</label>
    <input
      :id="id"
      type="number"
      :value="value"
      :required="required"
      :min="min"
      :max="max"
      :step="step"
      @input="updateValue"
    >
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';

@Component
export default class NumberInput extends Vue {
  @Prop({ required: true }) label!: string;
  @Prop({ required: true }) id!: string;
  @Prop({ required: true }) value!: number;
  @Prop({ required: false, default: false }) required!: boolean;
  @Prop({ required: false, default: null }) title!: string;
  @Prop({ required: false, default: null }) min!: number;
  @Prop({ required: false, default: null }) max!: number;
  @Prop({ required: false, default: null }) step!: number;

  updateValue (event: Event): void {
    const inputValue = parseFloat((event.target as HTMLInputElement).value)
    if(!isNaN(inputValue)) {
      this.$emit('input', inputValue);
    }
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

