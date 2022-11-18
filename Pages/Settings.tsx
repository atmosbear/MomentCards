import React from 'react'
import { User } from "../User"


type SettingsProps = {
    user: User
}

export default function Settings(props: SettingsProps) {
    return (
        <div style={{ fontSize: "2rem" }}>
            <ChangeableSettings
                mustBeType="number"
                user={props.user}
                settingsNameAsVar="defaultDueDate"
                beforeText="Default due date: "
                currentValue={props.user.settings.defaultDueMins}
                afterText=" minutes"
            />
            <ChangeableSettings
                mustBeType="theme"
                user={props.user}
                settingsNameAsVar="defaultTheme"
                beforeText="Theme: "
                currentValue={props.user.settings.theme}
                afterText=" mode"
            />
        </div>
    )
}

type ChangeableSettingsProps = {
    user: User
    mustBeType: string
    beforeText: string
    currentValue: number | string | boolean
    afterText: string
    settingsNameAsVar: string
}

/**
 * This component is ridiculously complex... I bet there's a much easier way to do this. It works for now.
 * @param props 
 * @returns 
 */
function ChangeableSettings(props: ChangeableSettingsProps) {
    let textbox = <input
        type="text"
        id={props.beforeText}
        style={{ display: "none" }}>
    </input>
    let saveB = <button
        style={{ display: "none" }}
        id={"saveB" + props.beforeText}
        onClick={(e) => { saveSettings(e); toggleTextBox(e) }}
    >
        save
    </button>
    let cancelB = <button
        style={{ display: "none" }}
        id={"cancelB" + props.beforeText}
        onClick={(e) => { revertToDefaultSettings(e); toggleTextBox(e); }}
    >
        revert
    </button>
    function saveSettings(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        let cvs = document.getElementById("currValueSetting" + props.beforeText) // old value
        // @ts-ignore-error: it does exist
        let newSettingsValue = document.getElementById(props.beforeText)!.value // new value
        // ensure it's a number (if that's what we want)
        if (props.mustBeType === "number" && !isNaN(Number(newSettingsValue))) {
            cvs!.innerHTML = newSettingsValue!.toString()
            props.user.settings[props.settingsNameAsVar] = Number(cvs!.innerHTML)
        } else if (props.mustBeType === "string") { // or if we're working with strings
            cvs!.innerHTML = newSettingsValue!.toString()
            props.user.settings[props.settingsNameAsVar] = newSettingsValue!.toString()
        } else if (props.mustBeType === "theme") { // or if we're working with themes
            if (["dark", "light"].includes(newSettingsValue!.toString())) {
                cvs!.innerHTML = newSettingsValue!.toString()
                props.user.settings[props.settingsNameAsVar] = newSettingsValue!.toString()
            } else {
                revertToDefaultSettings(e)
                alert("That wasn't a possible theme! Resetting to default...")
            }
        } else if (props.mustBeType === "boolean" && typeof newSettingsValue === "boolean") { // or if we're working wth booleans
            cvs!.innerHTML = newSettingsValue!.toString()
            props.user.settings[props.settingsNameAsVar] = newSettingsValue
        } else {
            revertToDefaultSettings(e)
            alert("That wasn't a number! Resetting to default...")
        }
    }
    function revertToDefaultSettings(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        let textboxEl = document.getElementById(props.beforeText)! as HTMLInputElement
        let cvs = document.getElementById("currValueSetting" + props.beforeText)
        let oldValue = props.currentValue.toString()
        cvs!.innerHTML = oldValue
        props.user.settings[props.settingsNameAsVar] = oldValue
        textboxEl.value = oldValue
    }
    function hideTB(tb, saveB, cancelB) {
        tb.style.display = "none"
        saveB.style.display = "none"
        cancelB.style.display = "none"
    }
    function showTBandBeginEditing(tb, saveB, cancelB) {
        let cvs = document.getElementById("currValueSetting" + props.beforeText)
        cvs!.innerHTML = "editing..."
        tb.style.display = "inline"
        saveB.style.display = "inline"
        cancelB.style.display = "inline"
    }
    function toggleTextBox(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        let tb = document.getElementById(props.beforeText)!
        let saveB = document.getElementById("saveB" + props.beforeText)!
        let cancelB = document.getElementById("cancelB" + props.beforeText)!
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
            <span id={"currValueSetting" + props.beforeText} onClick={(e) => toggleTextBox(e)} style={{ color: "blue" }}>
                {props.currentValue}
            </span>
            {props.afterText}
        </div>
    )
}