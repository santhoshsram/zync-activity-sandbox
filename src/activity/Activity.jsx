// THIS IS BOILER PLATE FOR CREATING NEW ACTIVITY
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Switch } from '../components/Switch'
import { ActivityIcon, ActivityTitle, ActivityDescription } from './ActivityTheme'

const activityReducer = (state, action) => {

}

const Activity = ({ activity, users, user, dispatch }) => {
    const { activityId, instanceId, settings, state, details } = activity || {}
    const { host, userName } = user
    const { title, description, icon } = details || {}

    return (
        <h1>
            Activity Main
            {userName}
        </h1>
    )
}

const Settings = ({ settings, setLaunchSettings }) => {
    const { booleanValue } = settings || {}
    const toggle = () => {
        setLaunchSettings({ ...settings, booleanValue: !booleanValue })
    }
    return (
        <div>Setting Switch
            < Switch checked={allowProposals} onChange={toggle} ></Switch >
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