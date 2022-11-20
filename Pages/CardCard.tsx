import React from 'react'
import { Card } from '../model'

type CardCardProps = {
    card: Card
}

export default function CardCard(props: CardCardProps) {
    return (
        <div style={{
            fontSize: "1.5rem",
            display: "grid",
            width: "100%",
            backgroundColor: "white",
            margin: 5,
            borderRadius: 10,
            padding: 10
        }}>
            <span style={{ gridRow: 1, gridColumn: 1 }}>{props.card.front}</span>
            <span style={{ gridRow: 2, gridColumn: 1 }}>{props.card.back}</span>
            <div style={{ gridRow: 1, gridColumn: 2}}>{props.card.getDueDateFromNowHumanReadable().toString()}</div>
            <span style={{ gridRow: 2, gridColumn: 2 }}>{props.card.isSuspended ? "sus" : "active"}</span>
        </div>
    )
}