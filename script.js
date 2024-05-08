// Get references to the button and the additional text
const toggleButton = document.querySelector('.toggle-button');
const moreInfo = document.querySelector('.more-info');

// Add event listener to the button
toggleButton.addEventListener('click', function() {
    // Toggle the visibility of the additional text
    if (moreInfo.style.display === 'none') {
        moreInfo.style.display = 'block';
        toggleButton.textContent = '\u261F Ratings Explained';
    } else {
        moreInfo.style.display = 'none';
        toggleButton.textContent = '\u261E Ratings Explained';
    }
});


function toggleWindow() {
    const windowElement = document.getElementById('skillsWindow');
    if (windowElement.style.display === 'none') {
        // Show window
        windowElement.style.display = 'block';
        windowElement.classList.remove('minimize');
        windowElement.classList.add('restore');

        // Load content from skills.html
        fetch('skills.html')
            .then(response => response.text())
            .then(html => document.getElementById('skillsWindow').innerHTML = html)
            .catch(error => console.error('Error loading skills.html:', error));

    } else {
        // Hide window
        windowElement.classList.remove('restore');
        windowElement.classList.add('minimize');
        setTimeout(() => {
            windowElement.style.display = 'none';
        }, 300); // Adjust the delay to match the transition duration
    }
}
