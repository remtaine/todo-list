import '../styles/main.scss';
import setupNavHeaders from './layout/nav.js';
import {todoListItem, todoList} from './component/list.js';

const checkboxes = document.getElementsByTagName('input');

const strikethroughText = function(box) {
    if (box.checked) {
        box.parentElement.classList.add('done');
    }
    else {
        box.parentElement.classList.remove('done');
    }
};

const setupStrikethroughText = function() {
    for (let i = 0; i < checkboxes.length; i++) {
        strikethroughText(checkboxes[i]);
    
        checkboxes[i].addEventListener('change', function() {
            strikethroughText(checkboxes[i]);
        });
    }
}

//main starts here
setupStrikethroughText();
setupNavHeaders();