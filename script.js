document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.toggle-button');
    const moreInfo = document.querySelector('.more-info');

    if (toggleButton && moreInfo) {
        toggleButton.addEventListener('click', function() {
            if (moreInfo.style.display === 'none' || !moreInfo.style.display) {
                moreInfo.style.display = 'block';
                toggleButton.textContent = '⚡ Ratings Explained';
            } else {
                moreInfo.style.display = 'none';
                toggleButton.textContent = '⚡ Ratings Explained';
            }
        });
    } else {
        console.error('Toggle button or more info element not found.');
    }
});



let isWindowVisible = false; 


function minimizeWindowOnClickOutside(event) {
    const windowElement = document.getElementById('skillsWindow');
    if (!windowElement.contains(event.target)) {
        console.log('Clicked outside window, minimizing...');
        windowElement.classList.remove('restore');
        windowElement.classList.add('minimize');
        setTimeout(() => {
            windowElement.style.display = 'none';
        }, 300); 
        document.removeEventListener('click', minimizeWindowOnClickOutside); 
    }
}

function addMinimizeWindowEventListener() {
    document.addEventListener('click', minimizeWindowOnClickOutside);
}

function removeMinimizeWindowEventListener() {
    document.removeEventListener('click', minimizeWindowOnClickOutside);
}

function toggleSkillsWindow() {
    console.log('Toggle window function called');
    const windowElement = document.getElementById('skillsWindow');
    const isWindowVisible = windowElement.classList.contains('restore');

    if (!isWindowVisible) {

        console.log('Showing window');
        windowElement.style.display = 'block';
        windowElement.classList.remove('minimize');
        windowElement.classList.add('restore');

        fetch('skills.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('skillsWindow').innerHTML = html;
                addMinimizeWindowEventListener(); 
            })
            .catch(error => console.error('Error loading skills.html:', error));

    } else {
        console.log('Hiding window');
        windowElement.classList.remove('restore');
        windowElement.classList.add('minimize');
        setTimeout(() => {
            windowElement.style.display = 'none';
        }, 300); 
        removeMinimizeWindowEventListener(); 
    }
}


function toggleAboutMeWindow() {
    console.log('Toggle about me window function called');
    const windowElement = document.getElementById('aboutMeWindow');
    const isWindowVisible = windowElement.classList.contains('restore');

    if (!isWindowVisible) {

        console.log('Showing about me window');
        windowElement.style.display = 'block';
        windowElement.classList.remove('minimize');
        windowElement.classList.add('restore');

        fetch('aboutme.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('aboutMeWindow').innerHTML = html;
                addMinimizeWindowEventListener();
            })
            .catch(error => console.error('Error loading aboutme.html:', error));
    } else {
        console.log('Hiding about me window');
        windowElement.classList.remove('restore');
        windowElement.classList.add('minimize');
        setTimeout(() => {
            windowElement.style.display = 'none';
        }, 300);
        removeMinimizeWindowEventListener(); 
    }
}
