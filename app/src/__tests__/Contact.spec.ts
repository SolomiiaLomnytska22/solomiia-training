import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import Contact from '@/Contact.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faInstagram,
  faLinkedin,
  faXTwitter
} from '@fortawesome/free-brands-svg-icons'

library.add(faInstagram, faLinkedin, faXTwitter)
const localVue = createLocalVue()
localVue.component('FontAwesomeIcon', FontAwesomeIcon)

describe('Contact component', () => {
  let wrapper:Wrapper<Vue>
  beforeEach(() => {
    wrapper = mount(Contact, { localVue })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.contact').exists()).toBe(true)
  })

  it('renders social links correctly', () => {
    const socialLinks = wrapper.findAll('.social-links a')
    expect(socialLinks.length).toBe((wrapper.vm as any).socialLinks.length)
  })

  it('renders social links with correct attributes', () => {
    const socialLinks = wrapper.findAll('.social-links a')
    socialLinks.wrappers.forEach((link, index) => {
      const expectedLink = (wrapper.vm as any).socialLinks[ index ]
      expect(link.attributes('href')).toBe(expectedLink.href)
      expect(link.attributes('target')).toBe('_blank')
    })
  })

  it('renders iframe correctly', () => {
    const iframe = wrapper.find('iframe')
    expect(iframe.exists()).toBe(true)
  })

  it('renders separator correctly', () => {
    const separator = wrapper.find('.separator')
    expect(separator.exists()).toBe(true)
  })
})
