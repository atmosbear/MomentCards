import PageSwitcher from './Pages/PageSwitcher'
import CardCreator from './Pages/CardCreator'
import { user } from './model'
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import Settings from './Pages/Settings'

createRoot(document.getElementById("root")!).render(<Index />)

function Index() {
    const [page, setPage] = useState(<CardCreator user={user} />)
    return (
        <div>
            <PageSwitcher user={user} setPageState={setPage} />
            <div style={{padding: "30px"}}>
            {page}
            </div>
        </div>
    )
}
