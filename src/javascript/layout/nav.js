const navButtons = document.querySelectorAll('.nav-button');
let activeButton = document.querySelector('.active').firstChild;



export default function setupNavHeaders() {
    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].addEventListener('click', function() {
            if (navButtons[i] !== activeButton) {
                activeButton.parentElement.classList.remove('active');
                navButtons[i].parentElement.classList.add('active');
                activeButton = navButtons[i];
            }
        });
    }
}
