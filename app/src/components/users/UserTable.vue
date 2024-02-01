<template>
  <div>
    <Table
      :columns="columns"
      :data="users"
    >
      <template #actions="{ item }">
        <div class="button-col">
          <div v-tooltip="{ text: 'Edit', styleType: 'top' }">
            <font-awesome-icon
              icon="fa-pencil"
              class="icon-button"
              @click="$emit('edit', item)"
            />
          </div>
          <div v-tooltip="{ text: 'Delete', styleType: 'top' }">
            <font-awesome-icon
              icon="fa-trash-can"
              class="icon-button"
              @click="$emit('delete', item)"
            />
          </div>
        </div>
      </template>
      <template #online="{ item }">
        <div class="button-col">
          <span
            :class="{
              'online-dot': getOnline(item),
              'offline-dot': !getOnline(item)
            }"
          />
        </div>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { TableColumn, User } from '@/types'
import Button from '@/components/common/Button.vue'
import Table from '@/components/common/Table.vue'

@Component({
  components: { Button, Table }
})
export default class UserTable extends Vue {
  @Prop({ required: true }) users!: User[]
  columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'surname', label: 'Surname' },
    { key: 'dateOfBirth', label: 'Date of birth' },
    { key: 'position', label: 'Position' },
    { key: 'country', label: 'Country' },
    { key: 'online', label: 'Online', slot: 'online' },
    { key: 'actions', label: 'Actions', slot: 'actions' }
  ]

  getOnline (user: User): boolean {
    return user.online
  }
}
</script>

<style scoped>
.button-col {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.button-col Button {
  margin: 0 5px;
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
