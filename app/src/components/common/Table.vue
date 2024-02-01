<template>
  <div class="table-container">
    <table class="user-table">
      <thead v-if="columns.length">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
          >
            {{ getLabel(column) }}
          </th>
        </tr>
      </thead>
      <tbody v-if="data.length > 0">
        <tr
          v-for="item in paginatedData"
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
              {{ getEntry(column, item) }}
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
    <Pagination
      :total-rows="data.length"
      :current-page="currentPage"
      :rows-per-page="currentRowsPerPage"
      :max-visible-pages="3"
      @page-change="handlePageChange"
      @rows-per-page-change="handleRowsPerPageChange"
    />
  </div>
</template>

<script lang="ts">
import { TableColumn } from '@/types'
import { Vue, Component, Prop } from 'vue-property-decorator'
import Pagination from '@/components/common/Pagination.vue'

@Component({
  components: { Pagination }
})
export default class Table extends Vue {
  @Prop({ required: true }) columns!: TableColumn[]
  @Prop({ required: true }) data!: Array<{ [key: string]: string }>
  currentPage: number = 1
  rowsPerPage: number = 0

  getLabel (column: TableColumn): string {
    return column.label ? column.label : ''
  }

  getEntry (column: TableColumn, item: { [key: string]: string }): string {
    return item[ column.key ]
  }

  get paginatedData (): { [key: string]: string }[] {
    const startIndex = (this.currentPage - 1) * this.currentRowsPerPage
    const endIndex = startIndex + this.currentRowsPerPage
    return this.data.slice(startIndex, endIndex)
  }

  get currentRowsPerPage (): number {
    if (!this.rowsPerPage) {
      this.rowsPerPage = this.data.length
    }
    return this.rowsPerPage
  }

  handlePageChange (newPage: number) {
    this.currentPage = newPage
  }

  handleRowsPerPageChange (newRowsPerPage: number) {
    this.rowsPerPage = newRowsPerPage
    this.currentPage = 1
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
