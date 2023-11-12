<template>
    <div>
      <button class="edit-button" @click="showAddUserModal = true;">Add</button>
  
      <div v-if="showAddUserModal" class="modal" @click="clickOutsideModal">
        <div  ref="modalContent" class="modal-content">
          <div class = "heading">
          <h2>Add New User</h2>
     
        </div>
          <form @submit.prevent="addUser">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="newUser.name" required pattern="[A-Za-z '\-]+" title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed">
  
            <label for="surname">Surname:</label>
            <input type="text" id="surname" v-model="newUser.surname" required pattern="[A-Za-z '\-]+" title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed">
  
            <label for="dateOfBirth">Date of Birth:</label>
            <input type="date" id="dateOfBirth" v-model="newUser.dateOfBirth" required :max="maxDate" :min="minDate">
  
            <label for="position">Position:</label>
            <input type="text" id="position" v-model="newUser.position" required pattern="[A-Za-z '\-]+" title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed">
  
            <label for="country">Country:</label>
            <input type="text" id="country" v-model="newUser.country" required pattern="[A-Za-z '\-]+" title="Only letters, spaces, hyphens, apostrophes, and backticks are allowed">
  
            <div class ="modal-buttons"><button @click="closeAddUserModal" class="close-btn">Close</button><button type="submit">Add User</button></div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        showAddUserModal: false,
        minDate: new Date(new Date().getFullYear() - 100, 0, 1).toISOString().split("T")[0],
        maxDate: new Date(new Date().getFullYear() - 14, 11, 31).toISOString().split("T")[0],
        newUser: {
          name: "",
          surname: "",
          dateOfBirth: "",
          position: "",
          country: "",
        },
      };
    },
    methods: {
       clickOutsideModal(event) {
        if (!this.$refs.modalContent.contains(event.target)) {
            this.closeAddUserModal();
      }
        
      },
      closeAddUserModal(){
        this.showAddUserModal = false;
            this.resetNewUser();
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
      addUser() {
        axios.post("http://localhost:3000/users", this.newUser).then((response) => {
          if (response.status === 201) {
            this.$emit("user-added");
            this.closeAddUserModal();
          } else {
            window.alert("Error while adding user: " + response.statusText);
          }
        });
      },
    },
  };
  </script>
  
  
  
 
  