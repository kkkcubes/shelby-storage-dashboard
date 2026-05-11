const sharedFiles = {};
const shares = [];

/**
 * Share a file CID with a wallet
 * @param {string} cid
 * @param {string} wallet
 * @returns {boolean}
 */
function shareFile(cid, wallet) {
  if (!sharedFiles[wallet]) {
    sharedFiles[wallet] = [];
  }

  sharedFiles[wallet].push(cid);

  return true;
}

/**
 * Get all shared files for a wallet
 * @param {string} wallet
 * @returns {string[]}
 */
function getSharedFiles(wallet) {
  return sharedFiles[wallet] || [];
}

/**
 * Create detailed share entry
 * @param {string} owner
 * @param {string} targetUser
 * @param {string} fileCid
 * @returns {boolean}
 */
const createShare = (
  owner,
  targetUser,
  fileCid
) => {
  shares.push({
    owner,
    targetUser,
    fileCid,
  });

  return true;
};

/**
 * Get all share records
 * @returns {Array}
 */
const getAllShares = () => {
  return shares;
};

module.exports = {
  shareFile,
  getSharedFiles,
  createShare,
  getAllShares,
};