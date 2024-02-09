<script>
        function openSettingsModal() {
            document.getElementById('settings-modal').style.display = 'flex';
        }

        function saveSettings() {
            const clockElement = document.getElementById('clock');
            const backgroundColorSelect = document.getElementById('background-color');
            const fontColorSelect = document.getElementById('font-color');

            const selectedBackgroundColor = backgroundColorSelect.value;
            const selectedFontColor = fontColorSelect.value;

            // Apply selected colors to the body and clock
            document.body.style.backgroundColor = selectedBackgroundColor;
            document.body.style.color = selectedFontColor;
            clockElement.style.color = selectedFontColor;

            // Close the settings modal
            document.getElementById('settings-modal').style.display = 'none';
        }

        let is24HourFormat = true; // Default to 24-hour format

        function clock() {
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
            const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
            document.getElementById('clock').innerHTML = is24HourFormat ? timeString : timeString + ' ' + ampm;
        }

        setInterval(clock, 1000);

        // Toggle button functionality
        document.getElementById('formatToggle').addEventListener('change', function () {
            is24HourFormat = !is24HourFormat;
        });
    </script>
