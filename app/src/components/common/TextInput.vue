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

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'

@Component
export default class TextInput extends Vue {
  @Prop({ required: true }) label!: string
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) value!: string
  @Prop({ required: false, default: false }) required!: boolean
  @Prop({ required: false, default: null }) pattern!: string
  @Prop({ required: false, default: '' }) title!: string

  updateValue (event: Event): void {
    this.$emit('input', (event.target as HTMLInputElement).value)
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
