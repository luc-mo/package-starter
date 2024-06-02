export class Answer {
	constructor({ name, author, language, environment, framework }) {
		this.name = name
		this.author = author
		this._answers = [language, environment, framework].filter(Boolean)
	}

	toString() {
		return this._answers.join('.')
	}
}
