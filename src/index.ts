#! /usr/bin/env node

import { Command } from 'commander'
import NessFramework from './frameworks/ness'
import packageJson from '../package.json'
const program = new Command()

program
    .version(packageJson.version)
    .description('a CLI for Typescript project manager')
    .addCommand(NessFramework)

program.parse(process.argv)
