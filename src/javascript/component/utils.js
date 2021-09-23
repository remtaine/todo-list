
const setStorage = function(title, item) {
    window.localStorage.setItem(title, JSON.stringify(item));
};

const getStorage = function(item) {
    return JSON.parse(window.localStorage.getItem(item));
};

export {setStorage, getStorage};