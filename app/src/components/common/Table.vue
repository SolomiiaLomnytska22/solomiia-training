<template>
  <div class="table-container">
    <table class="user-table">
      <thead v-if="columns.length">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            @click="setSortingColumn(column)"
          >
            <div class="header-item">
              {{ getLabel(column) }}
              <span v-if="column.isSortable">
                <font-awesome-icon
                  v-if="isAscending(column.sortOrder)"
                  icon="fa-plus fa-sort-up"
                />
                <font-awesome-icon
                  v-else-if="isDescending(column.sortOrder)"
                  icon="fa-plus fa-sort-down"
                />
                <font-awesome-icon
                  v-else
                  icon="fa-plus fa-sort"
                />
              </span>
            </div>
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
import { TableColumn, SortOrder, SortRule, TableInput } from '@/types'
import { Vue, Component, Prop } from 'vue-property-decorator'
import Pagination from '@/components/common/Pagination.vue'

@Component({
  components: { Pagination }
})
export default class Table extends Vue {
  @Prop({ required: true }) columns!: TableColumn[]
  @Prop({ required: true }) data!: Array<TableInput>
  currentPage: number = 1
  rowsPerPage: number = 0
  sortedData: Array<TableInput> = []
  sortingColumn: TableColumn | undefined = undefined
  sortingRules: SortRule[] = [
    {
      currSort: SortOrder.NEUTRAL,
      nextSort: SortOrder.ASC
    },
    {
      currSort: SortOrder.ASC,
      nextSort: SortOrder.DESC,
      compareFn: (firstObjectToSort: any, secondObjectToSort: any) =>
          typeof firstObjectToSort === 'string' && typeof secondObjectToSort === 'string'
              ? firstObjectToSort.toLowerCase().localeCompare(secondObjectToSort.toLowerCase())
              : firstObjectToSort > secondObjectToSort ? 1 : -1
    },
    {
      currSort: SortOrder.DESC,
      nextSort: SortOrder.NEUTRAL,
      compareFn: (firstObjectToSort: any, secondObjectToSort: any) =>
          typeof firstObjectToSort === 'string' && typeof secondObjectToSort === 'string'
              ? secondObjectToSort.toLowerCase().localeCompare(firstObjectToSort.toLowerCase())
              : firstObjectToSort > secondObjectToSort ? -1 : 1
    }
  ]

  mounted () {
    this.columns.forEach((column) => {
      if (column.isSortable && !column.sortOrder) {
        this.$set(column, 'sortOrder', SortOrder.NEUTRAL)
      }
    })
  }

  getLabel (column: TableColumn): string {
    return column.label || ''
  }

  getEntry (column: TableColumn, item: TableInput): string {
    const keyValue = item as { [key: string]: string | boolean | number }
    return keyValue[ column.key ].toString()
  }

  get paginatedData (): TableInput [] {
    const startIndex = (this.currentPage - 1) * this.currentRowsPerPage
    const endIndex = startIndex + this.currentRowsPerPage
    return this.displayData.slice(startIndex, endIndex)
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

  setSortingColumn (column: TableColumn) {
    if (column.isSortable) {
      this.sortingColumn = column
      column.sortOrder = this.sortingRules.find(
          (rule) => rule.currSort === column.sortOrder
      )!.nextSort
      this.updateSortedData()
    }
  }

  get displayData (): Array<TableInput> {
    this.sortedData = this.data.slice()
    this.updateSortedData()
    return this.sortedData
  }

  isAscending (order : SortOrder|undefined): boolean {
    return order === SortOrder.ASC
  }

  isDescending (order : SortOrder|undefined): boolean {
    return order === SortOrder.DESC
  }
  updateSortedData () {
    if (this.sortingColumn) {
      const rule = this.sortingRules.find((rule) => rule.currSort === this.sortingColumn!.sortOrder)
      if (rule && rule.currSort !== SortOrder.NEUTRAL) {
        this.sortedData.sort((firstObjectToSort: any, secondObjectToSort: any) =>
            rule.compareFn!(
                firstObjectToSort[ this.sortingColumn!.key ],
                secondObjectToSort[ this.sortingColumn!.key ]
            )
        )
      }
    }
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

.header-item {
  display: flex;
  justify-content: space-between;
}
</style>
