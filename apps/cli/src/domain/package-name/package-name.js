import { InvalidPackageNameError } from './errors/invalid-package-name-error'

export class PackageName {
	_MAX_PACKAGE_NAME_LENGTH = 214
	_FORMAT_REG_EXP =
		/^(@[a-z0-9-]+\/[._]?[a-z0-9][a-z0-9._-]*[a-z0-9]|[a-z0-9]+([a-z0-9._-]*[a-z0-9])?)$/

	constructor(packageName) {
		this._packageName = packageName
	}

	validate() {
		this._assertLength(this._packageName)
		this._assertFormat(this._packageName)
	}

	_assertLength(packageName) {
		if (packageName.length > this._MAX_PACKAGE_NAME_LENGTH) {
			throw new InvalidPackageNameError('The package name is too long.')
		}
	}

	_assertFormat(packageName) {
		if (!this._FORMAT_REG_EXP.test(packageName)) {
			throw new InvalidPackageNameError(
				'The package name is invalid. Check https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name for more information.'
			)
		}
	}
}
