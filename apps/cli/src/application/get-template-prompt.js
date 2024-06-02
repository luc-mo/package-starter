import inquirer from 'inquirer'
import { config } from '@/infrastructure/config'
import { Answer } from '@/domain/answer'
import { PackageName, InvalidPackageNameError } from '@/domain/package-name'

export class GetTemplatePrompt {
	async execute() {
		const answers = await inquirer.prompt([
			this._packageNamePrompt,
			this._authorPrompt,
			this._languagePrompt,
			this._environmentPrompt,
			this._frameworkPrompt,
		])
		return new Answer(answers)
	}

	_packageNamePrompt = {
		type: 'input',
		name: 'name',
		message: 'Enter the package name:',
		default: config.defaultName,
		validate: this._validatePackageName,
	}

	_authorPrompt = {
		type: 'input',
		name: 'author',
		message: 'Enter the author name:',
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

	_validatePackageName(input) {
		try {
			const packageName = new PackageName(input)
			packageName.validate()
			return true
		} catch (error) {
			if (error instanceof InvalidPackageNameError) {
				return error.message
			}
			return 'An error occurred while validating the package name'
		}
	}

	_checkFrameworkPath(answers) {
		return answers.environment === 'browser'
	}
}
