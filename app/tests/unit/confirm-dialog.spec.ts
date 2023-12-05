import { shallowMount, mount, Wrapper } from '@vue/test-utils'
import ConfirmationDialog from '@/components/common/ConfirmationDialog.vue';
import Button from '@/components/common/Button.vue';

describe('ConfirmationDialog.vue', () => {
  let wrapper:Wrapper<Vue>;

  beforeEach(() => {
    wrapper = mount(ConfirmationDialog);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('emits confirm event when Confirm button is clicked', async () => {
    await wrapper.findComponent(Button).trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().confirm).toBeTruthy();
  });

  it('emits cancel event when Cancel button is clicked', async () => {
    await wrapper.findAllComponents(Button).at(1).trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().cancel).toBeTruthy();
  });

  it('renders content inside the slot', () => {
    const content = '<p>Are you sure?</p>';
    const wrapperWithSlot = shallowMount(ConfirmationDialog, {
      slots: {
        default: content,
      },
    });

    expect(wrapperWithSlot.find('.content').text()).toContain('Are you sure?');
  });
});
