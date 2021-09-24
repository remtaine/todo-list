import {setStorage, getStorage} from './utils.js';


const currentListTitle = document.getElementById('list-title');
let currentHeader = currentListTitle.innerHTML;
const currentListDescription = document.getElementById('list-description');
const currentListItems = document.getElementById('list-items');
const listAddButton = document.getElementById('list-add');

let isEditing = false;

const listHeader = function(header) {
    const get = function() {
        return header;
    }

    const create = function() {
        let currentHeaders = getStorage('listHeaders');
        if (!currentHeaders.includes(header)) {
            currentHeaders.push(header);
            setStorage('listHeaders', currentHeaders);
        }
    };
    
    const render = function() {
        currentListTitle.innerHTML = header;
        currentHeader = header;
        console.log(header);
    }

    const renderList = function() {
        const description = listDescription(header, getStorage(header + '-description'));
        const items = getStorage(header + '-items');
        
        //clear shiz
        while (currentListItems.firstChild) {
            renderRemove(currentListItems.firstChild);
        }
    
        //add the nodes for each
        render();
        description.render();

        for (let i = 0; i < items.length; i++) {
            const item = listItem(header, items[i]).render();
            currentListItems.appendChild(item);
        }
        currentListItems.appendChild(listAddButton);
    };

    const remove = function() {
        let currentHeaders = getStorage('listHeaders');
        if (currentHeaders.includes(header)) {
            currentHeaders.splice(currentHeaders.indexOf(header), 1)
            setStorage('listHeaders', currentHeaders);
        }
    }
    
    return {get, create, renderList, remove};
}

const listDescription = function(header, description) {
    const get = function() {
        return description;
    }
    
    const create = function() {
        setStorage(header + '-description', description);
    }

    const render = function() {
        currentListDescription.innerHTML = description;
    }

    return {get, create, render};
};



const listItem = function(header, data) {
    //data contains isChecked, content, and deadline
    const get = function() {
        return data;
    }

    const create = function() {
        if (getStorage(header + "-items") === null) {
            setStorage(header + "-items", []);
        }
        
        let items = getStorage(header + '-items');
        items.push(data);
        setStorage(header + '-items', items);
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
    
        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('buttonDelete');
        buttonDelete.innerHTML = '<i class="fas fa-trash"></i>';

        item.appendChild(checkbox);
        item.appendChild(content);
        item.appendChild(deadline);
        item.appendChild(buttonDelete);

        strikethroughText(checkbox);
        checkbox.addEventListener('change', function() {
            strikethroughText(checkbox);
        });
        
        buttonDelete.addEventListener('click', function() {
            const index = console.log(Array.prototype.indexOf.call(item.parentElement.children, item));
            renderRemove(item);
            remove(index);
        });

        return item;
    };
    
    const remove = function(index) {
        let items = getStorage(header + "-items");
        if (items === null) {
            return;
        }
        
        items.splice(index, 1);

        setStorage(header + '-items', items);

    };

    const strikethroughText = function(box) {
        if (box.checked) {
            box.parentElement.classList.add('done');
        }
        else {
            box.parentElement.classList.remove('done');
        }
    };
    
    return {get, render, create};
}

const renderEdit = function(obj = {content: '', deadline: ''}) {
    const item = document.createElement('li');
    item.classList.add('list-edit');

    // const checkbox = document.createElement('input');
    // checkbox.setAttribute('id', 'edit-checkbox');
    // checkbox.type = 'checkbox';
    // checkbox.checked = c;
    const text = document.createElement('input');
    text.setAttribute('id', 'edit-text');
    text.type = 'text';
    text.value = obj.content;
    const date = document.createElement('input');
    date.setAttribute('id', 'edit-date');
    date.type = 'date';
    date.value = obj.deadline;
    const buttonSave = document.createElement('button');
    buttonSave.setAttribute('id', 'edit-buttonSave');
    buttonSave.innerHTML = '<i class="fas fa-save"></i>';
    const buttonDelete = document.createElement('button');
    buttonDelete.setAttribute('id', 'edit-buttonDelete');
    buttonDelete.innerHTML = '<i class="fas fa-trash"></i>';

    // item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(date);
    item.appendChild(buttonSave);
    item.appendChild(buttonDelete);


    buttonSave.addEventListener('click', function() {
        const newData = {checked: false, content: text.value, deadline: date.value};
        const newItem = listItem(currentHeader, newData);
        newItem.create();

        currentListItems.appendChild(newItem.render());
        currentListItems.appendChild(listAddButton);
        isEditing = false;
        currentListItems.removeChild(item)
    });

    // item.addEventListener('blur', function(event) {
    //     console.log(document.activeElement);
    // });
    
    return item;
};

const renderRemove = function (item) {
    // const index = item.parentElement.indexOf.call(item.parentElement.children, item);
    item.remove();
    // return index;
};

listAddButton.addEventListener('click', function() {
    if (!isEditing) {
        currentListItems.appendChild(renderEdit());
        currentListItems.appendChild(listAddButton);
        isEditing = true;
    }
    else {
        console.log("have you lost your mind?")
    }
});

export {listHeader, listItem, listDescription};