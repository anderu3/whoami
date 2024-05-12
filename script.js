// import Rain from './rain.js';

let currentWindowId;
let isWindowVisible = false; 
let minimizeWindowFunction;
let isSeattleBackground = false;
let body = document.body;

// const rainCanvas = document.getElementById('rainCanvas');
// const rain = new Rain();

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
    }
}

document.getElementById('seattle').addEventListener('click', function() {
    var seattleSpan = this;
    var footer = document.querySelector('.footer');
    var footericonbgs = document.querySelectorAll('.footericons');
    if (!isSeattleBackground) {
        body.classList.add('seattle-background');
        seattleSpan.style.color = 'rgb(229, 151, 5)';
        footer.style.background = '#0096c7';
        footericonbgs.forEach(function(footericonbg) {
            footericonbg.style.background = '#48cae4';
        });
        isSeattleBackground = true;


    } else {
        body.classList.remove('seattle-background');
        seattleSpan.style.color = 'rgb(62, 62, 209)';
        footer.style.background = '#dad7cd';
        footericonbgs.forEach(function(footericonbg) {
            footericonbg.style.background = '#adb5bd';
        });
        isSeattleBackground = false;
    }
});


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




function toggleWindow(event, windowId, htmlFile) {
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

        fetch(`footerbar/${htmlFile}`)
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

