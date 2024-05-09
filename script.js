
let currentWindowId;
let isWindowVisible = false; 
let minimizeWindowFunction;

function setupToggleButton() {
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
        console.error('setupToggleButton() issue');
    }
}

document.addEventListener('DOMContentLoaded', setupToggleButton);

function minWindowEventListener(windowId) {
    if (!minimizeWindowFunction) {
        minimizeWindowFunction = event => clickOutsideToMinWindow(event, windowId);
    }
    document.addEventListener('click', minimizeWindowFunction);
}

function rmMinWindowListener() {
    if (minimizeWindowFunction) {
        document.removeEventListener('click', minimizeWindowFunction);
        minimizeWindowFunction = null;
    }
}

document.addEventListener('DOMContentLoaded', setupToggleButton);

function clickOutsideToMinWindow(event, windowId) {
    const windowElement = document.getElementById(windowId);
    if (!windowElement.contains(event.target)) {
        windowElement.classList.remove('restore');
        windowElement.classList.add('minimize');
        setTimeout(() => {
            windowElement.style.display = 'none';
        }, 300); 
        rmMinWindowListener();
    }
}


function stopPulse() {
    const footer = document.querySelector('.footer');
    footer.classList.add('stop-pulse');
}

function toggleWindow(event, windowId, htmlFile) {
    stopPulse();
    event.stopPropagation();
    if (currentWindowId && currentWindowId !== windowId) {
        rmMinWindowListener();
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
  
        windowElement.style.display = 'block';
        windowElement.classList.remove('minimize');
        windowElement.classList.add('restore');
        setTimeout(() => {
            minWindowEventListener(windowId);
        }, 0);
        currentWindowId = windowId; 

        fetch(htmlFile)
            .then(response => response.text())
            .then(data => {
                windowElement.innerHTML = data;
                setupToggleButton();

            });
    } else {
        windowElement.classList.remove('restore');
        windowElement.classList.add('minimize');
        setTimeout(() => {
            windowElement.style.display = 'none';
        }, 300);
        currentWindowId = null;
    }
}

