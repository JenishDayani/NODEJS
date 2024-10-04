const dbConnect = require('./mongodb');

const deleteData = async () => {
  const data = await dbConnect();

  // const result = await data.deleteOne({ name: 'Max 4' }); // Delete One Data
  const result = await data.deleteMany({ brand: 'Micromax' }); // Delete Multiple Data
  if (result.acknowledged) {
    console.log('Data Deleted successfully');
  }
};

deleteData();
