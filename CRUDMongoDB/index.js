const dbConnect = require('./mongodb');

const main = async () => {
  let data = await dbConnect();
  let response = await data.find({}).toArray();
  console.log(response);
};

main();
