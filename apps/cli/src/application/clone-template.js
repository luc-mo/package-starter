import os from 'node:os'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import simpleGit from 'simple-git'
import { config } from '@/infrastructure/config'

export class CloneTemplate {
	async execute({ appDir, answer }) {
		const tempId = crypto.randomUUID()
		const tempDir = path.join(os.tmpdir(), tempId)

		const templateKey = answer.getTemplateKey()
		const templateDir = path.join(tempDir, config.templates[templateKey])

		try {
			await this._cloneRepositoy(tempDir)
			this._rewritePackageJson(templateDir, answer)
			this._copyTemplate(templateDir, appDir)
		} catch (error) {
			// TODO - create a custom error to handle this
			console.error(error)
		} finally {
			this._removeTempDir(tempDir)
		}
	}

	async _cloneRepositoy(tempDir) {
		const git = simpleGit()
		await git.clone(config.repoUrl, tempDir)
	}

	async _rewritePackageJson(templateDir, answer) {
		const packageJsonPath = path.join(templateDir, 'package.json')
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
		packageJson.name = answer.name
		packageJson.author = answer.author
		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
	}

	_copyTemplate(templateDir, appDir) {
		fs.cpSync(templateDir, appDir, { recursive: true })
	}

	_removeTempDir(tempDir) {
		fs.rmSync(tempDir, { recursive: true, force: true })
	}
}
