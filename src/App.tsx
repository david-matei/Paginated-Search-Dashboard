import useFetch from "./fetch.tsx";
import {useState} from "react";
import type {User} from "./types.ts"
import SearchInput from "./SearchInput.tsx";
import UserList from "./UserList.tsx";
export default function App() {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const {data, error, loading} = useFetch<User[]>(`https://jsonplaceholder.typicode.com/users`)

    if (error) return <p>{error.message}</p>
    if (loading) return <p>Loading...</p>
    const normalizedSearch = search.toLowerCase()
    // search users / filter users
    const filteredUsers = data?.filter(user =>
        user.email.toLowerCase().includes(normalizedSearch) ||
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.username.toLowerCase().includes(normalizedSearch)
    ) ?? []
    // pagination
    // we take the first 5 indexes from our users and display them
    // when we go next/back within the pages, we basically take the next/previous 5 indexes (users) and display them
    // this is derived from the data(users state)
    // when we go next/back within the pages, we set the page state to a new value and that triggers a re-render, now it automatically calculates the new users based on the new page state - this concept is called derived state and so we avoid creating new state
    const start = (page - 1) * 5
    const end = page * 5
    const usersForPage = filteredUsers.slice(start, end)
    const handleSearchChange = (value: string) => {
        setSearch(value)
        setPage(1)
    }
    return (
      <div>
          <p>Showing: {usersForPage.length} users</p>
            <SearchInput search={search} changeHandler={handleSearchChange}/>
          <UserList users={usersForPage} loading={loading} error={error}/>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
          <button disabled={Math.ceil(filteredUsers.length / 5)===page || filteredUsers.length === 0} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
  )
}