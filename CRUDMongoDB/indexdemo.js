const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const database = 'e_comm';
const dbConnect = require('./mongodb');

//Simple Way

/*async function getData() {
  let result = await client.connect();
  let db = result.db(database);
  let collection = db.collection('products');
  let response = await collection.find({}).toArray();
  console.log(response);
}

console.log(getData());*/

// Complex Way

/*async function dbConnect() {
  let result = await client.connect();
  let db = result.db(database);
  return db.collection('products');
}

dbConnect().then((res) => {
  res
    .find({})
    .toArray()
    .then((data) => {
      console.log(data);
    });
});*/

// Professional Way

/*async function dbConnect() {
  let result = await client.connect();
  let db = result.db(database);
  return db.collection('products');
}

const main = async () => {
  let data = await dbConnect();
  let response = await data.find({}).toArray();
  console.log(response);
};

main();*/