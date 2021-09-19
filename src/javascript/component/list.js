const listTitle = document.getElementById('list-title');
const listDescription = document.getElementById('list-description');
const listItems = document.getElementById('list-items');
const listAddButton = document.getElementById('list-add');

let isEditing = false;

const todoList = function(title, description, items) {
    console.log("summertime Chi")
    return {title, description, items};
}

const todoListItem = function(data) {
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
    const data = JSON.parse(window.localStorage.getItem('todoList'))[header];

    //clear all child nodes of each
    while (listItems.childElementCount > 1) {
        listItems.removeChild(listItems.firstChild);
    }

    //add the nodes for each
    listTitle.innerHTML = header;
    listDescription.innerHTML = data.description;
    for (let i = 0; i < data.items.length; i++) {
        // <li class="list-text"><input type="checkbox" /> This is the story of a champion</li>
        const item = todoListItem(data.items[i]).render();
        // listItems.insertBefore(item, listItems.firstChild);
        listItems.appendChild(item);
    }
    listItems.appendChild(listAddButton);


    // <li class="add"><button><i class="fas fa-plus fa-xs"></i> <span id="list-add-text">add item</span></button></li>
    // listItems.appendChild();
}

const renderEdit = function(c = false, t = '', d = '') {
    // <li class="list-edit"><input type="checkbox" /><input type="text"/><input type="date"/></li>


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
        const newRender = todoListItem(newData).create()
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

export {todoList, todoListItem, setupStrikethroughText, setupList};