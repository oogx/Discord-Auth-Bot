const { readdirSync } = require('fs')
function getFiles(Directory) {
    let commandFiles = []
	const files = readdirSync( Directory, { withFileTypes: true } )
	for (const file of files) {
		if (file.isDirectory()) {
			commandFiles = [...commandFiles, ...getFiles(`${Directory}/${file.name}`)]
		} else if (file.name.endsWith('.js')) {
			commandFiles.push(`.${Directory}/${file.name}`)
		}
	}
	return commandFiles
}
function GenerateKey() {
    let key = ""
    const characters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
    for (let i = 0; i < 27; i++) {
        if (i === 6 || i === 13 || i === 20 || i === 27) {
            key += "-"
        } else {
            key += characters.charAt(Math.floor(Math.random() * characters.length))
        }
    }
    return key
}
module.exports = { getFiles,GenerateKey }