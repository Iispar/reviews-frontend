/**
 * Parses a JSON file.
 * @param {json} file
 *               The file to be parsed.
 * @returns parsed file.
 */
async function ParseInputFile(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
}

export default ParseInputFile;
