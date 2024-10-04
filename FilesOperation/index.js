const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'files');
const filePath = `${dirPath}/hello2.txt`;

// Create Files by Code

/*for (i = 0; i < 5; i++) {
  fs.writeFileSync(`${dirPath}/hello${i + 1}.txt`, 'A simple Text file');
}*/

// View File List

/*fs.readdir(dirPath, (err, files) => {
  files.forEach((file) => {
    console.log(file);
  });
});*/

// View the text of the File

/*fs.readFile(filePath, (err, item) => {
  console.log(item);
});*/

/*fs.readFile(filePath, 'utf8', (err, item) => {
  console.log(item);
});*/

// Update the Text of the file add the text at the last of the file

/*fs.appendFile(filePath,' and I have updated by the NodeJS',(err)=>{
  if(!err) console.log('Successfully Updated');
})*/

// Rename the File

/*fs.rename(filePath, `${dirPath}/helloRename.txt`, (err) => {
  if (!err) console.log('File Renamed');
});*/

// Delete the File

// fs.unlinkSync(`${dirPath}/hello5.txt`);
