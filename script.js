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

let currentWindowId;

let isWindowVisible = false; 

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

    if (currentWindowId && currentWindowId !== windowId) {
        removeMinimizeWindowEventListener();
    }

    const windowElement = document.getElementById(windowId);
    if (windowElement.style.display === 'none' || windowElement.style.display === '') {
        if (currentWindowId && currentWindowId !== windowId) {
            const currentWindowElement = document.getElementById(currentWindowId);
            currentWindowElement.classList.remove('restore');
            currentWindowElement.classList.add('minimize');
            setTimeout(() => {
                currentWindowElement.style.display = 'none';
            }, 300);
        }
  
        console.log('Showing window');
        windowElement.style.display = 'block';
        windowElement.classList.remove('minimize');
        windowElement.classList.add('restore');
        setTimeout(() => {
            addMinimizeWindowEventListener(windowId);
        }, 0);
        currentWindowId = windowId; 

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
        currentWindowId = null;
    }
}
