# Starting the Sandbox
```
npm install 
npm start
```

# Creating an activity 

## 1. List Activity
Information that will be presented in the Activity Picker.

| Field                      | Description                                                  |
| -------------------------- | :----------------------------------------------------------- |
| `title` (_required_)       | Title of the activity. Limit 24 characters                   |
| `description` (_required_) | Short description of the activity. Limit 256 characters.     |
| `icon` (_required_)        | URL for the icon. Must be square. Maximum size `1024px x 1024px` |

Example

```json
{
  "title": "Status Update",
	"description": "Go around the table and give a status update",
	"icon": "https://iconurl.com"
}
```

## 2. Default Configuration 
Configuration settings for the activity <br/>You can include additional configuration settings here. <br/>

When users pick the activity they can be allowed to customize these settings using the Customization component. 

| Field                   | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `videohub` (_required_) | This describes how you want the video hub to behave when you run your activity. <br/> This can be set to one of `Docked` or `Minimized`<br/>When set to `Docked`, the video hub provided by platform is Docked. Participants are visible on the side. You get a frame with `800px` width to implement your activity. <br/>When set to `Minimized` the video hub provided by platform is Minimized and only the bottom bar with the Mute, Camera Off and End Meeting buttons are visible. You get a frame with `1080px` width to implment your activity. Users will not be able to see each others' video in this mode. You can implement your custom video visualization. See example below in Activity section |
|                         |                                                              |

Example: 

```
{
    videoHub: "minimized",
    updateTimeInSeconds: 90,
    statusUpdatePrompt: "What are you working on ? Are you on track ? Are you blocked ?"
}
```



## 3. Customization Settings

Modal to configure this activity when launched. <br/>Modal shows up when activity clicked from activity picker. 

This component implments the settings that go in the modal 
Launch button will be provided by the platform. 

Props passed to your component 

| Prop                | Description                                       |
| ------------------- | ------------------------------------------------- |
| `settings`          | Default settings provided from above.             |
| `setLaunchSettings` | Function to call when these settings are updated. |

### Guidelines: 
* Component cannot make a call to an external service 
* Space is a constraint, do not set component width and height. 
* Expect this to render within a `500 x 500` frame. 
* Not every configuration setting need to be made customizable. 

Example

```
const Settings = ({ settings, setLaunchSettings }) => {
    const [updateTimeInSeconds, setUpdateTimeInSeconds] = useState(settings.updateTimeInSeconds)
    const updateTimeChange = (e) => {
        const time = parseInt(e.target.value) || settings.updateTimeInSeconds
        if (isNaN(time)) return;
        setUpdateTimeInSeconds(time)
        setLaunchSettings({ ...settings, updateTimeInSeconds: time })
    }
    return (<div>
        <div>Update Time In Seconds</div>
        <Input onChange={updateTimeChange} value={updateTimeInSeconds} />
    </div>)
}
```

## 4. Activity 
The main activity is implemented here. 

| Props                      | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `activity`                 | Activity Object with all details about the activity          |
| `activity.activityId`      | Unique Activity Id is allocated for your Application and will have to be passed on all server dispatch calls. |
| `activity.instanceId`      | Unique Instance Id allocated for this running instance of the activity. You'll need to provide this on your server dispatch calls. |
| `activity.details`         | The details about your application. See 1 above.             |
| `activity.settings`        | The configuration settings for your application that was set at the time of launch. This is the launch settings that was configured by the user. |
| `users`                    | User Object that contains the list of all active users in the list. |
| `users[<userId>].userName` | Name of the user                                             |
| `users[<userId>].videoUrl` |                                                              |


### Guidelines:   
* 

## 5. Summary 

The Summary section will be part of the Meeting Summary at the end of the meeting. 

| Props      | Description |
| ---------- | ----------- |
| `activity` |             |

