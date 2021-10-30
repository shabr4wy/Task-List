// converting input content into list item
function addToList() {
    const list = document.querySelector('.list');
    const input = document.querySelector('#textfeild__input');
    // validate input
    if (input.value.length >= 1) {

        // create paragraph element as list item
        const listItem = document.createElement('p');
        listItem.className = 'list__item';
        listItem.innerHTML  = input.value;

        // biuld 'delete list Btn' nested in the list item
        // listBtn means the button that is inside each list item, not inside the entire list
        // FOR MORE SUSTINABILITY https://scalablecss.com/bem-nesting-grandchild-elements/
        const listBtn = document.createElement('button');
        listBtn.innerHTML = "x";
        listBtn.className = "btn list__btn"
        listBtn.addEventListener('click', () => {
            listBtn.parentElement.remove();
        });
        listItem.appendChild(listBtn);
        
        // add the list item to the list container
        list.appendChild(listItem);
        input.value = '';
    } else {
        alert ('Field is empty, You must add task first!')
    }
}


// biuld clear all listBtn
function clearALL() {
    const list = document.querySelector('.list');
    // check if there is any list item todelete
    if (list.innerHTML.length >= 1){
        list.innerHTML = '';
    }else {
        alert ('You have no tasks yet to delete')
    }
}