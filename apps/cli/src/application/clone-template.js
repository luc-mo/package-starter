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
			const git = simpleGit()
			await git.clone(config.repoUrl, tempDir)
			fs.cpSync(templateDir, appDir, { recursive: true })
		} catch (error) {
			// TODO - create a custom error to handle this
			console.error(error)
		} finally {
			fs.rmSync(tempDir, { recursive: true, force: true })
		}
	}
}
