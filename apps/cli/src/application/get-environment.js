import inquirer from 'inquirer'

export class GetEnvironment {
	static async execute() {
		return await inquirer.prompt([_languagePrompt, _environmentPrompt])
	}

	static _languagePrompt = {
		type: 'list',
		name: 'language',
		message: 'Select a language:',
		choices: [
			{ name: 'JavaScript', value: 'js' },
			{ name: 'TypeScript', value: 'ts' },
		],
	}

	static _environmentPrompt = {
		type: 'list',
		name: 'environment',
		message: 'Select an environment:',
		choices: [
			{ name: 'Browser', value: 'browser' },
			{ name: 'Node.js', value: 'node', disabled: true },
		],
	}
}
