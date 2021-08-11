import { createContext } from "react"
import { Dispatch, SetStateAction } from "react"
type User = {
  token: string
}
const UserContext = createContext<[string, Dispatch<SetStateAction<string>>]>([
  "",
  () => {},
])

export default UserContext
