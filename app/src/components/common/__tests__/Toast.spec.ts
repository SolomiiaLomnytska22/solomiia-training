import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import Toast from '@/components/common/Toast.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle, faCircleXmark, faInfoCircle, faExclamationTriangle)
const localVue = createLocalVue()
localVue.component('FontAwesomeIcon', FontAwesomeIcon)

describe('Toast.vue', () => {
  let wrapper: Wrapper<Toast>
  let vm: Toast | any
  beforeEach(() => {
    wrapper = mount(Toast, {
      slots: {
        default: 'Hello, I\'m toast!'
      },
      localVue
    })
    vm = wrapper.vm
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component with default "success" style', async () => {
    await wrapper.setData({ show: true })
    expect(wrapper.classes('success')).toBe(true)
  })

  it('renders the component with custom style', async () => {
    await wrapper.setProps({ styleType: 'warning' })
    await wrapper.setData({ show: true })
    expect(wrapper.classes('warning')).toBe(true)
  })

  it('calculates animation duration in seconds based on timeout', async () => {
    await wrapper.setData({ timeout: 1000 })
    expect((vm as any).getAnimationDuration).toBe('1s')
  })

  it('sets the correct icon based on styleType prop', async () => {
    await wrapper.setProps({ styleType: 'info' })
    expect((vm as any).getIcon).toBe('fa-info-circle')
  })

  it('shows and hides the toast after the specified timeout duration', async () => {
    (vm as any).showToast(3000)
    expect((vm as any).show).toBe(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    expect((vm as any).show).toBe(false)
  })
})
