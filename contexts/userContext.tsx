import { createContext } from "react"
import { Dispatch, SetStateAction } from "react"
import User from "../schema/user"

const UserContext = createContext<[User, Dispatch<SetStateAction<User>>]>([
  {},
  () => {},
])

export default UserContext
