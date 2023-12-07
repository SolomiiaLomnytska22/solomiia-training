import { shallowMount, Wrapper } from '@vue/test-utils'
import Button from '@/components/common/Button.vue';

describe('Button.vue', () => {
  let wrapper:Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(Button);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('Emits click event when button is clicked', async () => {
    await wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it('Renders with the correct default props', () => {
    expect(wrapper.props('styleType')).toBe('primary');
    expect(wrapper.props('type')).toBe('button');
  });

  it('Renders with the specified props', () => {
    wrapper = shallowMount(Button, {
      propsData: {
        styleType: 'secondary',
        type: 'submit',
      },
    });

    expect(wrapper.props('styleType')).toBe('secondary');
    expect(wrapper.props('type')).toBe('submit');
  });

  it('Applies the correct styles based on styleType prop', () => {
    const primaryWrapper = shallowMount(Button, {
      propsData: { styleType: 'primary' },
    });

    const secondaryWrapper = shallowMount(Button, {
      propsData: { styleType: 'secondary' },
    });

    expect(primaryWrapper.classes()).toContain('primary');
    expect(secondaryWrapper.classes()).toContain('secondary');
  });
});

