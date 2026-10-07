import formidable from "formidable";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { defineEventHandler } from "h3";
import { AppDataSource } from "~~/server/DB/data-source.js";
import { USE, UserImageEntity } from "~~/server/DB/entity/interfaces";
import { User } from "~~/server/DB/entity/User.js";
import { UserImage } from "~~/server/DB/entity/UserImage";
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

    const media = await compressImage(fileBuffer, file.mimetype, 10, 0.66);
    const mediaMimeType:string = file.mimetype;

    userImageRepo.save({
        id: uuidv4(),
        userId: user.id,
        mediaXXL: await compressImage(fileBuffer, file.mimetype, 10),
        mediaL: await compressImage(fileBuffer, file.mimetype, 8),
        mediaM: await compressImage(fileBuffer, file.mimetype, 4),
        mediaS: await compressImage(fileBuffer, file.mimetype, 2),
        mediaMimeType: file.mimetype,
        use: USE.BANNER,
        size: undefined,
        url: undefined,
        postDate: new Date(),
        valid: true
    });

    return {
        success: true,
        mediaBundle: { media, mediaMimeType }
    };
});
