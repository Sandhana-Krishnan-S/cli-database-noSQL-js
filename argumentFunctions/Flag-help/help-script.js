const { hiddenCmd,  } = require("../../allScript")

const helpScript = () => {

    console.log('These are common Sans commands used in various situations:')

    console.log('\nThis is the hidden cmds that does nothing productive')
    Object.keys(hiddenCmd).forEach((key) => {
        console.log(`   ${key.padEnd(8)} ${hiddenCmd[key]}`)
    })
    console.log('\nThis is the hidden cmds that does nothing productive')
}

module.exports = { helpScript }
