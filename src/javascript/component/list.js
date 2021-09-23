import {setStorage, getStorage} from './utils.js';


const listTitle = document.getElementById('list-title');
const listDescription = document.getElementById('list-description');
const listItems = document.getElementById('list-items');
const listAddButton = document.getElementById('list-add');

let isEditing = false;

const listHeader = function(title) {
    const create = function() {
        let currentHeaders = getStorage('listHeaders');
        if (!currentHeaders.includes(title)) {
            currentHeaders.push(title);
            setStorage('listHeaders', currentHeaders);
        }
    };

    const remove = function() {
        let currentHeaders = getStorage('listHeaders');
        if (currentHeaders.includes(title)) {
            currentHeaders.splice(currentHeaders.indexOf(title), 1)
            setStorage('listHeaders', currentHeaders);
        }
    }
    return {create, remove};
}

const listItem = function(data) {
    const create = function() {
        return render();
        // save();
    }
    const render = function() {
        const item = document.createElement('li');
        item.classList.add('list-text');
    
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = data.checked;
        const content = document.createElement('span');
        content.innerHTML = " " + data.content;
        
        const deadline = document.createElement('span');
        deadline.classList.add('deadline');
        deadline.innerHTML = (data.deadline !== "none") ? data.deadline: '';
    
        item.appendChild(checkbox);
        item.appendChild(content);
        item.appendChild(deadline);

        strikethroughText(checkbox);
        checkbox.addEventListener('change', function() {
            strikethroughText(checkbox);
        });
        
        return item;
    };
    
    return {render, data, create};
}

const strikethroughText = function(box) {
    if (box.checked) {
        box.parentElement.classList.add('done');
    }
    else {
        box.parentElement.classList.remove('done');
    }
};

const setupStrikethroughText = function() {
    const checkboxes = document.getElementsByTagName('input');

    for (let i = 0; i < checkboxes.length; i++) {
        strikethroughText(checkboxes[i]);
    
        checkboxes[i].addEventListener('change', function() {
            strikethroughText(checkboxes[i]);
        });
    }
}

const setupList = function(header) {
    const data = JSON.parse(window.localStorage.getItem(header));

    //clear everything!
    while (listItems.childElementCount > 1) {
        listItems.removeChild(listItems.firstChild);
    }

    //add the nodes for each
    listTitle.innerHTML = header;
    listDescription.innerHTML = data.description;
    for (let i = 0; i < data.items.length; i++) {
        const item = listItem(data.items[i]).render();
        listItems.appendChild(item);
    }
    listItems.appendChild(listAddButton);
}

const renderEdit = function(c = false, t = '', d = '') {
    const item = document.createElement('li');
    item.classList.add('list-edit');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = c;
    const text = document.createElement('input');
    text.type = 'text';
    text.value = t;
    const date = document.createElement('input');
    date.type = 'date';
    date.value = d;
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-save"></i>';
    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(date);
    item.appendChild(button);


    button.addEventListener('click', function() {
        const newData = {checked: checkbox.checked, content: text.value, deadline: date.value};
        const newRender = listItem(newData).create()
        listItems.appendChild(newRender);
        listItems.appendChild(listAddButton);
        isEditing = false;
        listItems.removeChild(item)
    });

    item.addEventListener('blur', function(event) {
        console.log(document.activeElement);
    });
    
    return item;
};

listAddButton.addEventListener('click', function() {
    if (!isEditing) {
        listItems.appendChild(renderEdit());
        listItems.appendChild(listAddButton);
        isEditing = true;
    }
    else {
        console.log("have you lost your mind?")
    }
});

export {listHeader, listItem, setupStrikethroughText, setupList};