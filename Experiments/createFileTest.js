const fs = require("fs")
const path = require("path")


const dataType = ['string' , 'number' , 'boolean']
const fileName  = 'data.json'

const start = () => {
    fs.writeFile(path.join(__dirname , "Data", fileName) , "[]" , (err) => {
        if(err) {
            console.log("error")
        } else {
            console.log("yah!!!")
        }
    })
}

//TODO: !!read and then right to append datamodel --DONE😊
//IMPORTANT: !!Always use Try-Catch to call This function 
const create = async (obj) => {
    if(obj.length > 1) {return new Error('Invalid declaratin format')}
    const name = Object.keys(obj)
    Object.entries(obj[name]).forEach(([key , value]) => {
        if(!dataType.includes(value)) {
            throw new Error('data type mentioned is invalid')
        }
    })
    try {
        const Documents = JSON.parse(fs.readFileSync(path.join(__dirname , 'Data' , fileName) , 'utf8'))
        console.log(typeof(Documents))
        console.log(Array.isArray(Documents))
        Documents.push(obj)
        fs.writeFile(path.join(__dirname , 'Data' , fileName) , JSON.stringify(Documents, null, 2) , (err) => {
            if(err) {
                console.log("error")
            } else {
                console.log("yah!!!")
            }
        })
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

const deleteFile = () => {

}

// start()

create({'user': {
    uid: "string",
    name: "string",
    age: "number",
    password: "string"
}})