import React, { useEffect } from 'react'
import { Card } from '../model'
import { cardsButNotDueMessage, noCardsMessage } from '../User'

type ConfidenceMeterProps = {
    card: Card
}

export default function ConfidenceMeter(props: ConfidenceMeterProps) {
    let cardExists = props.card.front !== noCardsMessage && props.card.front !== cardsButNotDueMessage
    function GS() {
        // set variables
        let canvas = document.getElementById("confidence-meter")! as HTMLCanvasElement
        let canvasH = document.getElementById("confidence-meter-holder")! as HTMLDivElement
        let c = canvas.getContext("2d")!
        let cW = canvas.width
        let cH = canvas.height
        let gradient = c.createLinearGradient(0, 0, cW, 0)
        // set colors for study mode
        let startColor = "red"
        let midColor = "orange"
        let endColor = "green"
        // set muted colors for no-cards-left mode
        if (!cardExists) {
            startColor = "darkslategray"
            midColor = "gray"
            endColor = "lightgray"
        }
        gradient.addColorStop(0, startColor)
        gradient.addColorStop(0.5, midColor)
        gradient.addColorStop(1, endColor)
        // fill in the gradient
        c.fillStyle = gradient
        c.fillRect(0, 0, cW, cH)
        // add a tiny line in the center to mark the center point
        c.fillStyle = "black"
        c.fillRect(cW / 2, cH / 2 - cH / 8, 1, cH / 4)
    }
    useEffect(() => {
        GS()
    })
    function moveRater(e: React.MouseEvent) {
        if (cardExists) {
            let canvas = document.getElementById("confidence-meter")! as HTMLCanvasElement
            let canvasDiv = document.getElementById("confidence-meter-holder")! as HTMLDivElement
            let c = canvas.getContext("2d")!
            let zeroX = canvas.width / 2
            let zeroY = canvas.height / 2
            let oneEdge = window.innerWidth - canvas.width
            let userClickOnCanvas = e.clientX - oneEdge
            let placeX = zeroX + userClickOnCanvas
            GS()
            let markerHeight = 20
            let markerWidth = 3
            c.fillRect(placeX + 60, zeroY - markerHeight / 2, markerWidth, markerHeight)
        }
    }
    return (
        <div id="confidence-meter-holder" style={{ display: "flex", marginTop: 30, marginBottom: 30 }} onDoubleClick={(e) => { moveRater(e) }}>
            <canvas width={"900"} height={40} id="confidence-meter" style={{ borderRadius: 15, marginLeft: "auto", marginRight: "auto" }}></canvas>
        </div>
    )
}