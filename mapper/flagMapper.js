const { imp } = require('../helper/controllerImports')


const flagMapper = {
    "-test" : imp.testScript,
}


module.exports = { flagMapper }