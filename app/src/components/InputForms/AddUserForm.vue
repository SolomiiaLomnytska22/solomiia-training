<template>
          <div>
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
                <CustomButton class="close-btn" type="button" caption="Close" @click="closeClick"/>
                <CustomButton type="submit" caption="Add"/>
              </div>
            </form>
          </div>
</template>

<script>
import axios from 'axios';
import CustomButton from "../AtomComponents/CustomButton.vue"
import DateInputField from "../AtomComponents/DateInputField.vue"
import TextInput from "../AtomComponents/TextInput.vue"
export default {
  data(){
    return{
      newUser: {
        name: '',
        surname: '',
        dateOfBirth: '',
        position: '',
        country: '',
      },
    }
  },
  components:{
    CustomButton,
    DateInputField,
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

