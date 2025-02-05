const fs = require("fs")
const path = require("path")
const { threadId } = require("worker_threads")


const dataType = ['string' , 'number' , 'boolean']
const fileName  = 'data.json'

const start = async () => {
    try{
        fs.writeFileSync(path.join(__dirname , "Data", fileName) , "[]" )
        console.log("created")
    } catch(err) {
        console.log("failed" + err.message)
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
        Documents.push(obj)
        fs.writeFileSync(path.join(__dirname , 'Data' , fileName) , JSON.stringify(Documents, null, 2))
        console.log("wrote")
    } catch(err) {
        throw new Error('Error Reading The document : ' + err.message)
    }
}

const addData = () => {

}

const readData = () => {

}

const deleteData = () => {

}

const deleteFile = async  () => {
    try {
        fs.unlinkSync(path.join(__dirname, "Data", fileName))
        console.log("File deleted successfully")
    } catch (err) {
        console.log("Error deleting file:", err.message)
    }    
}


const main = async () => {
    await start()
    
    await create({'user': {
        uid: "string",
        name: "string",
        age: "number",
        password: "string"
    }})
    
    await deleteFile()
}    

main()