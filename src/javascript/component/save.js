import {listItem, listHeader, setupStrikethroughText} from './list.js';
import {setStorage, getStorage} from './utils.js';

const createInitSession = function() {
    window.localStorage.clear();
    console.log('Initializing...')
    if (window.localStorage.getItem("listHeaders") === null) {
        setStorage('listHeaders', []);
        console.log("Creating first session data");

        listHeader('main').create();
        listHeader('social').create();
        listHeader('gym').create();
        listHeader('groceries').create();
        listHeader('finance').create();

        const mainDescription = "Did you realize that you're a champion in their eyes?";
        const mainItems = [
            {
                checked: false,
                content: "This is the story of a champion",
                deadline: "2021-09-24"
            },
            {
                checked: true,
                content: "Runners on your mark and they pop the guns",
                deadline: "2021-09-25"
            },
            {
                checked: false,
                content: "Stand up, stand up, here he comes",
                deadline: "2021-09-26"
            },
            {
                checked: false,
                content: "Tell me, what it takes to be number one",
                deadline: "2021-09-27"
            }
        ];

        setStorage('main' + '-description', mainDescription);
        setStorage('main' + '-items', mainItems);
    }
    else {
        console.log("Retrieving past session data");
    }
};

export {createInitSession}