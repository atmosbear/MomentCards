import React from 'react'
import { user, User } from '../model'


type SettingsProps = {
    user: User
}

export default function Settings(props: SettingsProps) {
    return (
        <div style={{ fontSize: "2rem" }}>
            <ChangeableSettings mustBeType="number" user={props.user} settingsNameAsVar="defaultDueDate" beforeText="Default due date: " currentValue={props.user.settings.defaultDueMins} afterText=" minutes" />
        </div>
    )
}

type ChangeableSettingsProps = {
    user: User
    mustBeType: string
    beforeText: string
    currentValue: number
    afterText: string
    settingsNameAsVar: string
}

function ChangeableSettings(props: ChangeableSettingsProps) {
    let textbox = <input type="text" id={props.beforeText} style={{ display: "none" }}></input>
    let saveB = <button style={{ display: "none" }} id="saveB" onClick={(e) => { saveSettings(e); toggleTextBox(e) }}>save</button>
    let cancelB = <button style={{ display: "none" }} id="cancelB" onClick={(e) => { revertToDefaultSettings(e); toggleTextBox(e); }}>revert</button>
    function saveSettings(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        let cvs = document.getElementById("currValueSetting")
        // @ts-ignore-error: it does exist
        let newSettingsValue = document.getElementById(props.beforeText)!.value
        if (props.mustBeType === "number" && !isNaN(Number(newSettingsValue))) {
            cvs!.innerHTML = newSettingsValue!.toString()
            props.user.settings[props.settingsNameAsVar] = Number(cvs!.innerHTML)
        } else if (props.mustBeType === "string") {
            cvs!.innerHTML = newSettingsValue!.toString()
            props.user.settings[props.settingsNameAsVar] = cvs!.innerHTML
        } else if (props.mustBeType === "boolean" && typeof newSettingsValue === "boolean") {

        } else {
            revertToDefaultSettings(e)
            alert("That wasn't a number! Resetting to default...")
        }
    }
    function revertToDefaultSettings(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        let tb = document.getElementById(props.beforeText)! as HTMLInputElement
        let cvs = document.getElementById("currValueSetting")
        let oldValue = props.currentValue.toString()
        cvs!.innerHTML = oldValue
        props.user.settings[props.settingsNameAsVar] = oldValue
        tb.value = oldValue
    }
    function hideTB(tb, saveB, cancelB) {
        tb.style.display = "none"
        saveB.style.display = "none"
        cancelB.style.display = "none"
    }
    function showTBandBeginEditing(tb, saveB, cancelB) {
        let cvs = document.getElementById("currValueSetting")
        cvs!.innerHTML = "editing..."
        tb.style.display = "inline"
        saveB.style.display = "inline"
        cancelB.style.display = "inline"
    }
    function toggleTextBox(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        let tb = document.getElementById(props.beforeText)!
        let saveB = document.getElementById("saveB")!
        let cancelB = document.getElementById("cancelB")!
        if (e.target !== tb) {
            if (tb.style.display === "inline") {
                hideTB(tb, saveB, cancelB)
            } else {
                showTBandBeginEditing(tb, saveB, cancelB)
            }
        }
    }
    return (
        <div>
            {props.beforeText}
            {textbox}
            {saveB}
            {cancelB}
            <span id="currValueSetting" onClick={(e) => toggleTextBox(e)} style={{ color: "blue" }}>
                {props.currentValue}
            </span>
            {props.afterText}
        </div>
    )
}