const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 4000;

function getDateTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return [
    `${day}-${month}-${year}-${hours}:${minutes}:${seconds}`,
    `${hours}:${minutes}:${seconds}`,
  ];
}

// const folderName = './random';

//To create directory by using mkdir, before that we can check if dir name is present or not
// fs.access(folderName, (err) => {
//   if (err) {
//     fs.mkdir(folderName, (err) => {
//       if (err) {
//         console.log('Error in directory creation', err);
//       } else {
//         const fileName = getDateTime();
//         const content = 'Thec ureent timestamp is ' + fileName;
//         fs.writeFile(`./${folderName}/${fileName}.txt`, content, (err, data) => {
//           if (err) {
//             console.log('Error in file creation', err);
//           } else {
//             console.log('Created', content);
//           }
//         });
//       }
//     });
//   } else {
//     console.log('Folder name is already used');
//   }
// });

//Default route and other route details
app.get('/', (req, res) => {
  res.send(
    '<p>The routes are available to use.</p><p>/create => To create a filename and content using date and time.<p>/read => To read all the filenames in the directory.</p>'
  );
});

//To create a filename and content using date and time
app.get('/create', (req, res) => {
  //getDateTime => returns [date and time] i.e 12-03-2024-21:22:29
  const [fileName, time] = getDateTime();
  const content = 'The curent timestamp is ' + time;
  fs.writeFile(`./random/${fileName}.txt`, content, (err) => {
    if (err) {
      console.log('Error in file creation', err);
      res.send('Error while creating a new file, check your logs');
    } else {
      console.log('Created', content);
      res.send('Created a new file and file name is ' + fileName + '.txt');
    }
  });
});

//To read all the filenames in the particular directory
app.get('/read', (req, res) => {
  const Extension = '.txt';
  fs.readdir('./random', (err, files) => {
    if (err) {
      console.log('Error in reading files', err);
      res.send('Error while reading files, check your logs');
    } else {
      //By using path module and extname method, we can filter which extension we want
      const targetFiles = files.filter(
        (file) => path.extname(file).toLowerCase() === Extension
      );
      res.send(`The text file names are ${targetFiles?.toString()}.`);
    }
  });
});

app.listen(PORT, () => {
  console.log('Server is starting on port', PORT);
});
