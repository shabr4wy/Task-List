// global scopes
const list = document.querySelector('.list');
const input = document.querySelector('#textfeild__input');

// biuld input functionality to add items
input.addEventListener ('keydown', (e) => {
    if (e.key === 'Enter'){
        addToList();
    }
});

// converting input content into list item
const addBtn = document.querySelector('.textfield__button');
function addToList() {
    // validate input
    if (input.value.length >= 1) {

        // create list item
        const listItem = document.createElement('li');
        listItem.className = 'list__item list__item--animation';
        listItem.innerHTML  = input.value;

        requestAnimationFrame (() => {
            listItem.classList.remove("list__item--animation")
        })

        // biuld 'list Btn' to delete list item ... functionality added in lines 37-42 
        const listBtn = document.createElement('button');
        listBtn.innerHTML = "x";
        listBtn.className = "btn list__btn"
        listItem.appendChild(listBtn);
        
        // add the list item to the list container
        list.appendChild(listItem);
        input.value = '';
    } else {
        alert ('Field is empty, You must add task first!')
    }
}

// add listBtn functoionality
list.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('list__item')){
        e.target.parentElement.classList.add('list__item--animation')

        list.addEventListener('transitionend', (e) => {
            if (e.target.classList.contains('list__item--animation')){
                e.target.remove();
            }
        });
    }
});

// add line through decoration on finished tasks
list.addEventListener('click', (e) => {
    if (e.target.classList.contains ('list__item')){
        e.target.classList.toggle('list__item--done');
    } 
});

// biuld clear all listBtn functionality
function clearALL() {
    // check if there is any list item todelete
    if (list.innerHTML.length >= 1){

        // calculate list height relative to list items
        const listHeight = document.querySelectorAll('.list__item').length * 45;

        // style two classes to animate between
        //first
        const cssRulesNum = document.styleSheets[0].cssRules.length;
        document.styleSheets[0].insertRule(`.list--animation1
            { height: ${listHeight}px; transform: scale(1); transition: transform .5s, height 1s`, cssRulesNum);
        list.classList.add('list--animation1');
        // second
        document.styleSheets[0].insertRule( `.list--animation2
            {height: 0px; transform: scale(0);}`,cssRulesNum +1);
        requestAnimationFrame (() => {
            list.classList.add('list--animation2');
        })

        // remove the 1- two added classes. 2- all list items. when animation done
        setTimeout(() => {
            list.classList.remove('list--animation2', 'list--animation1');
            list.innerHTML = '';
        }, 1000);
    }else {
        alert ('You have no tasks yet to delete')
    }
}