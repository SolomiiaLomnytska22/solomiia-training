import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import About from '@/About.vue';
import VueRouter from 'vue-router';
import router from '@/router'

const localVue = createLocalVue();
localVue.use(VueRouter);
describe('About.vue', () => {

  let wrapper:Wrapper<Vue>;
  beforeEach(() => {
    wrapper = mount(About, { localVue, router });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders properly', () => {
    expect(wrapper.find('.about-us').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('Welcome to Our Company');
  });

  it('displays the correct number of ScrollableCards items', () => {
    expect(wrapper.vm.$data.items.length).toBe(wrapper.findComponent({ name: 'ScrollableCards' }).props('items').length);
  });

  it('renders ScrollableCards with correct props', () => {
    const scrollableCards = wrapper.findComponent({ name: 'ScrollableCards' });
    expect(scrollableCards.exists()).toBe(true);
    expect(scrollableCards.props('items')).toEqual(wrapper.vm.$data.items);
  });

  it('navigates to /contact when button is clicked', async () => {
    const routerLink = wrapper.findComponent({ name: 'Button' })
    await routerLink.trigger('click')
    expect(router.currentRoute.path).toBe('/contact')
  })
})