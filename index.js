#!/usr/bin/env node

const yargs = require('yargs')
const sh = require('shell-exec')

const kill = (port) => {
    port = Number.parseInt(port)

    if (!port) {
        return new Error('Invalid argument provided for port')
    }

    if (process.platform === 'win32') {
        sh(
            `Stop-Process -Id (Get-NetTCPConnection -LocalPort ${port}).OwningProcess -Force`
        )
    }

    sh(
        `lsof -i tcp:${port} | grep LISTEN | awk '{print $2}' | xargs kill -9`
    )

    console.log(`kill ${port} successful ^_^ `)
}

const { argv } = yargs
    .usage('Usage: k 3020')
    .version()
    .alias('v', 'version')
    .alias('h', 'help')
    .help('h')

const port = argv._

if(port) {
    kill(port)
}