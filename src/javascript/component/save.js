import {listItem, listHeader, listDescription} from './list.js';
import {setStorage, getStorage} from './utils.js';

const createInitSession = function() {
    window.localStorage.clear();
    console.log('Initializing...')
    if (getStorage("listHeaders") === null) {
        console.log("Creating first session data");

        setStorage('listHeaders', []);

        listHeader('main').create();
        listHeader('social').create();
        listHeader('gym').create();
        listHeader('groceries').create();
        listHeader('finance').create();

        listDescription('main', "Did you realize that you're a champion in their eyes?").create();

        listItem('main', {
            checked: false,
            content: "This is the story of a champion",
            deadline: "2021-09-24"
        }).create();

        listItem('main', {
            checked: true,
            content: "Runners on your mark and they pop the guns",
            deadline: "2021-09-25"
        }).create();

        listItem('main', {
            checked: false,
            content: "Stand up, stand up, here he comes",
            deadline: "2021-09-26"
        }).create();

        listItem('main', {
            checked: false,
            content: "Tell me, what it takes to be number one",
            deadline: "2021-09-27"
        }).create();
    }
    else {
        console.log("Retrieving past session data");
    }
};

export {createInitSession}