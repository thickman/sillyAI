const fetch = require('node-fetch')


async function fetchAvatarUrl(userId){
  response = await fetch(`https://catappapi.herokuapp.com/users/${userId}`);
  data = await response.json();

  data
  response
  return data.imageUrl;
}


/*
function fetchAvatarUrl(userId){
  return fetch(`https://catappapi.herokuapp.com/users/${userId}`)
    .then(response => response.json())
    .then(data => data.imageUrl)
}
*/

const result = fetchAvatarUrl(123);
result
