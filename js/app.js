// global scopes
const list = document.querySelector('.list');
const input = document.querySelector('#textfeild__input');
const addBtn = document.querySelector('.textfield__button');
let arrayOfItems = [];

// check if local storage data exists
if (localStorage.getItem("items")) {
    arrayOfItems = JSON.parse(localStorage.getItem("items"));

    // get data
    getitemsFromLocalStorage();
}


// biuld input functionality to add items
input.addEventListener ('keydown', (e) => {
    if (e.key === 'Enter' && input.value !== ''){
        addItemToArray();
    } else if (e.key === 'Enter' && input.value === '') {
        alert ('please, Type your task first');
    }
});

// biuld add btn functionality to add items
addBtn.addEventListener('click', () => {
    if(input.value !== '') {
        addItemToArray();
    } else {
        alert ('please, Type your task first')
    }
});

// store items in the array 
function addItemToArray() {
    // item Data
    const item = {
      id: Date.now(),
      text: input.value,
      done: false,
    };
    // Push item To Array Of items
    arrayOfItems.push(item);
    // Add items To Page
    addToList(arrayOfItems, true);
    // Add items To Local Storage
    addItemsToLocalStorageFrom(arrayOfItems);
  }

// view and add items to the list
// secend parameter is used in line 68: 
// if the item added: 1- from the user then animate last item => true line 45
//                    2- from local storage don't animate last item => false line 179
function addToList(arrayOfItems, animateLastItem) {
    // empty the items list to not repeating all items every time the function excutes
    list.innerHTML = "";

    arrayOfItems.forEach((elem,i)=> {
        // create list item
        const listItem = document.createElement('li');
        listItem.className = 'list__item';
        // check done value (needed specifically on reload 'local storage')
        if (elem.done) {
            listItem.classList.add('list__item--done');
        }

        // to animate the one added item
        if(arrayOfItems.indexOf(elem) === arrayOfItems.length-1 && animateLastItem === true) {
            listItem.classList.add('list__item--animation');
            requestAnimationFrame (() => {
                listItem.classList.remove("list__item--animation");
            });
        }

        // token every item
        listItem.setAttribute('data-id', elem.id);
        listItem.innerHTML  = elem.text;

        // biuld 'list Btn' to delete list item
        const listBtn = document.createElement('button');
        listBtn.innerHTML = "x";
        listBtn.className = "btn list__btn"
        listItem.appendChild(listBtn);
        
        // add the list item to the list container
        list.appendChild(listItem);
        input.value = '';
    });
}

// add listBtn functoionality
list.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('list__item')){
        // animate removed item
        e.target.parentElement.classList.add('list__item--animation')

        list.addEventListener('transitionend', (e) => {
            if (e.target.classList.contains('list__item--animation')){
                e.target.remove();
                // update local storage
                deleteItemFromLocalStorage(e.target.getAttribute('data-id'));
            }
        });
    }
});

// add done status on finished items
list.addEventListener('click', (e) => {
    if (e.target.classList.contains ('list__item')){
        // update local storage
        toggleDoneStatus(e.target.getAttribute('data-id'));
        // add done status
        e.target.classList.toggle('list__item--done');
    } 
});

// biuld clear all listBtn functionality
function clearALL () {
    const clearAllBtn = document.querySelector('.clearAll');
    // check if there is any list item todelete
    if (list.innerHTML.length >= 1){

        // the code (lines 126-152) is to create animation when removing all list items.
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

        // remove all data from the array in both local storage and the app
        window.localStorage.removeItem('items');
        arrayOfItems = [];
    }else {
        alert ('You have no items yet to delete');
    }
}

// add arrayOfItems to local storage
function addItemsToLocalStorageFrom(arrayOfItems) {
    window.localStorage.setItem("items", JSON.stringify(arrayOfItems));
}

// get arrayOfItems from storage
function getitemsFromLocalStorage () {
    let data = window.localStorage.getItem("items");
    if (data) {
        let arrayOfItems = JSON.parse(data);
        addToList(arrayOfItems, false);
    }
}

// sync done value
function toggleDoneStatus(itemId) {
    arrayOfItems.forEach((elem) => {
        if (elem.id == itemId) {
            elem.done == false ? (elem.done = true) : (elem.done = false);
        }
    })
    // update local storage
    addItemsToLocalStorageFrom(arrayOfItems);
}

// sync all items if any deleted
function deleteItemFromLocalStorage (itemId) {
    // excluding the deleted item from the array
    arrayOfItems = arrayOfItems.filter((item) => item.id != itemId);
    // update local storage
    addItemsToLocalStorageFrom(arrayOfItems);
}