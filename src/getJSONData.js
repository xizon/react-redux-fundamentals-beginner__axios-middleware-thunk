
import axios from 'axios';

const getJSONData = async (name) => {

    // Wait for all the `httpRequest` functions, if they are resolved, run 'store.dispatch()'
    const httpRequest = () => {
      return new Promise( (resolve,reject) => {
        axios({
          timeout: 15000,
          method: 'get',
          url: `https://restcountries.com/v2/name/${name}`,
          responseType: 'json'
        }).then(function (response) {
          resolve( response );
        })
        .catch(function (error) {
          console.log( error );
        });
      });
    };
  
    const getApiData = await httpRequest();
    return getApiData.data;
  
}

export default getJSONData;
