<template>
  <div class="table-page">
    <div class="heading">
      <h1>User Table</h1>
      <Button
        type="button"
        @click="handleAddUser"
      >
        <font-awesome-icon icon="fa-plus" />
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
    <div class="search">
      <TextInput
        id="search"
        v-model="searchPhrase"
        pattern="^.{0,100}$"
      />
      <Button
        style-type="primary"
        @click="handleSearch"
      >
        <font-awesome-icon icon="fa-magnifying-glass" />
      </Button>
      <Button
        style-type="secondary"
        @click="emptyInput"
      >
        <font-awesome-icon icon="fa-trash-can" />
      </Button>
    </div>
    <UserTable
      :users="filteredUsers"
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
import TextInput from '@/components/common/TextInput.vue'

@Component({
  components: {
    TextInput,
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
  searchPhrase: string = ''
  filteredUsers: User[] = []
  maxSymbols: number = 100

  mounted () {
    this.getData()
  }

  emptyInput () {
    this.searchPhrase = ''
    this.handleSearch()
  }

  handleSearch () {
    if (this.searchPhrase.length <= this.maxSymbols) {
      if (this.findPhrase().length) {
        this.filteredUsers = this.findPhrase()
      } else {
        this.showToast('There is no entry with your search query.', 'warning')
        this.filteredUsers = this.users.slice()
      }
    } else {
      this.showToast('Your searching phrase is too long.', 'danger')
      this.filteredUsers = this.users.slice()
      this.emptyInput()
    }
  }

  findPhrase (): User[] {
    const searchTerm = this.searchPhrase.toLowerCase()
    return this.users.filter((user) => {
      const searchableValues = Object.values(user).map((value) =>
          value ? value.toString().toLowerCase() : ''
      )
      return searchableValues.some((value) => value.includes(searchTerm))
    })
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
    this.ToastNotification.show = false
  }

  handleConfirmDelete (): void {
    if (this.selectedUser !== null) {
      this.deleteUser(this.selectedUser)
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
        this.showConfirmation = false
        this.selectedUser = null
        this.showToast('Successfully deleted user.', 'success')
        await this.getData()
      } else {
        this.showToast('An error occurred while deleting the user.', 'danger')
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
      if (response.status === 200 && response.data != null) {
        this.users = response.data
        this.filteredUsers = this.users
      } else {
        this.showToast('An error occurred while loading information.', 'danger')
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

.search button {
  margin-left: 5px;
}

.search {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  width: 100%;
}
</style>
