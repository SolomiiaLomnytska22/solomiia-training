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
interface CardsItem{
  id: number
  image: string
  title: string
  description: string
}

export { User, MenuItem, CardsItem }
