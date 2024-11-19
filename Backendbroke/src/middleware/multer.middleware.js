import multer from 'multer'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname)  // it not profetional because multi file is at a time with same name
    }
  })
  
  export const upload = multer({
    storage,
 })

