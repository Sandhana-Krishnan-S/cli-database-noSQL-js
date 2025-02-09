const fs = require("fs")
const path = require("path")


const dataType = ['string' , 'number' , 'boolean']
const fileName  = 'collection.json'
const dataFile = 'data.json'

//TODO: !! Add a decodeing from BSON to JSON on creation
const start = async () => {
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
//IMPORTANT: !!Always use Try-Catch to call This function 
const create = async (obj) => {
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

//TODO: !!Test this manually before pushing to main
//IMPORTANT: !!Always use try-catch when using this function
const addData = async (args , obj) => {
    try {
        const template = await JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , fileName) , 'utf8'))
        const schema = template[args]
        if(schema == undefined) {
            throw new Error(`No such collection exists nammed ${args} in the db`)
        }
        Object.keys(schema).forEach(key => {
            if(schema[key] != typeof obj[key]) {
                throw new Error(`Type mis-match on Key ${key}`)
            }
        })
        const collectionValue = await JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , dataFile) , 'utf8'))
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

const readData = async () => {

}

const deleteData = async () => {

}

const deleteFile = async  () => {
    try {
        fs.unlinkSync(path.join(__dirname, "Data", fileName))
        fs.unlinkSync(path.join(__dirname, "Data", dataFile))
        console.log("File deleted successfully")
    } catch (err) {
        console.log("Error deleting file:", err.message)
        throw new Error("Failed to stop!!" + err.message)
    }    
}


const main = async () => {
    // await start()
    
    // await create({'user': {
    //     name: "string",
    //     age: "number",
    //     password: "string"
    // }})

    addData('user' , {
        name: "vishal",
        age: 20,
        password: "123"
    })
    
    // await deleteFile()
}    

main()