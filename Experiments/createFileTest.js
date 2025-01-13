const fs = require("fs")
const path = require("path")


const dataType = ['string' , 'number' , 'boolean']
const fileName  = 'data.json'

const start = () => {
    fs.writeFile(path.join(__dirname , "Data", fileName) , "" , (err) => {
        if(err) {
            console.log("error")
        } else {
            console.log("yah!!!")
        }
    })
}

//TODO:: !!read and then right to append datamodel
const create = (obj) => {
    if(obj.length > 1) {return new Error('Invalid declaratin format')}
    const name = Object.keys(obj)
    Object.entries(obj[name]).forEach(([key , value]) => {
        if(!dataType.includes(value)) {
            return new Error('data type mentioned is invalid')
        }
        fs.writeFile(path.join(__dirname , 'Data' , fileName) , JSON.stringify(obj, null, 2), (err) => {
            if(err) {
                console.log("error")
            } else {
                console.log("yah!!!")
            }
        })
    })
}

const addData = () => {

}

const readData = () => {

}

const deleteData = () => {

}

const deleteFile = () => {

}

start()

create({'user1': {
    uid: "string",
    name: "string",
    age: "number",
    password: "string"
}})