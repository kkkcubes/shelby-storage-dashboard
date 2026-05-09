const sharedFiles = {};

function shareFile(cid, wallet) {
  if (!sharedFiles[wallet]) {
    sharedFiles[wallet] = [];
  }

  sharedFiles[wallet].push(cid);

  return true;
}

function getSharedFiles(wallet) {
  return sharedFiles[wallet] || [];
}

module.exports = {
  shareFile,
  getSharedFiles,
};