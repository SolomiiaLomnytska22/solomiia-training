<template>
  <div
    v-if="show"
    class="toast-container"
    :class="styleType"
    :style="{ animationDuration: `${timeout / 1000}s` }"
  >
    <div class="icon">
      <font-awesome-icon
        :icon="icons[styleType]"
      />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Toast extends Vue {
  @Prop({
    required: false,
    default: 'success',
    validator: (value: string) =>
        [ 'success', 'danger', 'info', 'warning' ].includes(value)
  })
  styleType!: string
  timeout: number = 0
  show: boolean = false
  icons: Record<string, string> = {
    success: 'fa-check-circle',
    danger: 'fa-circle-xmark',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle',
  }

  showToast (timeout: number) {
    this.timeout = timeout
    this.show = true
    setTimeout(() => {
      this.show = false
    }, timeout)
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  animation: fadeOut ease-in-out infinite;
  display: flex;
  flex-direction: row;
  z-index: 2;
}

.icon{
  padding-right: 10px
}
.success {
  background-color: #4caf50;
  color: #fff;
}

.info {
  background-color: #235ac7;
  color: #fff;
}

.danger {
  background-color: #c43221;
  color: #fff;
}

.warning {
  background-color: #ca8544;
  color: #fff;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
  }
}
</style>
