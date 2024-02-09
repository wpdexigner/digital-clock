<script>
        let is24HourFormat = true; // Default to 24-hour format

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (!is24HourFormat) {
        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
    }

    // Format the time to display two digits
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').innerHTML = is24HourFormat ? timeString : timeString + (now.getHours() >= 12 ? ' PM' : ' AM');
}

setInterval(updateClock, 1000);

// Toggle button functionality
document.getElementById('toggleFormat').addEventListener('click', function() {
    is24HourFormat = !is24HourFormat;
    // Update button text based on the current format
    this.textContent = is24HourFormat ? '12-Hour' : '24-Hour';
});
    </script>
