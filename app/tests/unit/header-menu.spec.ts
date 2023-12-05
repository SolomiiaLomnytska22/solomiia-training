import { shallowMount, mount, RouterLinkStub } from '@vue/test-utils';
import HeaderMenu from '@/components/header/HeaderMenu.vue';


describe('HeaderMenu.vue', () => {
  it('renders menu items correctly', () => {
    const menuItems = [
      { id: 1, route: '/home', title: 'Home' },
      { id: 2, route: '/about', title: 'About' },
    ]

    const wrapper = mount(HeaderMenu, {
      propsData: {
        menuItems: menuItems
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.findAllComponents(RouterLinkStub)).toHaveLength(menuItems.length)

    menuItems.forEach((item, index) => {
      const renderedItem = wrapper.findAllComponents(RouterLinkStub).at(index)
      expect(renderedItem.text()).toBe(item.title)
      expect(renderedItem.props().to).toBe(item.route)
    })
  })

  it('renders no menu items when menuItems prop is empty', () => {
    const wrapper = shallowMount(HeaderMenu, {
      propsData: { menuItems: [] }
    });

    expect(wrapper.findAll('router-link')).toHaveLength(0);
  });

});
