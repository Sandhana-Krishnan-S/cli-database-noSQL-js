
/**
 * 
 * @param {String[]} args 
 */

const  { mapper } = require("../mapper/mainMapper")

const search = (args) => {
    console.log(mapper)
    if(args[0].charAt(0) == '-') {
        if(isFoundFlag(args[0])) {
            const tree = mapper.flagMapper[args[0]]
            tree()
        } else {
            console.log(`sans: '${args[0]}' is not a sans command. See 'sans -help'`)
        }
    }
}

/**
 * 
 * @param {String} arg
 * @returns {boolean}
 */
const isFoundFlag = (arg) => {
    return arg in mapper.flagMapper
}


module.exports = { search }