const request = require('request');
const fs = require('fs');
if (process.argv.length === 4) {
  const url = process.argv[2];
  const localFilePath = process.argv[3];
  
  request(url, (err, status, body) => {
    if (!err) {
      if (body && status.statusCode === 200) {
        fs.writeFile(localFilePath, body, (err) => {
          if (!err) {
            fs.stat(localFilePath, (err, stats) => {
              if (!err) {
                console.log(`Fetched & saved ${stats.size} bytes to ${localFilePath} `);
              } else {
                console.log(`Could not determine the file size.\t ${err}`);
              }
            });
          } else {
            console.log("File Path is Invalid\t", err);
          }
        });
      } else {
        console.log("Url is Invalid");
        console.log(`Error Code: ${status.statusCode} \r\n Staus: \r\n ${status} \r\n Body: \r\n ${body}`);
      }
    } else {
      console.log("File Already Exists", err);
    }
  });
} else {
  console.log("Please enter two arguments only.");
}