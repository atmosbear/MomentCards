import React from 'react'

type CardSubmitFormProps = {}

export default function CardSubmitForm(props: CardSubmitFormProps) {
    return (
            <form acceptCharset="utf-8">
                <div id="card-creator" style={{ display: "flex", flexDirection: "column", width: "" }}>
                    Create
                    <textarea placeholder="front" ></textarea>
                    <textarea placeholder="back" ></textarea>
                    <button type="submit" >create</button>
                </div>
            </form>
    )
}