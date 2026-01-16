// alerts.js

// Function to fetch weather and generate alerts
async function fetchWeatherAlerts() {
  try {
    // Use user's location if allowed
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Open-Meteo API (no key required)
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();

        generateCustomAlerts(data.current_weather);
      }, (error) => {
        console.error("Geolocation error:", error);
        // Fallback: default location (example Chennai)
        generateCustomAlerts({temperature:36, windspeed:12, precipitation:0});
      });
    } else {
      // Browser doesn't support geolocation
      generateCustomAlerts({temperature:36, windspeed:12, precipitation:0});
    }
  } catch (err) {
    console.error("Error fetching weather:", err);
    const ul = document.getElementById("alertsList");
    ul.innerHTML = "<li>Unable to fetch alerts at this time.</li>";
  }
}

// Function to generate custom alerts based on weather
function generateCustomAlerts(weather) {
  const ul = document.getElementById("alertsList");
  ul.innerHTML = "";

  let alertsGenerated = 0;

  // Conditions
  if (weather.precipitation > 50) {
    addAlert("⚠️ Heavy Rain Alert: Flood risk near water bodies.");
    alertsGenerated++;
  }
  if (weather.windspeed > 40) {
    addAlert("💨 Strong Wind Alert: Stay away from water.");
    alertsGenerated++;
  }
  if (weather.temperature > 45) {
    addAlert("☀️ Heatwave Alert: Avoid outdoor water activities.");
    alertsGenerated++;
  }
  if (weather.temperature < 10) {
    addAlert("❄️ Cold Warning: Water exposure may be unsafe.");
    alertsGenerated++;
  }

  // If no alerts
  if (alertsGenerated === 0) {
    addAlert("✅ No alerts currently. Water conditions safe.");
  }
}

// Helper function to display a single alert in blue & white theme
function addAlert(message) {
  const ul = document.getElementById("alertsList");
  const li = document.createElement("li");
  li.innerText = message;
  li.style.border = "1px solid #0077b6";
  li.style.borderRadius = "5px";
  li.style.padding = "8px";
  li.style.margin = "5px 0";
  li.style.backgroundColor = "white";
  li.style.color = "#0077b6";
  ul.appendChild(li);

  // Show browser/mobile notification
  showNotification(message);
}

// Function to show mobile/browser notification
function showNotification(message) {
  // Check if browser supports notifications
  if (!("Notification" in window)) return;

  // Request permission if not granted
  if (Notification.permission === "granted") {
    new Notification("AquaGuard Alert", { body: message, icon: "icon.png" });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("AquaGuard Alert", { body: message, icon: "icon.png" });
      }
    });
  }
}

// Refresh every 10 minutes
setInterval(fetchWeatherAlerts, 600000);

// Call on page load
window.onload = fetchWeatherAlerts;