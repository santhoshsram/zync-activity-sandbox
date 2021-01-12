# Starting the Sandbox

```
npm install
npm start
```

# Creating an Activity

## 1. List Activity - `activityListing.js`

Define your activity here.

**Guidelines**

- Do not change / add fields outside of `settings`
- The file for client (`Sample.jsx`) and server (`sampleActivity.js`) should not have any common dependencies with each other.

**Example**

```js
{
  // Pick a unique activity id name
  activityId: "sample_activity",

  details: {
    // Keep the title under 30 characters.
    title: "Sample Activity",
    // Keep the description under 120 characters.
    description: "This is your sample activity",
    iconUrl:
      "https://res.cloudinary.com/zync/image/upload/v1608690626/activity_icons/bazinga_zmp0uw.png"
  },
  code: {
    // client: This is the name of the file which exports Activity, Summary, Settings.
    // Use relative path: `sample/SampleActivity` is valid.
    // Activity.jsx
    client: "Activity",

    // server: This is the name of the file that experts activityReducer
    // Use relative path: `sample/SampleActivity` is valid.
    // activityReducer.js
    server: "activityReducer"
  },
  settings: {
    videoLayout: "docked" // This should be either 'docked' or 'minimized' which tells how the video hub should be when your activity is launched
    // You can add other settings over here
  }
}
```

## 2. User Experience - `Sample.jsx`

### General Guidelines

- No dependency on any 3rd party libraries.
- No import of `.css` files. Use `styled-components`.
- No changes are allowed to files outside the `activity` folder.
- Use components available in `/components` folder for designing your experience.

---

### Settings

Modal to configure this activity when launched. <br/>Modal shows up when activity clicked from activity picker.
This component implments the settings that go in the modal
Launch button will be provided by the platform.

**Props**

| Prop                | Description                                       |
| ------------------- | ------------------------------------------------- |
| `settings`          | Default settings provided from above.             |
| `setLaunchSettings` | Function to call when these settings are updated. |

**Guidelines**

- Component cannot make a call to an external service
- Space is a constraint, do not set component width and height.
- Expect this to render within a `500 x 500` frame.
- Not every configuration setting need to be made customizable.

Example

```jsx
const Settings = ({ settings, setLaunchSettings }) => {
  const [updateTimeInSeconds, setUpdateTimeInSeconds] = useState(
    settings.updateTimeInSeconds
  )
  const updateTimeChange = (e) => {
    const time = parseInt(e.target.value) || settings.updateTimeInSeconds
    if (isNaN(time)) return
    setUpdateTimeInSeconds(time)
    setLaunchSettings({ ...settings, updateTimeInSeconds: time })
  }
  return (
    <div>
      <div>Update Time In Seconds</div>
      <Input onChange={updateTimeChange} value={updateTimeInSeconds} />
    </div>
  )
}
```

---

### Activity

Your activity will be rendered using this component.

**Props**
| Props | Description |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `activity` | Activity Object with all details about the activity |
| `activity.activityId` | Unique Activity Id is allocated for your Application and will have to be passed on all server dispatch calls. |
| `activity.instanceId` | Unique Instance Id allocated for this running instance of the activity. You'll need to provide this on your server dispatch calls. |
| `activity.details` | The details about your application. See 1 above. |
| `activity.settings` | The configuration settings for your application that was set at the time of launch. This is the launch settings that was configured by the user. |
| `users` | User Object that contains the list of all active users in the list. |
| `users[<userId>].userName` | Name of the users |
| `eventDispatch` | Dispatch actions using this function. Actions dispatched here will be consumed by `activityReducer` |
| `user` | User object of the current user |

**Guidelines**

- Restrict the Activity to a width of `800px`
- Allow vertical scroll if applicable but if possible restrict height to `600px` for best experience
- No modals are allowed inside activities

**Example**

```jsx
const Activity = ({ activity, users, user, eventDispatch }) => {
  return <div>Your main activity code</div>
}
```

---

### Summary

Your activity will be included in the Summary and rendered using this Component.

**Props**
Same props as what you see for the `Activity` component above.

**Guidelines**

- Should be responsive for a `div` with `300px`
- `max-width` is `800px`

**Example**

```jsx
const Summary = ({ activity, users, user }) => {
  return <div> Summary - Activity Summary</div>
}
```

## 3. State Reducer - `sampleActivity`

Write the business logic of your activity inside the activityReducer file.

**Guidelines**

- Always include `LAUNCH_ACTIVITY` where you set the initial state of the activity object.

**Example**

```js
const activityReducer = (state, action) => {
  switch (action.type) {
    case "LAUNCH_ACTIVITY":
      return {
        ...state,
        message: "Here I can set the initial state of my activity",
        someArray: [],
        someBoolean: false
      }
    default:
      return {
        ...state
      }
  }
}
```
