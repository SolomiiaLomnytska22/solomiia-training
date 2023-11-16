<template>
 
      <div v-if="showModal" class="modal" @click="clickOutsideModal">
        <div ref="modalContent" class="modal-content">
          <div class = "heading">
          <h2>Add New User</h2>
        </div>

        <AddUserForm @close="closeAddUserModal" @user-added="handleAddition"/>
        </div>
      </div>
  
  </template>
  
  <script>
import AddUserForm from './AddUserForm.vue';
  export default {
    components:{
      AddUserForm
    },
    data() {
      return {
        showAddUserModal: true,
      };
    },
    props: {
      showModal: Boolean,
    },
    methods: {
       clickOutsideModal(event) {
        if (!this.$refs.modalContent.contains(event.target)) {
            this.closeAddUserModal();
      }
      },
      closeAddUserModal(){
            this.$emit('toggle');
      },
     handleAddition(){
      this.$emit("user-added", "toggle");
     }
     
    },
  };
  </script>
  
  
  <style scoped>
  .modal {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.9);
    z-index: 1;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    width: 30%;
    min-width: 200px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  .modal-content .heading{
    padding-top: 0px;
  }
  .modal-content .heading h2{
    margin-top: 0px;
  }
  </style>
 
  