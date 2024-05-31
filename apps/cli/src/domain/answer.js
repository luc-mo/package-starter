export class Answer {
	constructor({ language, environment, framework }) {
		this._answers = [language, environment, framework].filter(Boolean)
	}

	toString() {
		return this._answers.join('.')
	}
}
