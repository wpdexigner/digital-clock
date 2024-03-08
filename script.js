document.addEventListener('DOMContentLoaded', function() {
    let clock = document.getElementById('clock');
    // Retrieve saved preferences or set defaults
    let timeFormat = localStorage.getItem('timeFormat') || '12';
    let theme = localStorage.getItem('theme') || 'light';

    // Initialize with default color options for the theme
    let colorOptions = {
        light: {
            '#F1F1EF': 'Grey', '#F4EEEE': 'Brown', '#FAEBDD': 'Orange', '#FBF3DB': 'Yellow',
            '#EDF3EC': 'Green', '#E7F3F8': 'Blue', '#F6F3F9': 'Purple', '#FAF1F5': 'Pink', '#FDEBEC': 'Red'
        },
        dark: {
            '#454B4E': 'Grey', '#594A3A': 'Brown', '#594A3A': 'Orange', '#59563B': 'Yellow',
            '#354C4B': 'Green', '#364954': 'Blue', '#443F57': 'Purple', '#533B4C': 'Pink', '#594141': 'Red'
        }
    };

    function updateClock() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();

        if (timeFormat === '12') {
            hours = hours % 12 || 12;
        }

        clock.textContent = `${padZero(hours)}:${padZero(minutes)}`;
        setTimeout(updateClock, 1000);
    }

    function padZero(n) {
        return n < 10 ? '0' + n : n;
    }

    function changeBackgroundColor(color) {
        document.body.style.backgroundColor = color;
    }

    function changeTimeFormat(format) {
        timeFormat = format;
        // Save the time format preference
        localStorage.setItem('timeFormat', timeFormat);
    }

    function changeTheme(selectedTheme) {
        theme = selectedTheme;
        // Save the theme preference
        localStorage.setItem('theme', theme);

        const backgroundColorSelect = document.getElementById('background-color');
        backgroundColorSelect.innerHTML = ''; // Clear existing options

        // Populate background color options based on the selected theme
        Object.entries(colorOptions[theme]).forEach(([value, text]) => {
            let option = new Option(text, value);
            backgroundColorSelect.add(option);
        });

        // Apply the first color option as the default background
        changeBackgroundColor(Object.keys(colorOptions[theme])[0]);

        // Adjust modal content colors for dark theme
        const modalContent = document.querySelector('.modal-content');
        if (theme === 'dark') {
            document.body.style.color = '#FFFFFF';
            modalContent.style.backgroundColor = '#333';
            modalContent.style.color = '#FFFFFF';
        } else {
            document.body.style.color = '#000000';
            modalContent.style.backgroundColor = '#fefefe';
            modalContent.style.color = '#000000';
        }
    }

    function openModal() {
        document.getElementById('settings-modal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('settings-modal').style.display = 'none';
    }

    // Bind the modal open/close functions to window for global access
    window.openModal = openModal;
    window.closeModal = closeModal;

    // Bind setting change functions to window for global access
    window.changeBackgroundColor = changeBackgroundColor;
    window.changeTimeFormat = changeTimeFormat;
    window.changeTheme = changeTheme;

    // Initialize the clock, settings, and user preferences
    updateClock();
    changeTheme(theme); // Apply saved or default theme
    // Set the select elements to reflect the saved or default preferences
    document.getElementById('time-format').value = timeFormat;
    document.getElementById('theme').value = theme;
});
