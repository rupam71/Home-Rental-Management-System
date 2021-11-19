const multer = require('multer')

const storage = multer.memoryStorage()

const  upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000 //1MB = One Million  
    },
    fileFilter(req, file, cb){
         if(!file.originalname.endsWith('.jpg' )
         && !file.originalname.endsWith('jpeg' )
         && !file.originalname.endsWith('JPEG' )
         && !file.originalname.endsWith('.png' )
         ){
            cb(new Error('File Must Be Image'))
         }
        
         cb(undefined,true)

        // cb(new Error('File Must Be PDF'))
        // cb(undefined,true)
        // cb(undefined, false)
       
    }
})

module.exports =  upload