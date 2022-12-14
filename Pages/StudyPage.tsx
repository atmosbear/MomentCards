import FlipButton from './FlipButton'
import AnswerButtons from './ConfidenceMeter'
import StudyCard from './StudyCard'
import React, { useEffect, useState } from 'react'
import { User } from '../User'

type StudyPageProps = {
    user: User
}

export default function StudyPage(props: StudyPageProps) {
    const [flipped, setFlipped] = useState(false)
    return (
    <div>
        <div style={{ textAlign: "center", display: "flex", justifyContent: "space-around", width: "100%", marginLeft: -30, paddingBottom: 50, lineHeight: 0.5, textShadow: "1px 1px gray" }}>Study</div>
        <div style={{ boxShadow: "0px 50px 100px -100px inset #81C6E8", backgroundColor: "#ffeeee", padding: 30, borderRadius: 20, height: "70vh", width: "80vw", margin: "auto" }}>
            <StudyCard flipped={flipped} setFlipped={setFlipped} user={props.user} card={props.user.getCurrentCard()} />
            <FlipButton card={props.user.getCurrentCard()} flipped={flipped} flipCard={setFlipped} />
            <AnswerButtons card={props.user.getCurrentCard()} />
        </div>
    </div>
    )
}