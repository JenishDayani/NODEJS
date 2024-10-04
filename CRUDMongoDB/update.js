const dbConnect = require('./mongodb');

const updateData = async () => {
  const db = await dbConnect();

  // Update Single Data

  /*const result = await db.updateOne(
    { name: 'Max 1' },
    { $set: { name: 'Max 500600' } }
  );*/

  // Update Multiple Data

  const result = await db.updateMany(
    { brand: 'MicroMax' },
    { $set: { brand: 'Micromax' } }
  );
  if (result.acknowledged) {
    console.log('Data updated successfully');
  }
};

updateData();
