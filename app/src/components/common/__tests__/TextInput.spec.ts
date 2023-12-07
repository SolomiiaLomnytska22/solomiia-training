import { shallowMount, Wrapper } from '@vue/test-utils'
import TextInput from '@/components/common/TextInput.vue'

describe('TextInput.vue', () => {
  let wrapper:Wrapper<Vue>;

  beforeEach(() => {
    const label = 'Username';
    const id = 'username';
    const value = 'john_doe';

    wrapper = shallowMount(TextInput, {
      propsData: { label, id, value }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders label and input with correct props', () => {
    expect(wrapper.find('label').text()).toBe(`${wrapper.props('label')}:`);
    expect(wrapper.find('input').attributes('id')).toBe(wrapper.props('id'));
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe(wrapper.props('value'));
  });

  it('emits input event when input value changes', async () => {
    const inputField = wrapper.find('input');
    (inputField.element as HTMLInputElement).value = 'john doe';
    inputField.trigger('input');

    expect(wrapper.emitted().input).toHaveLength(1);
    const firstInputValue = wrapper.emitted().input?.[ 0 ]?.[ 0 ] ?? null;
    expect(firstInputValue).toBe('john doe');
  });
  
});
