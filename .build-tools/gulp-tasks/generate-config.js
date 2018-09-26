const {promisify} = require('util');
const {readdir, readFile, writeFile} = require('fs');
const {safeLoad} = require('js-yaml');

const getContents = promisify(readFile);
const writeContents = promisify(writeFile);
const readDir = promisify(readdir);

const ALLOWED_TYPES = ['yaml', 'json'];

module.exports = () => {
	// First, get all the files in the data directory
	return readDir('./data').then(files => files.filter(
		// Only allow ALLOEWD_TYPES file extensions
		file => ALLOWED_TYPES.includes(file.toLowerCase().split('.').pop())
	// Then, read the files we support reading
	)).then(supportedFiles => {
		const promises = [];

		supportedFiles.forEach(file =>
			promises.push(
				getContents(`./data/${file}`).then(contents => ({
					file,
					contents
				}))
			)
		);

		return Promise.all(promises);
	// Now, parse the files and convert them to JSON
	}).then(readFiles => readFiles.map(({file, contents}) => {
		const filename = file.toLowerCase();
		if (filename.endsWith('json')) {
			return {
				file,
				contents: JSON.parse(contents)
			};
		} else if (filename.endsWith('yaml')) {
			return {
				file,
				contents: safeLoad(contents)
			};
		} else {
			console.log('CONFIG GENERATION: Skipping file:', file);
		}
	// Now, generate the config based on what we've seen
	})).then(parsedFiles => {
		const config = Object.assign({}, require('../../data/core.js'));
		parsedFiles.forEach(({file, contents}) => {
			const key = file.toLowerCase().replace(/\.(json|yaml)/g, '');
			if (config[key]) {
				return console.warn(`CONFIG GENERATION - Key "${key}"already exists, skipping...`)
			}

			config[key] = contents;
		});

		return config;
	// Finally, write the file
	}).then(config => {
		console.log('Writing config file');
		return writeContents('_config.json', JSON.stringify(config, null, 2));
	});
}
