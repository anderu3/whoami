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


// function minimizeWindowOnClickOutside(event) {
//     const windowElement = document.getElementById('skillsWindow');
//     if (!windowElement.contains(event.target)) {
//         console.log('Clicked outside window, minimizing...');
//         windowElement.classList.remove('restore');
//         windowElement.classList.add('minimize');
//         setTimeout(() => {
//             windowElement.style.display = 'none';
//         }, 300); 
//         document.removeEventListener('click', minimizeWindowOnClickOutside); 
//     }
// }

// function addMinimizeWindowEventListener() {
//     document.addEventListener('click', minimizeWindowOnClickOutside);
// }

// function removeMinimizeWindowEventListener() {
//     document.removeEventListener('click', minimizeWindowOnClickOutside);
// }

// function toggleSkillsWindow() {
//     console.log('Toggle window function called');
//     const windowElement = document.getElementById('skillsWindow');
//     const isWindowVisible = windowElement.classList.contains('restore');

//     if (!isWindowVisible) {

//         console.log('Showing window');
//         windowElement.style.display = 'block';
//         windowElement.classList.remove('minimize');
//         windowElement.classList.add('restore');

//         fetch('skills.html')
//             .then(response => response.text())
//             .then(html => {
//                 document.getElementById('skillsWindow').innerHTML = html;
//                 addMinimizeWindowEventListener(); 
//             })
//             .catch(error => console.error('Error loading skills.html:', error));

//     } else {
//         console.log('Hiding window');
//         windowElement.classList.remove('restore');
//         windowElement.classList.add('minimize');
//         setTimeout(() => {
//             windowElement.style.display = 'none';
//         }, 300); 
//         removeMinimizeWindowEventListener(); 
//     }
// }


// function toggleAboutMeWindow() {
//     console.log('Toggle about me window function called');
//     const windowElement = document.getElementById('aboutMeWindow');
//     const isWindowVisible = windowElement.classList.contains('restore');

//     if (!isWindowVisible) {

//         console.log('Showing about me window');
//         windowElement.style.display = 'block';
//         windowElement.classList.remove('minimize');
//         windowElement.classList.add('restore');

//         fetch('aboutme.html')
//             .then(response => response.text())
//             .then(html => {
//                 document.getElementById('aboutMeWindow').innerHTML = html;
//                 addMinimizeWindowEventListener();
//             })
//             .catch(error => console.error('Error loading aboutme.html:', error));
            
//     } else {
//         console.log('Hiding about me window');
//         windowElement.classList.remove('restore');
//         windowElement.classList.add('minimize');
//         setTimeout(() => {
//             windowElement.style.display = 'none';
//         }, 300);
//         removeMinimizeWindowEventListener(); 
//     }
// }

let currentWindowId;

let minimizeWindowFunction;

function addMinimizeWindowEventListener(windowId) {
    minimizeWindowFunction = event => minimizeWindowOnClickOutside(event, windowId);
    document.addEventListener('click', minimizeWindowFunction);
}

function removeMinimizeWindowEventListener() {
    document.removeEventListener('click', minimizeWindowFunction);
}


function minimizeWindowOnClickOutside(event, windowId) {
    const windowElement = document.getElementById(windowId);
    if (!windowElement.contains(event.target)) {
        console.log('Clicked outside window, minimizing...');
        windowElement.classList.remove('restore');
        windowElement.classList.add('minimize');
        setTimeout(() => {
            windowElement.style.display = 'none';
        }, 300); 
        removeMinimizeWindowEventListener();
    }
}

function toggleWindow(event, windowId, htmlFile) {
    event.stopPropagation();
    console.log('Toggle window function called');

    // Remove the event listener for the currently open window
    if (currentWindowId && currentWindowId !== windowId) {
        removeMinimizeWindowEventListener();
    }

    const windowElement = document.getElementById(windowId);
    if (windowElement.style.display === 'none' || windowElement.style.display === '') {
        if (currentWindowId && currentWindowId !== windowId) {
            // Close the currently open window
            const currentWindowElement = document.getElementById(currentWindowId);
            currentWindowElement.classList.remove('restore');
            currentWindowElement.classList.add('minimize');
            setTimeout(() => {
                currentWindowElement.style.display = 'none';
            }, 300);
        }
        // Show the new window
        console.log('Showing window');
        windowElement.style.display = 'block';
        windowElement.classList.remove('minimize');
        windowElement.classList.add('restore');
        setTimeout(() => {
            addMinimizeWindowEventListener(windowId);
        }, 0);
        currentWindowId = windowId; // Update the currently open window

        // Load the HTML file into the window
        fetch(htmlFile)
            .then(response => response.text())
            .then(data => {
                windowElement.innerHTML = data;
            });
    } else {
        console.log('Hiding window');
        windowElement.classList.remove('restore');
        windowElement.classList.add('minimize');
        setTimeout(() => {
            windowElement.style.display = 'none';
        }, 300);
        currentWindowId = null; // No window is open
    }
}