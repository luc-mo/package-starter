import inquirer from 'inquirer'
import { Answer } from '@/domain/answer'

export class GetTemplatePrompt {
	async execute() {
		const answers = await inquirer.prompt([
			this._languagePrompt,
			this._environmentPrompt,
			this._frameworkPrompt,
		])
		return new Answer(answers).toString()
	}

	_languagePrompt = {
		type: 'list',
		name: 'language',
		message: 'Select a language:',
		choices: [
			{ name: 'JavaScript', value: 'js' },
			{ name: 'TypeScript', value: 'ts' },
		],
	}

	_environmentPrompt = {
		type: 'list',
		name: 'environment',
		message: 'Select an environment:',
		choices: [
			{ name: 'Browser', value: 'browser' },
			{ name: 'Node.js', value: 'node', disabled: true },
		],
	}

	_frameworkPrompt = {
		type: 'list',
		name: 'framework',
		message: 'Select a framework:',
		choices: [
			{ name: 'React', value: 'react' },
			{ name: 'Vue', value: 'vue', disabled: true },
		],
		when: this._checkFrameworkPath,
	}

	_checkFrameworkPath(answers) {
		return answers.environment === 'browser'
	}
}
