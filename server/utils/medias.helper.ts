import formidable from "formidable";
import fs from "fs/promises";
import { EventHandlerRequest, H3Event } from "h3";
import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "~~/server/DB/data-source.js";
import { USE } from "~~/server/DB/entity/interfaces";
import { User } from "~~/server/DB/entity/User.js";
import { UserImage } from "~~/server/DB/entity/UserImage.js";
import { compressImage } from "~~/server/utils/imageCompress";

export const parseUse = (use: string) => {
    return USE[use as keyof typeof USE];
};
const parsefiles = async (event: H3Event<EventHandlerRequest>) => {
    const [_, files] = await new Promise<any>((resolve, reject) => {
        formidable({ multiples: false }).parse(event.node.req, (err, fields, files) => {
            if (err) reject(err);
            resolve([fields, files]);
        });
    });
    return files;
};
export type FileWeightMetas = {
    max2XlMB: number;
    maxLMB: number;
    maxMMB: number;
    maxSMB: number;
    use: USE;
    rescale?: number;
};
export const postMedia = async (event: H3Event<EventHandlerRequest>, metas: FileWeightMetas) => {
    const file = (await parsefiles(event)).file[0];
    const fileBuffer = await fs.readFile(file.filepath);
    const userRepo = AppDataSource.getRepository(User);
    const userImageRepo = AppDataSource.getRepository(UserImage);
    const id = event.context.params?.userid;
    const user = await userRepo.findOneBy({ id });
    if (!user) {
        throw createError({ statusCode: 404, statusMessage: "User not found" });
    }

    const { max2XlMB, maxLMB, maxMMB, maxSMB, use, rescale } = metas;

    const media = await compressImage(fileBuffer, file.mimetype, max2XlMB, rescale);
    const mediaMimeType: string = file.mimetype;

    userImageRepo.save({
        id: uuidv4(),
        userId: user.id,
        mediaXXL: await compressImage(fileBuffer, file.mimetype, max2XlMB, rescale),
        mediaL: await compressImage(fileBuffer, file.mimetype, maxLMB),
        mediaM: await compressImage(fileBuffer, file.mimetype, maxMMB),
        mediaS: await compressImage(fileBuffer, file.mimetype, maxSMB),
        mediaMimeType: file.mimetype,
        use,
        size: undefined,
        url: undefined,
        postDate: new Date(),
        valid: true
    });

    return {
        success: true,
        mediaBundle: { media, mediaMimeType }
    };
};
