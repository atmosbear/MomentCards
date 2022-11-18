import PageSwitcher from './Pages/PageSwitcher'
import CardCreator from './Pages/CardCreator'
import React, { useState } from 'react'
import Settings from './Pages/Settings'
import { User } from './User'


type IndexProps = {
    user: User
}

export function Index(props: IndexProps) {
    const [page, setPage] = useState(<CardCreator user={props.user} />)
    return (
        <div>
            <PageSwitcher user={props.user} setPageState={setPage} />
            <div style={{padding: "30px"}}>
            {page}
            </div>
        </div>
    )
}
