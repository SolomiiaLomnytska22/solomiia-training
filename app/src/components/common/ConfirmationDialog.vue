<template>
  <div class="confirmation-dialog">
    <div class="content">
      <slot />
      <div class="buttons">
        <Button @click="confirm">
          Confirm
        </Button>
        <Button
          style-type="secondary"
          @click="cancel"
        >
          Cancel
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Button from '@/components/common/Button.vue'

@Component({
  components: {
    Button
  }
})
export default class ConfirmationDialog extends Vue {
  confirm () {
    this.$emit('confirm')
  }

  cancel () {
    this.$emit('cancel')
  }
}
</script>

<style scoped>
.confirmation-dialog {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(51, 51, 51, 0.9);
  z-index: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.content {
  width: 20%;
  min-width: 200px;
  background: #fff;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.content span {
  margin: 15px;
}

.buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
