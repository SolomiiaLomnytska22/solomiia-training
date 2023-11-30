<template>
  <div class="table-page">
    <div class="heading">
      <h1>User Table</h1>
      <Button
        type="button"
        @click="handleAddUser"
      >
        Add
      </Button>
      <UserInfoModal
        :show-modal="showUserInfoModal"
        :selected-user="selectedUser"
        @user-added="getData"
        @toggle="showUserInfoModal = !showUserInfoModal"
      />
      <ConfirmationDialog
        v-if="showConfirmation"
        @confirm="handleConfirmDelete"
        @cancel="handleCancelDelete"
      >
        <h3>
          Are you sure you want to delete {{ selectedUser.name }}
          {{ selectedUser.surname }}?
        </h3>
        <p>You can't undo this action.</p>
      </ConfirmationDialog>
    </div>
    <UserTable
      :users="users"
      @edit="handleEditUser"
      @delete="handleDeleteUser"
    />
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios'
import UserInfoModal from './components/users/UserInfoModal.vue'
import UserTable from './components/users/UserTable.vue'
import Button from './components/common/Button.vue'
import Component from 'vue-class-component'
import Vue from 'vue'
import { User } from './types'
import ConfirmationDialog from '@/components/common/ConfirmationDialog.vue'

@Component({
  components: {
    ConfirmationDialog,
    UserInfoModal,
    UserTable,
    Button
  }
})
export default class Users extends Vue {
  users: User[] = []
  showUserInfoModal = false
  selectedUser: User | null = null
  showConfirmation = false

  mounted () {
    this.getData()
  }

  handleEditUser (user: User) {
    this.selectedUser = user
    this.showUserInfoModal = true
  }

  handleAddUser (): void {
    this.showUserInfoModal = true
    this.selectedUser = null
  }

  handleDeleteUser (user: User): void {
    this.showConfirmation = true
    this.selectedUser = user
  }

  handleConfirmDelete (): void {
    if (this.selectedUser) {
      this.deleteUser(this.selectedUser)
      this.showConfirmation = false
      this.selectedUser = null
    }
  }

  handleCancelDelete (): void {
    this.showConfirmation = false
    this.selectedUser = null
  }

  async deleteUser (user: User): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(
        `http://localhost:3000/users/${user.id}`
      )
      if (response.status === 200) {
        await this.getData()
      } else {
        window.alert('Error deleting user: ' + response.statusText)
      }
    } catch (error) {
      window.alert('An error occurred while deleting the user.')
    }
  }

  async getData (): Promise<void> {
    try {
      const response: AxiosResponse = await axios.get(
        'http://localhost:3000/users'
      )

      if (response.status === 200) {
        this.users = response.data
      } else {
        window.alert('Error while loading information: ' + response.statusText)
      }
    } catch (error) {
      window.alert('An error occurred while loading information.')
    }
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
