const versions = {};

function createVersion(fileName) {
  if (!versions[fileName]) {
    versions[fileName] = 1;
  } else {
    versions[fileName]++;
  }

  return versions[fileName];
}

module.exports = {
  createVersion,
};