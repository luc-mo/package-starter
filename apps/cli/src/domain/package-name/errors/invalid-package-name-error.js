export class InvalidPackageNameError extends Error {
	constructor(message) {
		super(message)
		this.name = 'InvalidPackageNameError'
	}
}
