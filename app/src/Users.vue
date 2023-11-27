<template>
  <div class="table-page">
    <div class="heading">
      <h1>User Table</h1>
      <Button
        type="button"
        title="Add"
        @click="showAddUserModal = true"
      />
      <AddUserModal
        :show-modal="showAddUserModal"
        @user-added="getData"
        @toggle="showAddUserModal = !showAddUserModal"
      />
    </div>
    <UserTable :users="users" />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import AddUserModal from './components/users/AddUserModal.vue'
import UserTable from './components/users/UserTable.vue'
import Button from './components/common/Button.vue'
import Component from 'vue-class-component'
import Vue from 'vue'
import UserModel from '@/models/UserModel'

@Component({
  components: {
    AddUserModal,
    UserTable,
    Button
  }
})
export default class Users extends Vue {
  users: UserModel[] = []
  showAddUserModal = false

  mounted () {
    this.getData()
  }

  getData (): void {
    axios.get('http://localhost:3000/users').then((response) => {
      if (response.status === 200) {
        this.users = response.data
      } else {
        window.alert('Error while loading information: ' + response.statusText)
      }
    })
  }
}
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
  margin: 50px 5% 10px;
}
</style>
