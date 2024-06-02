#!/usr/bin/env node
import { name, version, description } from '../package.json'
import { program } from 'commander'

import { config } from './infrastructure/config'
import { ProcessAbortedError } from './domain/errors'

import { CheckEmptyAppDir } from './application/check-empty-app-dir'
import { GetTemplatePrompt } from './application/get-template-prompt'
import { CloneTemplate } from './application/clone-template'

const main = async () => {
	try {
		const checkEmptyAppDir = new CheckEmptyAppDir()
		const getTemplatePrompt = new GetTemplatePrompt()
		const cloneTemplate = new CloneTemplate()

		const appDir = process.argv[2] ?? config.defaultName
		await checkEmptyAppDir.execute({ appDir })

		const answer = await getTemplatePrompt.execute()
		await cloneTemplate.execute({ appDir, answer })
	} catch (error) {
		if (error instanceof ProcessAbortedError) {
			console.error(error.message)
		}
	}
}

program
	.name(name)
	.version(version)
	.description(description)
	.usage('./your-project-directory')
	.action(main)
	.parse(process.argv)
