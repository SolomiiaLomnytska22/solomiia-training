import { mount, shallowMount } from '@vue/test-utils'
import UserInfoModal from '@/components/users/UserInfoModal.vue'

describe('UserInfoModal.vue', () => {
  it('renders when showModal is true', () => {
    const wrapper = mount(UserInfoModal, {
      propsData: {
        showModal: true,
        selectedUser: null,
      },
    });
    expect(wrapper.find('.modal').exists()).toBe(true);
    expect(wrapper.find('.modal-content').exists()).toBe(true);
  });

  it('does not render when showModal is false', () => {
    const wrapper = shallowMount(UserInfoModal, {
      propsData: {
        showModal: false,
        selectedUser: null,
      },
    });

    expect(wrapper.find('.modal').exists()).toBe(false);
    expect(wrapper.find('.modal-content').exists()).toBe(false);
  });

  it('emits toggle event when closeUserInfoModal is called', () => {
    const wrapper = shallowMount(UserInfoModal, {
      propsData: {
        showModal: true,
        selectedUser: null,
      },
    });

    (wrapper.vm as any).closeUserInfoModal();
    expect(wrapper.emitted().toggle).toBeTruthy();
  });

  it('emits user-added event when handleUserDataSave is called', () => {
    const wrapper = shallowMount(UserInfoModal, {
      propsData: {
        showModal: true,
        selectedUser: null,
      },
    });

    (wrapper.vm as any).handleUserDataSave();
    expect(wrapper.emitted()[ 'user-added' ]).toBeTruthy();
  });

  it('renders the correct heading when selectedUser is null', () => {
    const wrapper = shallowMount(UserInfoModal, {
      propsData: {
        showModal: true,
        selectedUser: null,
      },
    });

    expect(wrapper.find('.heading h2').text()).toBe('Add New User');
  });

  it('renders the correct heading when selectedUser is not null', () => {
    const wrapper = shallowMount(UserInfoModal, {
      propsData: {
        showModal: true,
        selectedUser: { name: 'John Doe', email: 'john@example.com' },
      },
    });
    expect(wrapper.find('.heading h2').text()).toBe('Edit User');
  });

});