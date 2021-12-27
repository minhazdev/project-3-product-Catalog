//storage
//database 
     //getting from server or serverless
//local storage
  //data store in local

  //setting and getting item from local Storage

  localStorage.setItem('firstName','minhaz');
  localStorage.setItem('lastName','islam');
  const person = {
      firstName:'minhaz',
      lastName:'islam'
    };

  localStorage.setItem('person',JSON.stringify(person));
  console.log(JSON.parse(localStorage.getItem('person',person)));
  
  localStorage.setItem('age',20);

console.log(localStorage.getItem('firstName'))
console.log(typeof(localStorage.getItem('age')))
//clearing local storae
localStorage.clear();
