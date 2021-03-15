import axios from "axios";

var URL = "https://restcountries.eu/rest/v2";

function ApiSearch(){
    return new Promise((resolve) => {
        axios
          .get(URL)
          .then(function (response) {
              const data = response.data;
  
              try {
                if (data && data.data && data.data.error.message) {
                  console.log(data);
                  throw new Error();
                }
                
                resolve(data);
  
              } catch (err) {
                console.error(err);
              }
          })
          .catch(function (error) {
            console.log(error);
          })
    });
  
}

export default ApiSearch;