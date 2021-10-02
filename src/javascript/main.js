import '../styles/main.scss';
import setupNavHeaders from './layout/nav.js';
import {listItem, listHeader} from './component/list.js';
import {createInitSession} from './component/save.js';
import {setStorage, getStorage} from './component/utils.js';

let activeHeader = null;
let activeData = null;

//main starts here
createInitSession();

const headers = getStorage('listHeaders');

activeHeader = listHeader(headers[0]);
activeHeader.renderList();

setupNavHeaders();
