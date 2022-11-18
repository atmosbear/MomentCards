import React from 'react'
import Settings from './Settings'
import CardCreator from './CardCreator'
import StudyPage from './StudyPage'
import { Card, Settings as SettingsClass } from '../model'
import { User } from "../User"

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
    let tabStyle = { cursor: "pointer", textShadow: "2px 2px black" , height: 0, lineHeight: 1, marginBottom: "4rem", marginTop: "1rem"}
    return (
        <div style={pageSwitcherStyle}>
            <p style={tabStyle}
                onClick={() => props.setPageState(<CardCreator user={props.user} />)}
            >
                Create
            </p>
            <div>
                <p style={tabStyle}
                    onClick={() => props.setPageState(<StudyPage user={props.user} />)}
                >
                    Study
                    <sup style={{ fontSize: "1.5rem" }}>
                        {" (" + props.user.getDueCards().length + ")"}
                    </sup>
                </p>
            </div>

            <p style={tabStyle}
                onClick={() => props.setPageState(<Settings user={props.user} />)}
            >
                Settings
            </p>
        </div>
    )
}