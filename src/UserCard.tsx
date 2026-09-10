import type {User} from "./types.ts"
type UCP = {
    user: User
}
const UserCard = ({user}:UCP) => {
 return (
     <>
        <p>{user.name}</p>
         <p>{user.username}</p>
         <p>{user.email}</p>
         <p>{user.phone}</p>
         <p>{user.website}</p>
         <p>-----------------------------</p>
     </>
 )
}
export default UserCard