export class GetFramework {
	static async execute() {
		return await inquirer.prompt([_frameworkPrompt])
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
