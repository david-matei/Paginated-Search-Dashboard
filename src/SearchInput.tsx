type S = {
    search: string
    changeHandler: (e: string) => void
}

const SearchInput = ({search, changeHandler}: S) => {
    return <input value={search} onChange={e => changeHandler(e.target.value)} />
}

export default SearchInput