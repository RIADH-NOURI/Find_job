import sharp from 'sharp';


export const convertImageToWebP = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .webp({ quality: 50 }) 
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    throw new Error('Error converting image: ' + error.message);
  }
};



