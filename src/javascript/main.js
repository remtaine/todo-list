import '../styles/main.scss';
import setupNavHeaders from './layout/nav.js';
import {setupList, todoListItem, todoList, setupStrikethroughText} from './component/list.js';
import {createInitSession} from './component/save.js';


//main starts here
createInitSession();

const headers = JSON.parse(window.localStorage.getItem('todoListHeaders'));
// console.log(JSON.parse(window.localStorage.getItem('todoList'))[headers[0]]);

setupList(headers[0]);
setupStrikethroughText();
setupNavHeaders();
