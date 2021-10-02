import { getStorage, setStorage } from "../component/utils";
import {listHeader, listNav} from '../component/list.js';

export default function setupNavHeaders() {
    renderNavHeaders();
    addEventNavHeaders();
}

const renderNavHeaders = function() {
    const currentHeaders = getStorage('listHeaders');
    const navAdd = document.getElementById('nav-add');
    const navList = document.getElementById('nav-list');
    for (let i = 0; i < currentHeaders.length; i++) {
        console.log(currentHeaders[i]);
        listHeader(currentHeaders[i]).renderNav();
    }
    navList.appendChild(navAdd);
};

const addEventNavHeaders = function() {
    const navButtons = document.querySelectorAll('.nav-button');
    let activeButton = getStorage('activeHeader');
    // for (let i = 0; i < navButtons.length; i++) {
        
    // }
};