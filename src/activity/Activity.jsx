// THIS IS BOILER PLATE FOR CREATING NEW ACTIVITY
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Switch } from '../components/Switch'
import { Button } from '../components/Theme'
const activityReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            let msg = Object.assign([], state.messages)
            msg.push({ sender: action.userId, text: action.text })
            return {
                ...state,
                messages: msg
            }
        default:
            return {
                ...state
            }
    }
}

const Activity = ({ activity, users, user, dispatch }) => {
    const { activityId, instanceId, settings, state, details, messages } = activity || {}
    const { userId, host, userName } = user || {}
    const { title, description, icon } = details || {}

    return (
        <>
            <h1> Activity {userName}</h1>
            <Button
                onClick={() => dispatch({ type: "ADD_MESSAGE", userId, text: "BAZINGA" })}>
                BAZINGA
            </Button>
            <div style={{ border: "1px solid black", height: "500px", background: "#ccc" }}>
                {(messages || []).map((m, i) => <div key={i}>{m.sender} says {m.text}</div>)}
            </div>
        </>
    )
}

const Settings = ({ settings, setLaunchSettings }) => {
    const { booleanValue } = settings || {}
    const toggle = () => {
        setLaunchSettings({ ...settings, booleanValue: !booleanValue })
    }
    return (
        <div>Setting Switch
            < Switch checked={true} onChange={toggle} ></Switch >
        </div>
    )
}

const Summary = ({ activity, users, user }) => {
    return (<div> Summary - Activity Summary</div>)
}



export {
    Activity,
    Settings,
    Summary,
    activityReducer
}