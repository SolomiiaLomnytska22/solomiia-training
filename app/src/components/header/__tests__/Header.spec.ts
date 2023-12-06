import { shallowMount, VueClass, Wrapper } from '@vue/test-utils'
import Header from '@/components/header/Header.vue';

describe('Header.vue', () => {
  let wrapper:Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount<InstanceType<VueClass<Header>>>(Header);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('header').exists()).toBe(true);
    expect(wrapper.find('.menu-icon').exists()).toBe(true);
    expect(wrapper.find('.user-info').exists()).toBe(true);
  });

  it('toggles the menu icon on click', async () => {
    expect((wrapper.vm as any).showMenu).toBe(false);

    await wrapper.find('.menu-icon').trigger('click');
    expect((wrapper.vm as any).showMenu).toBe(true);

    await wrapper.find('.menu-icon').trigger('click');
    expect((wrapper.vm as any).showMenu).toBe(false);
  });

  it('renders HeaderMenu when showMenu is true', async () => {
    expect(wrapper.findComponent({ name: 'HeaderMenu' }).exists()).toBe(false);

    await wrapper.setData({ showMenu: true });

    expect(wrapper.findComponent({ name: 'HeaderMenu' }).exists()).toBe(true);
  });

});

