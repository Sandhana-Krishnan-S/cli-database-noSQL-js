// TODO : covert sync to async with async and await
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

//TODO: !!add unique and privary keys with required 
//* IMPORTANT: !!Always use Try-Catch to call This function 
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

//* IMPORTANT: !!Always use try-catch when using this function
const addData = (collection , obj) => {
    try {
        const template = JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , fileName) , 'utf8'))
        const schema = template[collection]
        if(schema == undefined) {
            throw new Error(`No such collection exists nammed ${collection} in the db`)
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
        if(collectionValue[collection] === undefined) {
            collectionValue[collection] = {}
        }
        collectionValue[collection][Date.now()+ Math.random().toString().substring(2 , 7)] = obj
        fs.writeFileSync(path.join(__dirname , 'Data' , dataFile) , JSON.stringify(collectionValue , null , 2))
        console.log("data Wrote")
    } catch (err) {
        throw new Error('unable to write the data' + err.message)
    }
}

const readSchema = (collection) => {
    try {
        const template = JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , fileName) , 'utf8'))
        const schema = template[collection]
        if(schema === undefined) {
            throw new Error(`No such collection exists nammed ${collection} in the db`)
        }
        console.log(schema)
    } catch(err) {
        console.log(`can't read schema : ` + err.message)
    } 
}

const readData = (collection) => {
    try {
        const allData = JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , dataFile) , 'utf8'))
        const data = allData[collection]
        if(data === undefined) {
            throw new Error(`No such collection exists nammed ${collection} in the db`)
        }
        console.log(data)
    } catch (err) {
        console.log(`unable to read data : ` + err.message)
    }
}


//* Important: !! use this only for specific search and for not not a query search to do multiple thing 
const searchData = (collection , key , value) => {
    try {
        const template = JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , fileName) , 'utf8'))
        const schema = template[collection]
        if(schema == undefined) {
            throw new Error(`No such collection exists nammed ${collection} in the db`)
        }
 
        if(schema[key] === undefined) {
            throw new Error(`No such key value exists nammed ${key} in the collection ${collection}`)
        }

        const allData = JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , dataFile) , 'utf8'))
        const data = allData[collection]
        if(data === undefined) {
            throw new Error(`No such collection exists nammed ${collection} in the db`)
        }

        let flag = false
        Object.entries(data).forEach(([id , val]) => {
            if(val[key] === value) {
                flag = true
                console.log(`${id} : ` , val)
            }
        })

        if(!flag) {
            throw new Error(`No such element found with value ${value} in the data`)
        }
    } catch(err) {
        throw new Error(`unable to find the data : ` + err.message)
    }
}

const deleteData = (collection , key , value) => {
    try {
        const template = JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , fileName) , 'utf8'))
        const schema = template[collection]
        if(schema == undefined) {
            throw new Error(`No such collection exists nammed ${collection} in the db`)
        }
 
        if(schema[key] === undefined) {
            throw new Error(`No such key value exists nammed ${key} in the collection ${collection}`)
        }

        const allData = JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , dataFile) , 'utf8'))
        const data = allData[collection]
        if(data === undefined) {
            throw new Error(`No such collection exists nammed ${collection} in the db`)
        }

        // let flag = fals
        const filteredData =Object.fromEntries(
            Object.entries(data).filter(([id , val]) => {
                return val[key] != value
        }))


        if(Object.entries(data).length === Object.entries(filteredData).length) {
            throw new Error(`No such element found with value ${value} in the data`)
        }
        fs.writeFileSync(path.join(__dirname , 'Data' , dataFile) , JSON.stringify(filteredData , null , 2))
        console.log("data Wrote")
        
    } catch(err) {
        throw new Error(`unable to delete the data : ` + err.message)
    }
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
    // start()
    
    // create({'user': {
    //     name: "string",
    //     age: "number",
    //     password: "string"
    // }})
    
    // const data = [
    //     { "name": "Aarav", "age": 25, "password": "abc123" },
    //     { "name": "Ishaan", "age": 30, "password": "pass456" },
    //     { "name": "Rohan", "age": 22, "password": "secure789" },
    //     { "name": "Mira", "age": 28, "password": "mypwd001" },
    //     { "name": "Neha", "age": 24, "password": "test987" },
    //     { "name": "Ananya", "age": 26, "password": "hello123" },
    //     { "name": "Sahil", "age": 23, "password": "random000" },
    //     { "name": "Kiran", "age": 29, "password": "qwerty" },
    //     { "name": "Vikram", "age": 27, "password": "letmein" },
    //     { "name": "Riya", "age": 21, "password": "password123" },
    //     { "name": "Varun", "age": 31, "password": "admin007" },
    //     { "name": "Tanvi", "age": 19, "password": "userpass" },
    //     { "name": "Manav", "age": 32, "password": "rootaccess" },
    //     { "name": "Pooja", "age": 20, "password": "testpass" },
    //     { "name": "Arjun", "age": 35, "password": "mysecret" },
    //     { "name": "Sanya", "age": 18, "password": "guessme" },
    //     { "name": "Dev", "age": 40, "password": "opensesame" },
    //     { "name": "Kartik", "age": 33, "password": "randompass" },
    //     { "name": "Sneha", "age": 22, "password": "simple123" },
    //     { "name": "Yash", "age": 37, "password": "passme123" }
    //   ]
      

    // addData('user' , {
    //     name: "vishal",
    //     age: 20,
    //     password: "123"
    // })
    // data.forEach(((val) => {
    //     addData('user' , val)
    // }))
    // readSchema('user')
    // readData('user')
    deleteData('user' , 'name' , 'Kiran')
    //  deleteFile()
}    

main()