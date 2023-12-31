<template>
  <form @submit.prevent="submitForm">
    <TextInput
      id="name"
      v-model="newUserData.name"
      label="Name"
      :required="true"
      pattern="[A-Za-z '\-]+"
      title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed"
    />
    <TextInput
      id="surname"
      v-model="newUserData.surname"
      label="Surname"
      :required="true"
      pattern="[A-Za-z '\-]+"
      title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed"
    />
    <DateInput
      id="dateOfBirth"
      v-model="newUserData.dateOfBirth"
      label="Date of Birth"
      :required="true"
      :min-date="minDate"
      :max-date="maxDate"
    />
    <TextInput
      id="position"
      v-model="newUserData.position"
      label="Position"
      :required="true"
      pattern="[A-Za-z '\-]+"
      title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed"
    />
    <TextInput
      id="country"
      v-model="newUserData.country"
      label="Country"
      :required="true"
      pattern="[A-Za-z '\-]+"
      title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed"
    />
    <div class="modal-buttons">
      <Button
        style-type="secondary"
        type="button"
        @click="closeClick"
      >
        Close
      </Button>
      <Button type="submit">
        {{ title }}
      </Button>
    </div>
  </form>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios'
import Button from '../common/Button.vue'
import DateInput from '../common/DateInput.vue'
import TextInput from '../common/TextInput.vue'
import { DATE_CONSTANTS } from '@/constants'
import Component from 'vue-class-component'
import Vue from 'vue'
import { User } from '@/types'
import { Prop } from 'vue-property-decorator'

const currentDate = new Date(Date.now());
const { MIN_YEAR_OFFSET, MAX_YEAR_OFFSET } = DATE_CONSTANTS
@Component({
  components: {
    Button,
    DateInput,
    TextInput
  }
})
export default class AddUserForm extends Vue {
  @Prop({ required: true }) action!: string
  @Prop({ required: false, default: null }) selectedUser!: User | null

  newUserData: User = {
    id: null,
    name: '',
    surname: '',
    dateOfBirth: '',
    position: '',
    country: '',
    online: false
  }
  //User cannot be older than 100 years old.
  minDate = new Date(
    currentDate.getFullYear() - MIN_YEAR_OFFSET,
    currentDate.getMonth(),
    currentDate.getDay()
  )
    .toISOString()
    .split('T')[ 0 ]
  //User cannot be younger than 14 years old.
  maxDate = new Date(
    currentDate.getFullYear() - MAX_YEAR_OFFSET,
    currentDate.getMonth(),
    currentDate.getDay()
  )
    .toISOString()
    .split('T')[ 0 ]

  mounted () {
    this.newUserData = this.selectedUser
      ? { ...this.selectedUser }
      : this.newUserData
  }

  get title (): string {
    return this.action === 'add' ? 'Add' : 'Save'
  }

  closeClick (): void {
    this.$emit('close')
  }

  async addUser (): Promise<void> {
    try {
      const response: AxiosResponse = await axios.post(
        'http://localhost:3000/users',
        this.newUserData
      )

      if (response.status === 201) {
        this.$emit('data-saved')
        this.$emit('show-toast', 'Successfully added user.', 'success')
        this.closeClick()
      } else {
        this.$emit(
          'show-toast',
          'An error occurred while adding user.',
          'danger'
        )
      }
    } catch (error) {
      this.$emit('show-toast', 'An error occurred while adding user.', 'danger')
    }
  }

  async saveUser (): Promise<void> {
    try {
      const response: AxiosResponse = await axios.put(
        `http://localhost:3000/users/${this.newUserData.id}`,
        this.newUserData
      )
      if (response.status === 200) {
        this.$emit('data-saved')
        this.$emit('show-toast', 'Successfully edited user.', 'success')
        this.closeClick()
      } else {
        this.$emit(
          'show-toast',
          'An error occurred while editing user.',
          'danger'
        )
      }
    } catch (error) {
      this.$emit(
        'show-toast',
        'An error occurred while editing user.',
        'danger'
      )
    }
  }

  submitForm (): void {
    if (this.action === 'add') {
      this.addUser()
    } else {
      this.saveUser()
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.modal-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
</style>
