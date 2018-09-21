'use strict';
const run = require('run-sequence');

module.exports = cb => {
	const oldStaging = process.env.FOR_STAGING;
	process.env.FOR_STAGING = true;
	return run('dist', () => {
		process.env.FOR_STAGING = oldStaging;
		const {exec} = require('child_process');
		let settings;

		try {
			settings = require('../.env.json');
		} catch (E) {
			settings = process.env;
		}

		['SYNC_HOST', 'SYNC_DIR', 'SYNC_USER'].forEach(requiredKey => {
			if (!settings[requiredKey]) {
				throw new Error(`Missing key: ${requiredKey}`);
			}
		});

		const {SYNC_HOST, SYNC_DIR, SYNC_USER} = settings;

		let command = `rsync -urltv --delete -e ssh dist/* ${SYNC_USER}@${SYNC_HOST}:${SYNC_DIR}`;

		if (process.platform === 'win32') {
			command = `bash -c "${command}"`;
		}

		console.log(`Executing ${command}`);

		exec(command, (err, stdout, stderr) => {
			if (err) {
				throw err;
			}

			process.stdout.write(stdout);
			process.stderr.write(stderr);
			cb();
		});
	})
};
