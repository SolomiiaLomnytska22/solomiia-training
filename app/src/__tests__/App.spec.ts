import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import App from '@/App.vue';
import Header from '@/components/header/Header.vue';
import VueRouter from 'vue-router';
import router from '@/router'
import Users from '@/Users.vue'

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('App.vue', () => {
  let wrapper:Wrapper<Vue>;

  beforeEach(() => {
    wrapper = mount(App, { localVue, router });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the Header component', () => {
    const header = wrapper.findComponent(Header);
    expect(header.exists()).toBe(true);
  });

  it('renders the router-view', () => {
    const routerView = wrapper.findComponent(Users);
    expect(routerView.exists()).toBe(true);
  });

});
