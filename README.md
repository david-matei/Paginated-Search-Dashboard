# Challenge #4 — Paginated Search Dashboard

## Overview

A React + TypeScript user dashboard that fetches users from an external API and provides client-side search and pagination.

The project focuses on coordinating multiple pieces of React state while keeping derived data out of state.

## Features

* Fetches users from the JSONPlaceholder API
* Displays loading and error states
* Searches users by:

  * Name
  * Username
  * Email
* Case-insensitive search
* Client-side pagination with 5 users per page
* Previous/Next pagination controls
* Automatically resets to page 1 when the search changes
* Disables Previous on the first page
* Disables Next on the last page or when no results exist
* Displays the number of users currently shown
* Displays an empty state when no users match the search
* Separates user rendering into reusable `UserList` and `UserCard` components

## Component Hierarchy

```text
App
├── SearchInput
└── UserList
    └── UserCard
```

## State

The application uses two independent pieces of state:

```ts
const [search, setSearch] = useState("")
const [page, setPage] = useState(1)
```

* `search` stores the current search query.
* `page` stores the current pagination page.

The actual filtered and paginated users are **derived during rendering** rather than stored in state.

## Data Flow

```text
API
 ↓
All users
 ↓
Filter by search query
 ↓
Slice results for current page
 ↓
UserList
 ↓
UserCard
```

Search changes also reset pagination:

```text
User types a search
 ↓
setSearch()
 ↓
setPage(1)
 ↓
Component rerenders
 ↓
Filtered results are recalculated
 ↓
First page is displayed
```

## Pagination

Each page contains 5 users.

The displayed section of the filtered array is calculated using:

```ts
const start = (page - 1) * 5
const end = page * 5

const usersForPage = filteredUsers.slice(start, end)
```

The last page is calculated with:

```ts
Math.ceil(filteredUsers.length / 5)
```

This allows the Next button to be disabled when the current page is the final page.

## Concepts Practiced

* React state
* State ownership
* Controlled inputs
* Derived data
* Array `filter()`
* Array `slice()`
* Client-side pagination
* Conditional rendering
* Component composition
* Props and TypeScript prop types
* Functional state updates
* Handling loading/error/empty states
* Coordinating multiple state updates
* Avoiding unnecessary state
* Case-insensitive string searching
* Pagination boundaries
