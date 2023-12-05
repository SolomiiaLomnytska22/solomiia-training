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
        @show-toast="showToast"
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
    <Toast
      ref="toast"
      :style-type="styleType"
    >
      {{ message }}
    </Toast>
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
import Toast from './components/common/Toast.vue'
import { Ref } from 'vue-property-decorator'

@Component({
  components: {
    ConfirmationDialog,
    UserInfoModal,
    UserTable,
    Button,
    Toast
  }
})
export default class Users extends Vue {
  @Ref('toast') ToastNotification!: Toast
  users: User[] = []
  showUserInfoModal: boolean = false
  selectedUser: User | null = null
  showConfirmation: boolean = false
  message: string = ''
  styleType: string = 'success'

  mounted () {
    this.getData()
  }

  handleEditUser (user: User) {
    this.selectedUser = user
    this.showUserInfoModal = true
    this.ToastNotification.show = false
  }

  handleAddUser (): void {
    this.showUserInfoModal = true
    this.selectedUser = null
    this.ToastNotification.show = false
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

  showToast (message: string, style: string) {
    this.message = message
    this.styleType = style
    this.ToastNotification.showToast(5000)
  }

  async deleteUser (user: User): Promise<void> {
    try {
      const response: AxiosResponse = await axios.delete(
        `http://localhost:3000/users/${user.id}`
      )
      if (response.status === 200) {
        await this.getData()
        this.showToast('Successfully deleted user.', 'success')
      } else {
        this.showToast('Error deleting user: ' + response.statusText, 'danger')
      }
    } catch (error) {
      this.showToast('An error occurred while deleting the user.', 'danger')
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
        this.showToast(
          'Error while loading information: ' + response.statusText,
          'danger'
        )
      }
    } catch (error) {
      this.showToast('An error occurred while loading information.', 'danger')
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
