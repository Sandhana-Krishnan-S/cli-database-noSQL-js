#!/usr/bin/env node

const { search } = require('./helper/mapCaller')


const args = process.argv.slice(2)

if (args.length === 0) {
    console.log('Usage: sans <arguments>')
    process.exit(1);
}

search(args)
