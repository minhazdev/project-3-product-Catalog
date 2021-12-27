const formElm = document.querySelector('form');
const nameInputElm = document.querySelector('.product-name');
const priceInputElm = document.querySelector('.product-price');
const listGroupElm = document.querySelector('.list-group');
const filterElm = document.querySelector('#filter');

//tracking item
let products = getDataFromLocalStorage();

//local storage
//let productData = getDataFromLocalStorage();
function getDataFromLocalStorage() {
    let items = '';
    if(localStorage.getItem('peroductItems') === null) {
        items = [];
    } else{
        items = JSON.parse(localStorage.getItem('productItems'));
    }
    return items;
    }
    
    function saveDataToLocalStorage(item){
        let items = '';
        if(localStorage.getItem('productItems') === null) {
            items = [];
            items.push(item);
            localStorage.setItem('productItems',JSON.stringify(items));
    
        }
         else {
            items = JSON.parse(localStorage.getItem('productItems'));
            items.push(item);
            localStorage.setItem('productItems',JSON.stringify(items));
         }
     }
    
     function  deleteItemsFromLocalStorage(id) {
        const items = JSON.parse(localStorage.getItem('productItems'));
        let productsAfterDelete = items.filter((product) => 
             product.id !== id);

       localStorage.setItem('productItems',JSON.stringify(productsAfterDelete)); 
        if(productsAfterDelete.length === 0) location.reload(); 
           //// items = [];
       
      ////localStorage.setItem('productItems',JSON.stringify(result));
      ////if(result.length === 0) location.reload();

     };


formElm.addEventListener('submit' , (evt) => {
    ////prevent default action (browser reloading)
     ////console.log('triggerd')
    evt.preventDefault();
    ////receiving input
    const { nameInput, priceInput } = receiveInputs();

    ////validate input
   const isError = validateInput(nameInput, priceInput);
   if (!isError) {
       //alert('please provide valid input')
      // return
  
   
      //add item to data store
       //generate item
       let id = products.length
       const data = {
        id,
        nameInput,
        priceInput,
       };
       products.push(data);
       //database
       saveDataToLocalStorage(data);
       //add item to the UI
       addItemToUI(id,nameInput, priceInput);
       console.log(products)
       //reset input
       resetInput();
    }
});
    filterElm.addEventListener('keyup', (evt) => {
        //filter depend on this value
   // console.log(evt.target.value)

      const filterValue = evt.target.value;
      const filteredArr = products.filter((product)=>
      product.name.includes(filterValue)
      );
      //console.log(result)
       showAllItemToUI(filteredArr);
      //show item to UI
    });

   function showAllItemToUI(items) {
       listGroupElm.innerHTML = '';
       items.forEach((item) => {
        const listElm = `<li class="list-group-item item-${item.id} collection-item">
        <strong>${item.name}</strong>- <span class="price">$${item.price}</span>
        <i class="fa fa-trash delete-item float-right"></i>
       </li>`;
listGroupElm.insertAdjacentHTML('afterbegin',listElm);

  });
   
   //console.log(isError)
    //console.log(inputValues)
    //console.log(nameInputElm.vlue,priceInputElm.value)
    //console.log(evt)
   }

   //deleting item (event delegation)
listGroupElm.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('delete-item')){
    const id = getItemID(evt.target)
    //delete item from UI
    removeItemFromUI(id);
    
  removeItemFromDataStore(id);
    //delete item
    // console.log('delete item')
    // console.log(evt)
    }
});
//Remove from database function
function removeItemFromDataStore(id) {
const produtsAfterDelete = products.filter((product) => 
  product.id !== id);
  products = productsAfterDelete;

  }
//delete function
  function getItemID(elm) {
    const liElm = elm.parentElement;
    return Number(liElm.classList[1].split('-')[1]);
    //console.log(elm)
 }
//Reset Input function
   function resetInput() {
   nameInputElm.value = '';
   priceInputElm.value = '';
}
//add input in ui function
function addItemToUI(id,name, price) {
   const listElm = `<li class="list-group-item item-${id} collection-item">
            <strong>${name}</strong>- <span class="price">$${price}</span>
            <i class="fa fa-trash delete-item float-right"></i>
           </li>`;
 listGroupElm.insertAdjacentHTML('afterbegin',listElm);
}

//validation function
function validateInput(name,price) {
    let isError = false;
    if (!name || name.length < 4) {
        isError = true;
        //console.log('invalid input')
    }
    if (!price || Number(price) <= 0) {
        isError = true;
       // console.log('invalid input')
    }
    return isError;
}

//// function removeItemFromUI(id) {
// //    document.querySelector(`.item-${id}`).remove();
//   //   deleteItemsFromLocalStorage(id);
//   // };

function receiveInputs() {
   //// console.log(nameInputElm.value , priceInputElm.value)
   const nameInput = nameInputElm.value;
   const priceInput = priceInputElm.value;
   return {
       nameInput,
       priceInput,
   };
   
}

