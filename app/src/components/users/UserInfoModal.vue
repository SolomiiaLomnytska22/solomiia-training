<template>
  <div
    v-if="showModal"
    class="modal"
    @click="clickOutsideModal"
  >
    <div
      ref="modalContent"
      class="modal-content"
    >
      <div class="heading">
        <h2>{{ heading }}</h2>
      </div>
      <UserInfoForm
        :action="selectedUser === null ? 'add' : 'edit'"
        :selected-user="selectedUser"
        @close="closeUserInfoModal"
        @data-saved="handleUserDataSave"
      />
    </div>
  </div>
</template>

<script lang="ts">
import UserInfoForm from './UserInfoForm.vue'
import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { User } from '@/types'

@Component({
  components: {
    UserInfoForm
  }
})
export default class AddUserModal extends Vue {
  @Prop({
    required: false,
    default: true
  })
  showModal!: boolean
  @Prop({ required: false, default: null }) selectedUser!: User | null

  clickOutsideModal (event: Event): void {
    const modalContent = this.$refs.modalContent as HTMLElement | undefined

    if (modalContent && !modalContent.contains(event.target as Node)) {
      this.closeUserInfoModal()
    }
  }

  get heading () {
    return this.selectedUser === null ? 'Add New User' : 'Edit User'
  }

  closeUserInfoModal (): void {
    this.$emit('toggle')
  }

  handleUserDataSave (): void {
    this.$emit('user-added', 'toggle')
  }
}
</script>

<style scoped>
.modal {
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
}

.modal-content {
  width: 30%;
  min-width: 200px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.modal-content .heading {
  padding-top: 0;
}

.modal-content .heading h2 {
  margin-top: 0;
}
</style>
