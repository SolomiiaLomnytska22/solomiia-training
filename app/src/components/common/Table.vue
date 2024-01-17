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
                  v-if="column.sortOrder === SortOrder.ASC"
                  icon="fa-plus fa-sort-up"
                />
                <font-awesome-icon
                  v-else-if="column.sortOrder === SortOrder.DESC"
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
      <tbody v-if="displayData.length > 0">
        <tr
          v-for="item in displayData"
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
  </div>
</template>

<script lang="ts">
import { TableColumn, SortOrder, SortRule } from '@/types'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  computed: {
    SortOrder () {
      return SortOrder
    }
  }
})
export default class Table extends Vue {
  @Prop({ required: true }) columns!: TableColumn[]
  @Prop({ required: true }) data!: Array<any>
  sortedData: Array<any> = []
  sortingColumn: TableColumn | undefined = undefined
  sortingRules : SortRule[] = [
    {
      currSort: SortOrder.NEUTRAL,
      nextSort: SortOrder.ASC
    },
    {
      currSort: SortOrder.ASC,
      nextSort: SortOrder.DESC,
      compareFn: (a: any, b: any) =>
        typeof a === 'string' && typeof b === 'string'
          ? a.toLowerCase().localeCompare(b.toLowerCase())
          : a > b ? 1 : -1
    },
    {
      currSort: SortOrder.DESC,
      nextSort: SortOrder.NEUTRAL,
      compareFn: (a: any, b: any) =>
        typeof a === 'string' && typeof b === 'string'
          ? b.toLowerCase().localeCompare(a.toLowerCase())
          : a > b ? -1 : 1
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

  getEntry (column: TableColumn, item: any): string {
    return item[ column.key ]
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

  get displayData () : Array<any> {
    this.sortedData = this.data.slice()
    this.updateSortedData()
    return this.sortedData
  }

  updateSortedData () {
    if (this.sortingColumn) {
      const rule = this.sortingRules.find((rule) => rule.currSort === this.sortingColumn!.sortOrder)
      if (rule && rule.currSort !== SortOrder.NEUTRAL) {
        this.sortedData.sort((a: any, b: any) =>
          rule.compareFn!(
            a[ this.sortingColumn!.key ],
            b[ this.sortingColumn!.key ]
          )
        )
        return this.sortedData
      } else return this.data
    } else return this.data
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
