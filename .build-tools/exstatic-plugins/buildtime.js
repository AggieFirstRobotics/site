'use strict';

class BuildTime {
	constructor() {
	}

	registerHooks(hookRegisterer) {
		hookRegisterer('pre-write', this.appendBuildTime)
	}

	appendBuildTime(files) {
		const time = new Date().toString().substr(0,25);
		let version = process.env.COMMIT_REF || false;
		version = version ? `, version ${version}`: '';

		return files.map(file => {
			file.rendered = `${file.rendered}<!-- built ${time}${version} -->`;
			return file;
		});
	}
}

module.exports = new BuildTime();
