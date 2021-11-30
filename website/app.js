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
function clearALL () {
    const clearAllBtn = document.querySelector('.clearAll');
    // check if there is any list item todelete
    if (list.innerHTML.length >= 1){

        // following code (line 70-96) is to create animation when removing all list items.
        // for sake of it, animation added to both clear ALL btn and list.

        // calculate list height
        const listHeight = document.querySelector('.list').offsetHeight;
       
        // create two classes to animate claerAll btn between
        const cssRulesNum = document.styleSheets[0].cssRules.length;
        //first
        document.styleSheets[0].insertRule( `.clearAll--animation1 {
            transform: translateY(0);
            transition: transform .6s ease-in ;
        }`,cssRulesNum);
            // animate clear All btn - phase 1 
            clearAllBtn.classList.add('clearAll--animation1');

        // second
        document.styleSheets[0].insertRule(`.clearAll--animation2 {
            transform: translateY(-${listHeight}px);
        }`, cssRulesNum + 1);

        // animate list - phase 1
        list.classList.add('list--delete--animation1');
            
        requestAnimationFrame (() => {
            // animate list - phase 2
            list.classList.add('list--delete--animation2');
            // animate clear All btn - phase 2 
            clearAllBtn.classList.add('clearAll--animation2');
        })

        // remove all classes added to both list and clear All btn when animation is done
        setTimeout(() => {
            list.classList.remove('list--delete--animation2', 'list--delete--animation1');
            clearAllBtn.classList.remove('clearAll--animation1','clearAll--animation2');
            list.innerHTML = '';
        }, 1000);
    }else {
        alert ('You have no tasks yet to delete');
    }
}
