<template>
    <div class="table-container">
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Date of birth</th>
            <th>Position</th>
            <th>Country</th>
            <th>Online</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-if="users.length > 0">
          <tr v-for="(user) in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.dateOfBirth }}</td>
            <td>{{ user.position }}</td>
            <td>{{ user.country }}</td>
            <td style="text-align: center;">
              <span :class="{ 'online-dot': user.online, 'offline-dot': !user.online }"></span>
            </td>
            <td style="text-align: center;">
              <button class="edit-button" @click="editUser(user.id)">Edit</button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="8">Fetching your data!</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  
  export default {
    props: {
      users: Array,
    },
    methods: {
      editUser(userId) {
        console.log(userId);
      },
    },
  };
  </script>