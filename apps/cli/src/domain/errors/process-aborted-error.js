export class ProcessAbortedError extends Error {
	constructor(message) {
		super(message)
		this.name = 'ProcessAbortedError'
	}
}
