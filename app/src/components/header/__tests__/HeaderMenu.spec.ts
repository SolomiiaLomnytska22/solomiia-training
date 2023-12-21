import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import HeaderMenu from '@/components/header/HeaderMenu.vue';
import VueRouter from 'vue-router';
import router from '@/router'

const localVue = createLocalVue();
localVue.use(VueRouter);
describe('HeaderMenu.vue', () => {
  let wrapper:Wrapper<Vue>;
  const menuItems = [
    { id: 1, route: '/', title: 'Home' },
    { id: 2, route: '/about', title: 'About' },
    { id: 3, route: '/contact', title: 'Contact' }
  ]

  beforeEach(() => {
    wrapper = mount(HeaderMenu, {
      propsData:{
        menuItems: menuItems },
      localVue,
      router
    })
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders menu items correctly', async () => {

    expect(wrapper.findAllComponents({ name: 'RouterLink' })).toHaveLength(menuItems.length)

    menuItems.forEach((item, index) => {
      const renderedItem = wrapper.findAllComponents({ name: 'RouterLink' }).at(index)
      expect(renderedItem.text()).toBe(item.title)
      expect(renderedItem.props().to).toBe(item.route)
    })
  })

  it('renders no menu items when menuItems prop is empty', async () => {
    await wrapper.setProps({ menuItems:[] })
    expect(wrapper.findAllComponents({ name: 'RouterLink' })).toHaveLength(0);
  });

  it('navigates to / when home link is clicked', async () => {
    const routerLink = wrapper.findAllComponents({ name: 'RouterLink' }).at(0);
    await routerLink.trigger('click');
    expect(router.currentRoute.path).toBe('/');
  });

  it('navigates to /about when about link is clicked', async () => {
    const routerLink = wrapper.findAllComponents({ name: 'RouterLink' }).at(1);
    await routerLink.trigger('click');
    expect(router.currentRoute.path).toBe('/about');
  });

  it('navigates to /contact when about link is clicked', async () => {
    const routerLink = wrapper.findAllComponents({ name: 'RouterLink' }).at(2);
    await routerLink.trigger('click');
    expect(router.currentRoute.path).toBe('/contact');
  });

});
