/**
 * Parses a JSON file.
 * @param {json} file
 *               The file to be parsed.
 * @returns parsed file.
 */
async function parseInputFile(file) {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
    fileReader.readAsText(file);
  });
}

export default parseInputFile;
