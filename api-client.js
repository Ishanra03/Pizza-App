//Network call code 
export async function doNetworkCall() {
    try {
        const URL = 'https://gist.githubusercontent.com/Ishanra03/4f9804f12d10ad692d014fba66115ddc/raw/7ca3b3fd7a3f2f3a52769b4a6af26161cd470a5f/pizza.json';
        const response = await fetch(URL);
        console.log("Raw response:", response);
        const object = await response.json();
        console.log("Parsed JSON:", object);
        return object;
    } catch (err) {
        console.log('Some problem in API call', err);
        throw err;
    }
}

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

export default doNetworkCall;
