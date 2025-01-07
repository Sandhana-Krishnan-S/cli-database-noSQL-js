const { imp } = require('../helper/controllerImports')


const flagMapper = {
    "-test" : imp.testScript,
    "-help" : imp.helpScript,
}


module.exports = { flagMapper }