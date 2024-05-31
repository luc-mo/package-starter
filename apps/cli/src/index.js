#!/usr/bin/env node

import os from 'node:os'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

import { program } from 'commander'
import simpleGit from 'simple-git'

import { config } from './infrastructure/config'
import { Answer } from './domain/answer'

import { GetEnvironment } from './application/get-environment'
import { GetFramework } from './application/get-framework'

const handlePrompts = async () => {
	const envAnswers = await GetEnvironment.execute()
	const fullAnswers = await GetFramework.execute(envAnswers)
	return new Answer(fullAnswers).toString()
}

const main = async () => {
	const appDir = process.argv[2]
	const answer = await handlePrompts()

	const repoId = crypto.webcrypto.randomUUID()
	const tempDir = path.join(os.tmpdir(), repoId)
	const templateDir = path.join(tempDir, templates[answer])

	try {
		const git = simpleGit()
		await git.clone(config.repoUrl, tempDir)
		fs.cpSync(templateDir, appDir, { recursive: true })
	} catch (error) {
		console.error(error)
	} finally {
		await fs.rmSync(tempDir, { recursive: true, force: true })
	}
}

program.version('0.0.0-beta.1').action(main)
