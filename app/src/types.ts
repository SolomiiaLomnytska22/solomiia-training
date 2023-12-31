interface User {
  id: number | null
  name: string
  surname: string
  dateOfBirth: string
  position: string
  online: boolean
  country: string
}

interface MenuItem {
  id: number
  route: string
  title: string
}

interface CardItem {
  id: number
  image: string
  title: string
  description: string
}

interface SocialLink {
  href: string
  size: string
  icon: string
}

interface TimelineItem {
  id: number
  date: string
  title: string
  description: string
}

export { User, MenuItem, CardItem, TimelineItem, SocialLink }
