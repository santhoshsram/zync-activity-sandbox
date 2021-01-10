export const activityListing = {
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
    client: "Sample",

    // server: This is the name of the file that experts activityReducer
    // Use relative path: `sample/SampleActivity` is valid. 
    // activityReducer.js
    server: "sampleActivity"
  },
  settings: {
    videoLayout: "docked" // This should be either 'docked' or 'minimized' which tells how the video hub should be when your activity is launched
    // You can add other settings over here
  }
}
