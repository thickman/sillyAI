async function processAllUsers(){
  const sql = 'SELECT id FROM users';
  const users = await db.query(sql, []);
  for (const user from users){
    await processUser(user.id)
  }
}




function processAllUsers2 (){
  const sql = 'SELECT id FROM users';
    return db.query(sql, [])
      .then(users => users.reduce(
        (lastPromise, user) => {
          lastPromise.then(() => processUser(user.id)
        lastPromise.push(processUser(user.id));
      }, [])


}
