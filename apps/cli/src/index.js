#!/usr/bin/env node
import { version } from '../package.json'
import { program } from 'commander'

import { config } from './infrastructure/config'
import { GetTemplatePrompt } from './application/get-template-prompt'
import { CloneTemplate } from './application/clone-template'

const main = async () => {
	const getTemplatePrompt = new GetTemplatePrompt()
	const cloneTemplate = new CloneTemplate()
	const appDir = process.argv[2] ?? config.defaultName
	const answer = await getTemplatePrompt.execute()
	await cloneTemplate.execute({ appDir, answer })
}

program.version(version).action(main).parse(process.argv)
