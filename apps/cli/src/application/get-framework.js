import inquirer from 'inquirer'

export class GetFramework {
	static async execute(prevAnswers = {}) {
		return await inquirer.prompt([_frameworkPrompt], prevAnswers)
	}

	static _frameworkPrompt = {
		type: 'list',
		name: 'framework',
		message: 'Select a framework:',
		choices: [
			{ name: 'React', value: 'react' },
			{ name: 'Vue', value: 'vue', disabled: true },
		],
	}
}
