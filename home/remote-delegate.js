import { importDelegatedModule } from '@module-federation/utilities';
const getChapyConfig = () => {
  const url = `https://gateway.chotot.org/v1/public/chapy-pro/conf?app_id=web`;
  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        return resolve({chapy: result, portVersion: 3000});
      })
      .catch(() => {
        return resolve({chapy: "error", portVersion: 3000});
      });
  });
}

module.exports = getChapyConfig().then(({chapy, portVersion}) => {
    const currentRequest = new URLSearchParams(__resourceQuery).get('remote');
    //Splitting the currentRequest using "@" as the separator and assigning the values to "global" and "url"
    let [global, url] = currentRequest.split('@');
    url = url.replace('3002', portVersion)
    
    //importing the delegated module
    return importDelegatedModule({
      global,
      url,
    })
      .then((remote) => {
        //resolving the remote
        return remote
      })
      .catch((err) => {
        //catching the error and rejecting it
        console.log(err)
        return err;
      });
  });




// module.exports = new Promise((resolve, reject) => {
//   //Logging the delegate being called for the resourceQuery from the webpack runtime ID
//   console.log('Delegate being called for', __resourceQuery, 'from', __webpack_runtime_id__);
//   //Getting the current request by getting the 'remote' query parameter using URLSearchParams
//   const currentRequest = new URLSearchParams(__resourceQuery).get('remote');
//   //Splitting the currentRequest using "@" as the separator and assigning the values to "global" and "url"
//   let [global, url] = currentRequest.split('@');
//   url = url.replace('3000', 3000)

//   //importing the delegated module
//   importDelegatedModule({
//     global,
//     url,
//   })
//     .then(async (remote) => {
//       //resolving the remote
//       resolve(remote)
//     })
//     .catch((err) => {
//       //catching the error and rejecting it
//       reject(err);
//     });
// });




// module.exports = new Promise((resolve, reject) => {
//   //Logging the delegate being called for the resourceQuery from the webpack runtime ID
//   console.log('Delegate being called for', __resourceQuery, 'from', __webpack_runtime_id__);
//   //Getting the current request by getting the 'remote' query parameter using URLSearchParams
//   const currentRequest = new URLSearchParams(__resourceQuery).get('remote');
//   //Splitting the currentRequest using "@" as the separator and assigning the values to "global" and "url"
//   const [global, url] = currentRequest.split('@');
//   if(global === 'testPOS'){
//     getVersion().then(({ portVersion }) => {
//       const newUrl = url.replace('3000', portVersion)
//       console.log("newUrl: ", newUrl)

//       //importing the delegated module
//       importDelegatedModule({
//         global,
//         newUrl,
//       })
//         .then(async (remote) => {
//           //resolving the remote
//           resolve(remote)
//         })
//         .catch((err) => {
//           //catching the error and rejecting it
//           reject(err);
//         });
//         })

//   } else {
//   //importing the delegated module
//   importDelegatedModule({
//     global,
//     url,
//   })
//     .then(async (remote) => {
//       //resolving the remote
//       resolve(remote)
//     })
//     .catch((err) => {
//       //catching the error and rejecting it
//       reject(err);
//     });
//   }
// });

