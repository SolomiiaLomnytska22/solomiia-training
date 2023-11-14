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

import AddUserForm from '../InputForms/AddUserForm.vue';
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
  
  
  
 
  