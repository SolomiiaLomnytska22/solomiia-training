<template>
  <form @submit.prevent="addUser">
    <TextInput
      id="name"
      label="Name"
      :value="newUser.name"
      :required="true"
      pattern="[A-Za-z '\-]+"
      title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed"
      @update:value="updateUser('name', $event)"
    />
    <TextInput
      id="surname"
      label="Surname"
      :value="newUser.surname"
      :required="true"
      pattern="[A-Za-z '\-]+"
      title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed"
      @update:value="updateUser('surname', $event)"
    />
    <DateInputField
      id="dateOfBirth"
      label="Date of Birth"
      :value="newUser.dateOfBirth"
      :required="true"
      :min-date="minDate"
      :max-date="maxDate"
      @update:value="updateUser('dateOfBirth', $event)"
    />
    <TextInput
      id="position"
      label="Position"
      :value="newUser.position"
      :required="true"
      pattern="[A-Za-z '\-]+"
      title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed"
      @update:value="updateUser('position', $event)"
    />
    <TextInput
      id="country"
      label="Country"
      :value="newUser.country"
      :required="true"
      pattern="[A-Za-z '\-]+"
      title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed"
      @update:value="updateUser('country', $event)"
    />
    <div class="modal-buttons">
      <Button
        style-type="secondary"
        type="button"
        title="Close"
        @click="closeClick"
      />
      <Button
        type="submit"
        title="Add"
      />
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import Button from '../common/Button.vue'
import DateInput from '../common/DateInput.vue'
import TextInput from '../common/TextInput.vue'
import { DATE_CONSTANTS } from '@/constants'

export default {
  components: {
    Button,
    DateInputField: DateInput,
    TextInput
  },
  data() {
    const currentDate = new Date()
    const { MIN_YEAR_OFFSET, MAX_YEAR_OFFSET } = DATE_CONSTANTS
    return {
      newUser: {
        name: '',
        surname: '',
        dateOfBirth: '',
        position: '',
        country: ''
      },
      //User cannot be older than 100 years old.
      minDate: new Date(
        currentDate.getFullYear() - MIN_YEAR_OFFSET,
        currentDate.getMonth(),
        currentDate.getDay()
      )
        .toISOString()
        .split('T')[0],
      //User cannot be younger than 14 years old.
      maxDate: new Date(
        currentDate.getFullYear() - MAX_YEAR_OFFSET,
        currentDate.getMonth(),
        currentDate.getDay()
      )
        .toISOString()
        .split('T')[0]
    }
  },
  methods: {
    closeClick() {
      this.resetNewUser()
      this.$emit('close')
    },
    addUser() {
      axios
        .post('http://localhost:3000/users', this.newUser)
        .then((response) => {
          if (response.status === 201) {
            this.$emit('user-added')
            this.closeClick()
          } else {
            window.alert('Error while adding user: ' + response.statusText)
          }
        })
    },
    updateUser(field, value) {
      this.$set(this.newUser, field, value)
    },
    resetNewUser() {
      this.newUser = {
        name: '',
        surname: '',
        dateOfBirth: '',
        position: '',
        country: ''
      }
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
