export class Answer {
	constructor({ name, author, language, environment, framework }) {
		this.name = name
		this.author = author
		this._answers = [language, environment, framework].filter(Boolean)
	}

	getTemplateKey() {
		return this._answers.join('.')
	}
}
