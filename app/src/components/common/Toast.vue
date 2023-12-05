<template>
  <div
    v-if="show"
    class="toast-container"
    :class="styleType"
    :style="{ animationDuration: getAnimationDuration }"
  >
    <div class="icon">
      <font-awesome-icon
        :icon="getIcon"
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
  get getAnimationDuration (): string {
    return `${this.timeout / 1000}s`;
  }
  get getIcon ():string{
    return this.icons[ this.styleType ];
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
  color: #fff;
}

.icon{
  padding-right: 10px
}
.success {
  background-color: #4caf50;
}

.info {
  background-color: #235ac7;
}

.danger {
  background-color: #c43221;
}

.warning {
  background-color: #ca8544;
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
