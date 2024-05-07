// Get references to the button and the additional text
const toggleButton = document.querySelector('.toggle-button');
const moreInfo = document.querySelector('.more-info');

// Add event listener to the button
toggleButton.addEventListener('click', function() {
    // Toggle the visibility of the additional text
    if (moreInfo.style.display === 'none') {
        moreInfo.style.display = 'block';
        toggleButton.textContent = 'Ratings Explained';
    } else {
        moreInfo.style.display = 'none';
        toggleButton.textContent = 'Ratings Explained';
    }
});
