type Sub = {
  name: string
  subscribers: string
  title: string
  isNSFW: boolean
  icon: string
  banner?: string
}

type Topic = {
  id: string
  name: string
  subs: Sub[]
}

export default Topic
