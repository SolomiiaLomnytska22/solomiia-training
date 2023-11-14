<template>
    <div class="table-page">
      <div class="heading">
        <h1>User Table</h1>
        <CustomButton class="edit-button" type="button" caption="Add" @click="showAddUserModal = true;"/>
        <AddUserModal :showModal="showAddUserModal" @user-added="handleUserAdded" @toggle="showAddUserModal=!showAddUserModal;"/>
      </div>
      <UserTable :users="users"/>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import AddUserModal from "./AddUserModal.vue";
  import UserTable from "./UserTable.vue";
  import CustomButton from '../AtomComponents/CustomButton.vue';
  export default {
    components:{
      AddUserModal,
      UserTable,
      CustomButton
    },
    data() {
      return {
        users: [],
        showAddUserModal: false
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        axios.get("http://localhost:3000/users").then((response) => {
          if (response.status === 200) {
            this.users = response.data;
          } else {
            window.alert("Error while loading information: " + response.statusText);
          }
        });
   
      },
      handleUserAdded(){
        this.getData();
      }
    },
  };
  </script>
  
  