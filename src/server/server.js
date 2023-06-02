var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app = express()
const port = 3001
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/getFiles', (req, res) => {
  let fileslist = fs.readdirSync('./upload/')
  let files = []
  fileslist.forEach(e => {
    files.push({ name: e })
  });
  res.header("content-type", "application/json")
  console.log(files);
  res.send({ files })
})

// let upload = multer({
//   dest: './upload/'
// });
// let type = upload.single('photo');


// app.post('/api/send', type, function (req, res) {
//   console.log(req.file);
//   let temp_file = req.file.path;
//   let name = req.file.originalname
//   let target_file = './upload/' + req.file.filename.substr(0, 3) + '_' + name;
//   fs.readFile(temp_file, (err, data) => {
//     if (err) throw err
//     fs.unlink(temp_file, (err) => {
//       if (err) throw err
//       fs.appendFile(target_file, data, (err) => {
//         res.send('wyslano cos');
//       })
//     });
//   });
// })

// // isFileValid = (file) => {
// //     const type = file.type.split("/").pop();
// //     const validTypes = ["jpg", "jpeg", "png"];
// //     if (validTypes.indexOf(type) === -1) {
// //       return false;
// //     }
// //     return true;
// //   };

// // app.post('/api/send', async(req,res) => {
// //     const uploadFolder = path.join(__dirname, 'upload')
// //     const form = new formidable.IncomingForm();

// //     form.parse(req, async(err, fields, files) => {
// //         form.multiples = true
// //         form.maxFileSize = 50*1024*1024 //5MB
// //         form.uploadDir = uploadFolder

// //         if (err) throw err
// //         if (!files.myFile.length) {
// //             const file = files.myFile
// //             const isValid = isFileValid(file)
// //             const fileName = encodeURIComponent(file.name.replace(/\s/g,'-'))
// //             if (!isValid) {
// //                 res.status(400)
// //             }
// //             try {
// //                 fs.renameSync(file.path, join(uploadFolder, fileName))
// //             } catch (err) {
// //                 console.log(err);
// //             }

// //             try {
// //                 const newFile = await File.create({
// //                     name: `files/${fileName}`
// //                 })
// //             } catch (err) {
// //                 throw err
// //             }
// //         }
// //         else {
// //             files.myFile.forEach(async file => {
// //                 const isValid = isFileValid(file)
// //                 const fileName = encodeURIComponent(file.name.replace(/\s/g,'-'))
// //                 if (!isValid) {
// //                     res.status(400)
// //                 }
// //                 try {
// //                     fs.renameSync(file.path, join(uploadFolder, fileName))
// //                 } catch (err) {
// //                     console.log(err);
// //                 }

// //                 try {
// //                     const newFile = await File.create({
// //                         name: `files/${fileName}`
// //                     })
// //                 } catch (err) {
// //                     throw err
// //                 }
// //             });
// //         }
// //     })
// // })


app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})