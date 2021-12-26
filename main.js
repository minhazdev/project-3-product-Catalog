const formElm = document.querySelector('form')
const nameInputElm = document.querySelector('.product-name')
const priceInputElm = document.querySelector('.product-price')
const listGroupElm = document.querySelector('.list-group')
const filterElm = document.querySelector('#filter')

//tracking item
let products = [
    {
        id:0,
        name:'potato',
        price: 30
    },
    {
        id:1,
        name:'rice',
        price: 40
    },
]


formElm.addEventListener('submit' , (evt) =>{
    //prevent default action (browser reloading)
     //console.log('triggerd')
    evt.preventDefault()
    //receiving input
    const {nameInput, priceInput} = receiveInputs()
    //validate input
   const isError = validateInput(nameInput, priceInput)
   if (isError){
       alert('please provide valid input')
       return
   }
   

       //add item to data store
       //generate item
       const id = products.length
       products.push({
           id:id,
           name:nameInput,
           price: priceInput,
       })

       //add item to the UI
       addItemToUI(id,nameInput, priceInput)
       console.log(products)
       //reset input
       resetInput()

   
   //console.log(isError)
    //console.log(inputValues)
    //console.log(nameInputElm.vlue,priceInputElm.value)
    //console.log(evt)
})

function resetInput() {
 nameInputElm.value = ''
 priceInputElm.value = ''
}

//deleting item (event delegation)
listGroupElm.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('delete-item')){
    const id = getItemID(evt.target)
    //delete item from UI
    removeItemFromUI(id)
    
    removeItemFromDataStore(id)
    //delete item
    // console.log('delete item')
    // console.log(evt)
    }
})

function removeItemFromDataStore(id) {
const produtsAfterDelete = products.filter(product => product.id !== id)
products = produtsAfterDelete
}

function removeItemFromUI(id) {
    document.querySelector(`.item-${id}`).remove()
}

function getItemID(elm) {
    const liElm = elm.parentElement
    return Number(liElm.classList[1].split('-')[1])

    //console.log(elm)

}


function addItemToUI(id,name, price) {
    //generate id
   const listElm = `<li class="list-group-item item-${id} collection-item">
            <strong>${name}</strong>- <span class="price">$${price}</span>
            <i class="fa fa-trash delete-item float-right"></i>
           </li>`
 listGroupElm.insertAdjacentHTML('afterbegin',listElm)
}

//single responsibility principle

function validateInput(name,price) {
    let isError = false
    if (!name || name.length < 5) {
        isError = true
        //console.log('invalid input')
    }
    if (!price || Number(price) <= 0) {
        isError = true
       // console.log('invalid input')

    }
    return isError
}

function receiveInputs() {
   //// console.log(nameInputElm.value , priceInputElm.value)
   const nameInput = nameInputElm.value
   const priceInput = priceInputElm.value
   return {
       nameInput,
       priceInput,
   }
   
}


