import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";
import path from "path";
import fs from "fs";

const imagesFolder = "./src/1-assets/images/";

async function saveImage(image: UploadedFile): Promise<string> {

    const uniqueImageName = createImageName(image.name);

    //Create unique image name:
    const absolutePath = imagesFolder + uniqueImageName; // <-----

    //Save to disk:
    await image.mv(absolutePath); // mv = move

    //Return new name:
    return uniqueImageName;
}

async function updateImage(image: UploadedFile, existingImageName: string): Promise<string> {
    
    //Delete existing image:
    await deleteImage(existingImageName);

    //Save new image to disk: 
    const uniqueImageName = await saveImage(image);

    //Return unique name:
    return uniqueImageName;

}

async function deleteImage(existingImageName: string): Promise<void> {
    try {

        if(!existingImageName) return;
        //Delete image from disk:
        await fsPromises.unlink(imagesFolder + existingImageName);
    }
    catch(err: any) {
        console.error(err.message);
    }
}


function createImageName(originalImageName: string): string {

    //Take original extension:
    const extension = originalImageName.substring(originalImageName.lastIndexOf("."));

    //Create unique name including original extension (v4 = 36 chars uuid):
    const uniqueImageName = uuid() + extension;

    //Return unique name:
    return uniqueImageName;
}

function getAbsolutePath(imageName: string): string {
    let absolutePath = path.join(__dirname,"..", "1-assets", "images", imageName);
    if(!fs.existsSync(absolutePath)) {
        absolutePath = path.join(__dirname,"..", "1-assets", "images");
    }
    return absolutePath;
}


export default {
    saveImage,
    updateImage,
    deleteImage,
    getAbsolutePath
}