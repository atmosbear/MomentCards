import FlipButton from './FlipButton'
import AnswerButtons from './ConfidenceMeter'
import StudyCard from './StudyCard'
import React, { useEffect, useState } from 'react'
import { User } from '../User'

type StudyPageProps = {
    user: User
}

export default function StudyPage(props: StudyPageProps) {
    return (
        <div style={{boxShadow: "0px 50px 100px -100px inset #81C6E8", backgroundColor: "#ffeeee", padding: 30, borderRadius: 20, height: "70vh", width: "80vw", margin: "auto" }}>
            <StudyCard user={props.user} card={props.user.getCurrentCard()} />
            <FlipButton card={props.user.getCurrentCard()}/>
            <AnswerButtons card={props.user.getCurrentCard()} />
        </div>
    )
}