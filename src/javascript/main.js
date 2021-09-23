import '../styles/main.scss';
import setupNavHeaders from './layout/nav.js';
import {setupList, listItem, listHeader, setupStrikethroughText} from './component/list.js';
import {createInitSession} from './component/save.js';
import {setStorage, getStorage} from './component/utils.js';


//main starts here
createInitSession();

const headers = getStorage('listHeaders');
// console.log(headers[0]);
// console.log(JSON.parse(window.localStorage.getItem(headers[0]));
// console.log(JSON.parse(window.localStorage.getItem('todoList'))[headers[0]]);

setupList(headers[0]);
setupStrikethroughText();
setupNavHeaders();
