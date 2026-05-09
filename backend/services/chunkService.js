const fs = require("fs");

const path = require("path");

const chunksDir = path.join(
  __dirname,
  "../chunks"
);

const storageDir = path.join(
  __dirname,
  "../storage"
);

if (!fs.existsSync(chunksDir)) {
  fs.mkdirSync(chunksDir);
}

if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir);
}

const saveChunk = async (
  fileId,
  chunkIndex,
  buffer
) => {
  const chunkPath = path.join(
    chunksDir,
    `${fileId}-${chunkIndex}`
  );

  fs.writeFileSync(chunkPath, buffer);
};

const mergeChunks = async (
  fileId,
  totalChunks,
  finalFileName
) => {
  const finalPath = path.join(
    storageDir,
    finalFileName
  );

  const writeStream =
    fs.createWriteStream(finalPath);

  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = path.join(
      chunksDir,
      `${fileId}-${i}`
    );

    const data =
      fs.readFileSync(chunkPath);

    writeStream.write(data);

    fs.unlinkSync(chunkPath);
  }

  writeStream.end();

  return finalFileName;
};

module.exports = {
  saveChunk,
  mergeChunks,
};