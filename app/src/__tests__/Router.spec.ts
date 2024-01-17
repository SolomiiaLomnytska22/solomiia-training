import Vue from 'vue'
import VueRouter from 'vue-router'
import { createLocalVue, Wrapper, mount } from '@vue/test-utils'
import router from '@/router'
import {
  faInstagram,
  faLinkedin,
  faXTwitter
} from '@fortawesome/free-brands-svg-icons'
import {
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faCircleXmark,
  faPlus,
  faPencil,
  faTrashCan,
  faSortUp,
  faSortDown,
  faSort
} from '@fortawesome/free-solid-svg-icons'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faInstagram,
  faLinkedin,
  faXTwitter,
  faCheckCircle,
  faCircleXmark,
  faInfoCircle,
  faExclamationTriangle,
  faPlus,
  faPencil,
  faTrashCan,
  faSortUp,
  faSortDown,
  faSort
)
const localVue = createLocalVue()
localVue.component('FontAwesomeIcon', FontAwesomeIcon)

localVue.use(VueRouter)

describe('router.ts', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    wrapper = mount(
      {
        template: '<router-view></router-view>'
      },
      {
        localVue,
        router
      }
    )
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('navigates to / by default', () => {
    expect(wrapper.vm.$route.path).toBe('/')
    expect(wrapper.findComponent({ name: 'Users' }).exists()).toBe(true)
  })

  it('navigates to /about', async () => {
    router.push('/about')
    await localVue.nextTick()
    expect(wrapper.vm.$route.path).toBe('/about')
    await localVue.nextTick()
    expect(wrapper.findComponent({ name: 'About' }).exists()).toBe(true)
  })

  it('navigates to /contact', async () => {
    router.push('/contact')
    await localVue.nextTick()
    expect(wrapper.vm.$route.path).toBe('/contact')
    await localVue.nextTick()
    expect(wrapper.findComponent({ name: 'Contact' }).exists()).toBe(true)
  })
})
