export class Answer {
	constructor({ name, description, author, language, environment, framework }) {
		this.name = name
		this.description = description
		this.author = author
		this._answers = [language, environment, framework].filter(Boolean)
	}

	getTemplateKey() {
		return this._answers.join('.')
	}
}
