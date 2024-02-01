<template>
  <div class="pagination">
    <NumberInput
      id="number-input"
      label="Rows per page"
      :min="1"
      :max="totalRows"
      :value="rowsPerPage"
      type="number"
      @input="updateRowsPerPage"
    />
    <div class="pages">
      <Button
        style-type="secondary"
        :is-disabled="isLeftDisabled"
        @click="moveToLeft"
      >
        {{ '<' }}
      </Button>
      <Button
        v-if="showFirstPage"
        style-type="secondary"
        class="first"
        @click="moveToFirstPage"
      >
        1
      </Button>
      <span
        v-if="showLeftEllipsis"
        class="ellipsis"
      >...</span>
      <Button
        v-for="pageNumber in visiblePageNumbers"
        :key="pageNumber"
        :style-type="getPageNumberStyle(pageNumber)"
        @click="goToPage(pageNumber)"
      >
        {{ pageNumber }}
      </Button>
      <span
        v-if="showRightEllipsis"
        class="ellipsis"
      >...</span>
      <Button
        v-if="showLastPage"
        style-type="secondary"
        class="last"
        @click="moveToLastPage"
      >
        {{ totalPages }}
      </Button>
      <Button
        style-type="secondary"
        :is-disabled="isRightDisabled"
        @click="moveToRight"
      >
        {{ '>' }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import Button from '@/components/common/Button.vue'
import NumberInput from '@/components/common/NumberInput.vue'

@Component({
  components: { NumberInput, Button }
})
export default class Pagination extends Vue {
  @Prop() totalRows!: number
  @Prop() currentPage!: number
  @Prop() rowsPerPage!: number
  @Prop() maxVisiblePages!: number

  get totalPages (): number {
    return Math.ceil(this.totalRows / this.rowsPerPage)
  }

  get visiblePageNumbers (): number[] {
    const result = []

    if (this.totalPages <= this.maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        result.push(i)
      }
    } else {
      const halfMaxVisiblePages = Math.floor(this.maxVisiblePages / 2)
      let start = this.currentPage - halfMaxVisiblePages
      let end = this.currentPage + halfMaxVisiblePages

      if (this.currentPage <= halfMaxVisiblePages) {
        start = 1
        end = this.maxVisiblePages
      } else if (this.currentPage >= this.totalPages - halfMaxVisiblePages) {
        start = this.totalPages - this.maxVisiblePages + 1
        end = this.totalPages
      }

      for (let i = start; i <= end; i++) {
        result.push(i)
      }
    }
    return result
  }

  get showFirstPage (): boolean {
    return this.currentPage > 2 && this.totalPages > this.maxVisiblePages
  }

  get showLastPage (): boolean {
    return (
      this.currentPage < this.totalPages - 1 &&
      this.totalPages > this.maxVisiblePages
    )
  }
  get showLeftEllipsis (): boolean {
    return this.currentPage > this.maxVisiblePages
  }

  get showRightEllipsis (): boolean {
    return this.currentPage < this.totalPages - this.maxVisiblePages + 1
  }

  get isLeftDisabled (): boolean {
    return this.currentPage === 1
  }

  get isRightDisabled (): boolean {
    return this.currentPage === this.totalPages
  }

  getPageNumberStyle (pageNumber: number): string {
    return pageNumber === this.currentPage ? 'primary' : 'secondary'
  }

  moveToFirstPage (): void {
    this.$emit('page-change', 1)
  }

  moveToLastPage (): void {
    this.$emit('page-change', this.totalPages)
  }

  moveToLeft (): void {
    if (this.currentPage > 1) {
      this.$emit('page-change', this.currentPage - 1)
    }
  }

  moveToRight (): void {
    if (this.currentPage < this.totalPages) {
      this.$emit('page-change', this.currentPage + 1)
    }
  }

  goToPage (pageNumber: number): void {
    this.$emit('page-change', pageNumber)
  }

  updateRowsPerPage (value: number): void {
    if (value > 0 && value < this.totalRows)
      this.$emit('rows-per-page-change', +value)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
}

.ellipsis {
  margin: 0 5px;
  font-weight: bold;
  color: #4caf50;
}
</style>
