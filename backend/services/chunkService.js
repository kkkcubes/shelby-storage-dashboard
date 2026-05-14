const fs =
  require("fs");

const path =
  require("path");

const saveChunk =
  async (
    fileId,
    chunkIndex,
    buffer
  ) => {
    const dir =
      path.join(
        __dirname,
        "../chunks",
        fileId
      );

    if (
      !fs.existsSync(dir)
    ) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }

    fs.writeFileSync(
      path.join(
        dir,
        `${chunkIndex}`
      ),
      buffer
    );
  };

const mergeChunks =
  async (
    fileId,
    totalChunks,
    fileName
  ) => {
    const chunkDir =
      path.join(
        __dirname,
        "../chunks",
        fileId
      );

    const finalPath =
      path.join(
        __dirname,
        "../storage",
        fileName
      );

    const writeStream =
      fs.createWriteStream(
        finalPath
      );

    for (
      let i = 0;
      i < totalChunks;
      i++
    ) {
      const chunk =
        fs.readFileSync(
          path.join(
            chunkDir,
            `${i}`
          )
        );

      writeStream.write(
        chunk
      );
    }

    writeStream.end();

    return finalPath;
  };

module.exports = {
  saveChunk,
  mergeChunks,
};