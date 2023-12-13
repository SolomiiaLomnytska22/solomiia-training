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
          <th />
        </tr>
      </thead>
      <tbody v-if="users.length > 0">
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.dateOfBirth }}</td>
          <td>{{ user.position }}</td>
          <td>{{ user.country }}</td>
          <td style="text-align: center">
            <span
              :class="{
                'online-dot': user.online,
                'offline-dot': !user.online
              }"
            />
          </td>
          <td>
            <div class="button-col">
              <div v-tooltip="{ text: 'Edit', styleType: 'top' }">
                <font-awesome-icon
                  icon="fa-pencil"
                  class="icon-button"
                  @click="$emit('edit', user)"
                />
              </div>
              <div v-tooltip="{ text: 'Delete', styleType: 'top' }">
                <font-awesome-icon
                  icon="fa-trash-can"
                  class="icon-button"
                  @click="$emit('delete', user)"
                />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td :colspan="colspan">
            <p>Fetching your data!</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { User } from '@/types'
import Button from '@/components/common/Button.vue'

@Component({
  components: { Button }
})
export default class UserTable extends Vue {
  @Prop({ required: true }) users!: User[]
  colspan: number = 0

  mounted () {
    this.colspan =
      this.$el.querySelector('.user-table thead tr')?.childElementCount || 0
  }
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .table-container {
    overflow-x: auto;
  }
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.button-col {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.button-col Button {
  margin: 0 5px;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.user-table th {
  background-color: #f2f2f2;
}

.user-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.online-dot,
.offline-dot {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 5px;
}

.online-dot {
  background-color: #4caf50;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.offline-dot {
  background-color: #ccc;
}

.icon-button {
  color: #333;
  margin: 10px;
}

.icon-button:hover {
  cursor: pointer;
  color: #4caf50;
}
</style>
