// converting input content into list item
function addToList() {
    const list = document.querySelector('.List');
    const inputContent = document.querySelector('#textfeild__input');
    // validate input
    if (inputContent.value.length >= 1) {
        const listItem = document.createElement('p');
        listItem.className = 'list__item';
        listItem.innerHTML  = inputContent.value;
        list.appendChild(listItem);
        inputContent.value = '';
    } else {
        alert ('Field is empty, You must add task first!')
    }
}

// biuld clear all btn
function clearALL() {
    const list = document.querySelector('.List');
    // check if there is any list item to delete
    if (list.innerHTML.length >= 1){
        list.innerHTML = '';
    }else {
        alert ('You have no tasks yet to delete')
    }
}