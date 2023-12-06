import { mount, RouterLinkStub, Wrapper } from '@vue/test-utils'
import HeaderMenu from '@/components/header/HeaderMenu.vue';

describe('HeaderMenu.vue', () => {
  let wrapper:Wrapper<Vue>;

  beforeEach(() => {
    wrapper = mount(HeaderMenu, {
      propsData:{
        menuItems: null },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders menu items correctly', async () => {
    const menuItems = [
      { id: 1, route: '/home', title: 'Home' },
      { id: 2, route: '/about', title: 'About' },
    ]
    await wrapper.setProps({ menuItems:menuItems })
    expect(wrapper.findAllComponents(RouterLinkStub)).toHaveLength(menuItems.length)

    menuItems.forEach((item, index) => {
      const renderedItem = wrapper.findAllComponents(RouterLinkStub).at(index)
      expect(renderedItem.text()).toBe(item.title)
      expect(renderedItem.props().to).toBe(item.route)
    })
  })

  it('renders no menu items when menuItems prop is empty', async () => {
    await wrapper.setProps({ menuItems:[] })
    expect(wrapper.findAllComponents(RouterLinkStub)).toHaveLength(0);
  });

});
