import React from 'react'
import Settings from './Settings'
import CardCreator from './CardCreator'
import StudyPage from './StudyPage'
import { fix_position } from 'svelte/internal'
import { Card, Settings as SettingsClass, User } from '../model'
import { user } from '../model'

type PageSwitcherProps = {
    setPageState: Function
    user: User
}

export default function PageSwitcher(props: PageSwitcherProps) {
    let pageSwitcherStyle = {
        display: "flex",
        backgroundColor: "darkslateblue",
        color: "white",
        justifyContent: "space-around",
        lineHeight: 0,
        height: "fit",
        width: "100%",
        boxShadow: "2px 2px 50vh 50vh lightblue"
    }
    let tabStyle = { cursor: "pointer", textShadow: "2px 2px black" }
    return (
        <div style={pageSwitcherStyle}>
            <p style={tabStyle}
                onClick={() => props.setPageState(<CardCreator />)}
            >
                Create
            </p>
            <div>
                <p style={tabStyle}
                    onClick={() => props.setPageState(<StudyPage />)}
                >
                    Study
                    <span>
                        {user.getDueCards().length}
                    </span>
                </p>
            </div>

            <p style={tabStyle}
                onClick={() => props.setPageState(<Settings user={user} />)}
            >
                Settings
            </p>
        </div>
    )
}