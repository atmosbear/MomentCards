import React from 'react'

type CardCreatorProps = {}

export default function CardCreator(props: CardCreatorProps) {
    return (
        <div id="card-creator" style={{ display: "flex", flexDirection: "column", width: "" }}>
            Create
            <textarea placeholder="front"></textarea>
            <textarea placeholder="back"></textarea>
            <button>create</button>
        </div>
    )
}