import fs from 'node:fs'
import inquirer from 'inquirer'
import { ProcessAbortedError } from '@/domain/errors'

export class CheckEmptyAppDir {
	async execute({ appDir }) {
		const exists = this._checkEmptyAppDir(appDir)
		const proceed = !exists || (await this._checkEmptyAppDirPrompt())

		if (!proceed) {
			throw new ProcessAbortedError('Process aborted. Exiting...')
		}
	}

	_checkEmptyAppDir(dir) {
		return fs.existsSync(dir) && fs.readdirSync(dir).length > 0
	}

	async _checkEmptyAppDirPrompt() {
		const answer = await inquirer.prompt(this._nonEmptyWritePrompt)
		return answer.proceed
	}

	_nonEmptyWritePrompt = {
		type: 'confirm',
		name: 'proceed',
		message: 'The directory is not empty. Do you still want to copy the template here?',
		default: false,
	}
}
