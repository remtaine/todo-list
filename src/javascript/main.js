import '../styles/main.scss';

const checkboxes = document.getElementsByTagName('checkbox');




window.onload = function() {
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', function() {
            if (checkboxes[i].checked) {
                console.log("OPEN!");
            }
        });
    }
};