#!/usr/bin/env node

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: sans <arguments>');
    process.exit(1);
}

args[0] == '-test' ? console.log('hello') : console.log('cmd - not found');