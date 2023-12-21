<template>
  <div class="table-container">
    <table class="user-table">
      <thead v-if="columns.length > 0">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody v-if="data.length > 0">
        <tr
          v-for="item in data"
          :key="item.id"
        >
          <td
            v-for="column in columns"
            :key="column.key"
          >
            <template v-if="column.slot">
              <slot
                :name="column.slot"
                :item="item"
              />
            </template>
            <template v-else>
              {{ item[column.key] }}
            </template>
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="columns.length > 0">
        <tr>
          <td :colspan="columns.length">
            <p>Waiting for your data!</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { TableColumn } from '@/types'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Table extends Vue {
  @Prop({ required: true }) columns!: TableColumn[]
  @Prop({ required: true }) data!: Array<any>
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

.user-table tbody tr td p {
  text-align: center;
}
</style>
