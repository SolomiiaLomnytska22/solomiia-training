<template>
  <form @submit.prevent="addUser">
    <TextInput
      label="Name"
      id="name"
      :value="newUser.name"
      @update:value="updateUser('name', $event)"
      :isRequired="true"
      pattern="[A-Za-z '\-]+"
      title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed"
    />
    <TextInput
      label="Surname"
      id="surname"
      :value="newUser.surname"
      @update:value="updateUser('surname', $event)"
      :isRequired="true"
      pattern="[A-Za-z '\-]+"
      title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed"
    />

    <DateInputField
      label="Date of Birth"
      id="dateOfBirth"
      :value="newUser.dateOfBirth"
      @update:value="updateUser('dateOfBirth', $event)"
      :isRequired="true"
      :minDate="minDate"
      :maxDate="maxDate"
    />

    <TextInput
      label="Position"
      id="position"
      :value="newUser.position"
      @update:value="updateUser('position', $event)"
      :isRequired="true"
      pattern="[A-Za-z '\-]+"
      title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed"
    />

    <TextInput
      label="Country"
      id="country"
      :value="newUser.country"
      @update:value="updateUser('country', $event)"
      :isRequired="true"
      pattern="[A-Za-z '\-]+"
      title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed"
    />

    <div class ="modal-buttons">
      <CustomButton styleType="secondary" type="button" title="Close" @click="closeClick"/>
      <CustomButton type="submit" title="Add"/>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import CustomButton from "../common/Button.vue"
import DateInput from "../common/DateInput.vue"
import TextInput from "../common/TextInput.vue"
import { DATE_CONSTANTS } from '@/constants'
export default {
  data(){
    const currentDate = new Date();
    const { MIN_YEAR_OFFSET, MAX_YEAR_OFFSET } = DATE_CONSTANTS;
    return{
      newUser: {
        name: '',
        surname: '',
        dateOfBirth: '',
        position: '',
        country: '',
      },
      //User cannot be older than 100 years old.
      minDate: new Date(currentDate.getFullYear() - MIN_YEAR_OFFSET, currentDate.getMonth(), currentDate.getDay()).toISOString().split("T")[0],
      //User cannot be younger than 14 years old.
      maxDate: new Date(currentDate.getFullYear() - MAX_YEAR_OFFSET, currentDate.getMonth(), currentDate.getDay()).toISOString().split("T")[0],
    };
  },
  components:{
    CustomButton,
    DateInputField: DateInput,
    TextInput
  },
  methods:{
    closeClick(){
      this.resetNewUser();
      this.$emit("close");
    },
    addUser() {
        axios.post("http://localhost:3000/users", this.newUser).then((response) => {
          if (response.status === 201) {
            this.$emit("user-added");
            this.closeClick();
          } else {
            window.alert("Error while adding user: " + response.statusText);
          }
        });
      },
      updateUser(field, value) {
      this.$set(this.newUser, field, value);
    },
     resetNewUser() {
        this.newUser = {
          name: "",
          surname: "",
          dateOfBirth: "",
          position: "",
          country: "",
        };
      },
  }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
  }
  
  .modal-buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  
  </style>
