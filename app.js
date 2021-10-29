// converting input content into list item
function addToList() {
    const list = document.querySelector('.List');
    const inputContent = document.querySelector('#textfeild__input');
    // validate input
    if (inputContent.value.length >= 1) {

        // crreate paragraph element as list item
        const listParagrapgh = document.createElement('p');
        listParagrapgh.className = 'list__paragrapgh';
        listParagrapgh.innerHTML  = inputContent.value;

        // biuld delete btn nested in the list item
        const btn = document.createElement('button');
        btn.innerHTML = "x";
        btn.className = "list__paragrapgh__btn"
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
        });
        listParagrapgh.appendChild(btn);
        
        // add the list item to the list container
        list.appendChild(listParagrapgh);
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