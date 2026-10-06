import formidable from "formidable";
import fs from "fs/promises";
import { defineEventHandler } from "h3";
import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "~~/server/DB/data-source.js";
import { User } from "~~/server/DB/entity/User.js";
import { UserImage } from "~~/server/DB/entity/UserImage.js";
import { compressImage } from "~~/server/utils/imageCompress";

export default defineEventHandler(async event => {
    const id = event.context.params?.userid;
    const form = formidable({ multiples: false });

    const [fields, files] = await new Promise<any>((resolve, reject) => {
        form.parse(event.node.req, (err, fields, files) => {
            if (err) reject(err);
            resolve([fields, files]);
        });
    });

    const file = files.file[0];
    const fileBuffer = await fs.readFile(file.filepath);

    const userRepo = AppDataSource.getRepository(User);
    const userImageRepo = AppDataSource.getRepository(UserImage);
    const user = await userRepo.findOneBy({ id });
    if (!user) {
        throw createError({ statusCode: 404, statusMessage: "User not found" });
    }

    user.photo = await compressImage(fileBuffer, file.mimetype, 10);
    const image: UserImage = {
        id: uuidv4(),
        userId: user.id,
        mediaXXL: await compressImage(fileBuffer, file.mimetype, 10),
        mediaL: await compressImage(fileBuffer, file.mimetype, 5),
        mediaM: await compressImage(fileBuffer, file.mimetype, 2),
        mediaS: await compressImage(fileBuffer, file.mimetype, 1),
        mediaMimeType: file.mimetype,
        size: null,
        url: null,
        postDate: null,
        valid: true
    };
    userImageRepo.save(image);
    user.photoMimeType = file.mimetype; // "image/jpeg" or "image/png"
    await userRepo.save(user);

    return {
        success: true,
        photoBundle: { photo: user.photo, photoMimeType: user.photoMimeType }
    };
});
