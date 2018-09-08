'use strict';

class BuildTime {
	constructor() {
	}

	registerHooks(hookRegisterer) {
		hookRegisterer('pre-write', this.appendBuildTime)
	}

	appendBuildTime(files) {
		const time = new Date().toString().substr(0,25);
		return files.map(file => {
			file.rendered = `${file.rendered}<!-- built ${time} -->`;
			return file;
		});
	}
}

module.exports = new BuildTime();
