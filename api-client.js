// scripts/api-client.js

// Network call code 
export async function doNetworkCall() {
    try {
        //  Local JSON file path (relative to index.html)
       const url = 'scripts/pizza.json';


        const response = await fetch(url);
        console.log("Raw response:", response);

        const object = await response.json(); // Parse JSON data
        console.log("Parsed JSON:", object);

        return object;
    } catch (err) {
        console.log('Some problem in API call', err);
        throw err;
    }
}

export default doNetworkCall;


//     const URL='https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json';
// const promise= fetch(URL);
// console.log('Promise is',promise);

// promise.then(function(response){         //CallBack Func
//   console.log('Response is',response);

//  const promise2 =  response.json();//Deserialization(json to object)

//  promise2.then(function(data){           //CallBack Func
// console.log('Data is',data);
//  })
//  .catch(function(e){
// console.log('JSON parse error',e);
//  })

// }).catch(function(err){
//   console.log('Error',err);
// });

// console.log('Good Bye');
