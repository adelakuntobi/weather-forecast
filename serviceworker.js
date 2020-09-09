self.addEventListener("install", evt => {
  console.log("Service worker dey work, we don install am")
})

// Activate event
self.addEventListener('activate', evt => {
  console.log("Omo this Net Ninja na goat, we sha don activate service worker ")
})

// Fetch Event
self.addEventListener('fetch', evt => {
  console.log("Event Fetch", evt)
})