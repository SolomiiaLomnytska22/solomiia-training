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

interface TableColumn {
  key: string
  label?: string
  slot?: string
  isSortable?: boolean
  sortOrder?: SortOrder
}

interface Point {
  x: number
  y: number
}

interface Size {
  width: number
  height: number
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
  NEUTRAL = 'neutral'
}

interface SortRule {
  currSort: SortOrder
  nextSort: SortOrder
  compareFn?: (a: any, b: any) => number
}

export {
  User,
  MenuItem,
  CardItem,
  TimelineItem,
  SocialLink,
  Point,
  Size,
  TableColumn,
  SortOrder,
  SortRule
}
