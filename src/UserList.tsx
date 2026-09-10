import type {User} from "./types.ts"
import UserCard from "./UserCard.tsx";
type ULP = {
    users: User[]
    loading: boolean
    error: Error | null
}
const UserList = ({users, loading, error}: ULP) => {
    if (loading) return <p>Loading users...</p>
    if (error) return <p>{error.message}</p>
    if (!users.length) return <p>No users found.</p>
    return (
        <>
            {users.map(user => {
               return <UserCard key={user.id} user={user} />
            })}
        </>
    )
}

export default UserList