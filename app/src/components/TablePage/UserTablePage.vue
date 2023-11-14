<template>
    <div class="table-page">
      <div class="heading">
        <h1>User Table</h1>
        <CustomButton class="add-button" type="button" caption="Add" @click="showAddUserModal = true;"/>
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

 <style scoped>
  .table-page .heading {
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

  }
  
  .table-page {
    margin: 10px 5%;
    margin-top: 50px;
  }
  
  .add-button {
    background-color: #4caf50;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    max-height: 32px;
  }
  
  .add-button:hover {
    background-color: #327136;
  }
</style>
  
  