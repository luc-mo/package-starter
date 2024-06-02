#!/usr/bin/env node
import { program } from 'commander'
import { GetTemplatePrompt } from './application/get-template-prompt'
import { CloneTemplate } from './application/clone-template'

const main = async () => {
	const getTemplatePrompt = new GetTemplatePrompt()
	const cloneTemplate = new CloneTemplate()

	const appDir = process.argv[2]
	const answer = await getTemplatePrompt.execute()
	await cloneTemplate.execute({ appDir, answer })
}

program.version('0.0.0-beta.4').action(main).parse(process.argv)
