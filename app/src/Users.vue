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

<script>
import axios from 'axios'
import AddUserModal from './components/users/AddUserModal.vue'
import UserTable from './components/users/UserTable.vue'
import Button from './components/common/Button.vue'

export default {
  components: {
    AddUserModal,
    UserTable,
    Button
  },
  data() {
    return {
      users: [],
      showAddUserModal: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get('http://localhost:3000/users').then((response) => {
        if (response.status === 200) {
          this.users = response.data
        } else {
          window.alert(
            'Error while loading information: ' + response.statusText
          )
        }
      })
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
