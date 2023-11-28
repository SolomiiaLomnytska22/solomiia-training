<template>
  <div class="table-page">
    <div class="heading">
      <h1>User Table</h1>
      <Button
        type="button"
        @click="handleAddClick"
      >
        Add
      </Button>
      <UserInfoModal
        :show-modal="showAddUserModal"
        :selected-user="selectedUser"
        @user-added="getData"
        @toggle="showAddUserModal = !showAddUserModal"
      />
    </div>
    <UserTable
      :users="users"
      @edit="handleEditEvent"
    />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import UserInfoModal from './components/users/UserInfoModal.vue'
import UserTable from './components/users/UserTable.vue'
import Button from './components/common/Button.vue'
import Component from 'vue-class-component'
import Vue from 'vue'
import { User } from './types'

@Component({
  components: {
    UserInfoModal,
    UserTable,
    Button
  }
})
export default class Users extends Vue {
  users: User[] = []
  showAddUserModal = false
  selectedUser: User | null = null

  mounted () {
    this.getData()
  }

  handleEditEvent (user: User) {
    this.selectedUser = user
    this.showAddUserModal = true
  }

  handleAddClick (): void {
    this.showAddUserModal = true
    this.selectedUser = null
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
