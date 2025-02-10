const fs = require("fs")
const path = require("path")


const dataType = ['string' , 'number' , 'boolean']
const fileName  = 'collection.json'
const dataFile = 'data.json'

//TODO: !! Add a decodeing from BSON to JSON on creation
const start = () => {
    try{
        fs.writeFileSync(path.join(__dirname , "Data", fileName) , "{}" )
        fs.writeFileSync(path.join(__dirname , "Data", dataFile) , "{}" )
        console.log("created")
    } catch(err) {
        console.log("failed" + err.message)
        throw new Error("Failed to create files" + err.message)
    }
}

//TODO: !!read and then right to append datamodel --DONE😊
//TODO: !!add unique and privary keys with required 
//IMPORTANT: !!Always use Try-Catch to call This function 
const create = (obj) => {
    if(Object.keys(obj).length > 1) {throw new Error('Invalid declaratin format')}
    const name = Object.keys(obj)
    Object.entries(obj[name]).forEach(([key , value]) => {
        if(!dataType.includes(value)) {
            throw new Error('data type mentioned is invalid')
        }
    })
    try {
        const Documents = JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , fileName) , 'utf8'))
        Documents[name] = obj[name]
        fs.writeFileSync(path.join(__dirname , 'Data' , fileName) , JSON.stringify(Documents, null, 2))
        console.log("wrote")
    } catch(err) {
        throw new Error('Error Reading The document : ' + err.message)
    }
}

//TODO: !!Test this manually before pushing to main -
//IMPORTANT: !!Always use try-catch when using this function
const addData = (args , obj) => {
    try {
        const template = JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , fileName) , 'utf8'))
        const schema = template[args]
        if(schema == undefined) {
            throw new Error(`No such collection exists nammed ${args} in the db`)
        }
        Object.keys(schema).forEach(key => {
            if(schema[key] != typeof obj[key]) {
                throw new Error(`Type mis-match on Key ${key}`)
            }
        })
        if(Object.keys(schema).length != Object.keys(obj).length) {
            throw new Error(`Too many arguments, Data doesn't match schema.`)
        }
        const collectionValue = JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , dataFile) , 'utf8'))
        if(collectionValue[args] === undefined) {
            collectionValue[args] = {}
        }
        collectionValue[args][Date.now()+ Math.random().toString().substring(2 , 7)] = obj
        fs.writeFileSync(path.join(__dirname , 'Data' , dataFile) , JSON.stringify(collectionValue , null , 2))
        console.log("data Wrote")
    } catch (err) {
        throw new Error('unable to write the data' + err.message)
    }
}

const readSchema = (args) => {
    try {
        const template = JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , fileName) , 'utf8'))
        const schema = template[args]
        if(schema == undefined) {
            throw new Error(`No such collection exists nammed ${args} in the db`)
        }
        console.log(schema)
    } catch(err) {
        console.log(`can't read schema : ` + err.message)
    } 
}

const readData = (args) => {
    try {
        const allData = JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , dataFile) , 'utf8'))
        const data = allData[args]
        if(data == undefined) {
            throw new Error(`No such collection exists nammed ${args} in the db`)
        }
        console.log(data)
    } catch (err) {
        console.log(`unable to read data : ` + err.message)
    }
}

const searchData = () => {

}

const deleteData = () => {

}

//TODO: Before deletion of file convert all files to be BSON
const deleteFile = () => {
    try {
        fs.unlinkSync(path.join(__dirname, "Data", fileName))
        fs.unlinkSync(path.join(__dirname, "Data", dataFile))
        console.log("File deleted successfully")
    } catch (err) {
        console.log("Error deleting file:", err.message)
        throw new Error("Failed to stop!!" + err.message)
    }    
}


const main = () => {
    //  start()
    
    //  create({'user': {
    //     name: "string",
    //     age: "number",
    //     password: "string"
    // }})

    // addData('user' , {
    //     name: "vishal",
    //     // email: "vishal@gmail.com",
    //     age: 20,
    //     password: "123"
    // })
    // readSchema('user')
    // readData('user')
     deleteFile()
}    

main()