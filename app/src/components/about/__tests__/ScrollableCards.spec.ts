import { mount, Wrapper } from '@vue/test-utils'
import ScrollableCards from '@/components/about/ScrollableCards.vue'
import { CardItem } from '@/types'

describe('ScrollableCards.vue', () => {
  let wrapper: Wrapper<Vue>

  const items: CardItem[] = [
    {
      id: 1,
      image: './images/employees.webp',
      title: 'Card 1',
      description: 'Description for Card 1'
    },
    {
      id: 2,
      image: './images/employees.webp',
      title: 'Card 2',
      description: 'Description for Card 2'
    }
  ]

  beforeEach(() => {
    wrapper = mount(ScrollableCards, {
      propsData: {
        items
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the correct number of cards', () => {
    const cards = wrapper.findAll('.card')
    expect(cards.length).toBe(items.length)
  })

  it('displays card content correctly', () => {
    const card = wrapper.find('.card')
    const title = card.find('h3')
    const description = card.find('p')
    expect(title.text()).toBe(items[ 0 ].title)
    expect(description.text()).toBe(items[ 0 ].description)
  })
})
