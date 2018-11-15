require("node-fetch")

export function sandboxTest(){
  const wordToLookUp = "player of games";
  const url = "https://en.wiktionary.org/api/rest_v1/"
  const query = "data/citation/mediawiki";
  const endpoint = url + query + "/" + wordToLookUp;

  const result =
    fetch(endpoint, {
      headers: {
        'Accept-Language': 'EN',
        'Accept': 'application/json charset=utf-8'
      }
    })
    .then(response => response.json())
    .then(callbackFunction);
}

export function callbackFunction(response){
  console.log("response: \n"+JSON.stringify(response, null, 3));
  const printTypes = response.map(data => data.itemType);
  console.log("types: "+printTypes);
}
