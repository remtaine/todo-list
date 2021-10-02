import {listItem, listHeader, listDescription} from './list.js';
import {setStorage, getStorage} from './utils.js';

const createInitSession = function() {
    window.localStorage.clear();
    console.log('Initializing...')
    if (getStorage("listHeaders") === null) {
        console.log("Creating first session data");

        setStorage('listHeaders', []);
        setStorage('activeHeader', 'main');

        listHeader('main').create();
        listHeader('social').create();
        listHeader('gym').create();
        listHeader('groceries').create();
        listHeader('finance').create();

        //main
        let currentSavingHeader = 'main';
        listDescription(currentSavingHeader, "Did you realize that you're a champion in their eyes?").create();

        listItem(currentSavingHeader, {
            checked: false,
            content: "This is the story of a champion",
            deadline: "2021-09-24"
        }).create();

        listItem(currentSavingHeader, {
            checked: true,
            content: "Runners on your mark and they pop the guns",
            deadline: "2021-09-25"
        }).create();

        listItem(currentSavingHeader, {
            checked: false,
            content: "Stand up, stand up, here he comes",
            deadline: "2021-09-26"
        }).create();

        listItem(currentSavingHeader, {
            checked: false,
            content: "Tell me, what it takes to be number one",
            deadline: "2021-09-27"
        }).create();

        currentSavingHeader = 'social';
        //social
        listDescription(currentSavingHeader, "Did you realize that you're a champion in their eyes?").create();

        listItem(currentSavingHeader, {
            checked: false,
            content: "This is the story of a champion",
            deadline: "2021-09-24"
        }).create();

        listItem(currentSavingHeader, {
            checked: true,
            content: "Runners on your mark and they pop the guns",
            deadline: "2021-09-25"
        }).create();

        listItem(currentSavingHeader, {
            checked: false,
            content: "Stand up, stand up, here he comes",
            deadline: "2021-09-26"
        }).create();

        listItem(currentSavingHeader, {
            checked: false,
            content: "Tell me, what it takes to be number one",
            deadline: "2021-09-27"
        }).create();

        //social
        currentSavingHeader = 'social';
        listDescription(currentSavingHeader, "I had a feeling that I belonged").create();

        listItem(currentSavingHeader, {
            checked: false,
            content: "Your arm felt nice wrapped around my shoulder",
            deadline: "2021-09-24"
        }).create();
    }
    else {
        console.log("Retrieving past session data");
    }
};

export {createInitSession}