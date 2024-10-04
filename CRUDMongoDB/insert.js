const dbConnect = require('./mongodb');

const insert = async () => {
  const db = await dbConnect();
  // Insert One Data
  /*const result = await db.insertOne({
    name: 'Note 5',
    brand: 'Vivo',
    price: 320,
    category: 'Mobile',
  });*/
  // Insert Many Data
  const result = await db.insertMany([
    {
      name: 'Max 1',
      brand: 'MicroMax',
      price: 120,
      category: 'Mobile',
    },
    {
      name: 'Max 2',
      brand: 'MicroMax',
      price: 220,
      category: 'Mobile',
    },
    {
      name: 'Max 3',
      brand: 'MicroMax',
      price: 320,
      category: 'Mobile',
    },
    {
      name: 'Max 4',
      brand: 'MicroMax',
      price: 420,
      category: 'Mobile',
    },
  ]);
  if (result.acknowledged) {
    console.log('Data inserted successfully');
  }
};

insert();
