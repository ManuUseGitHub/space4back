import formidable from "formidable";
import fs from "fs/promises";
import { defineEventHandler } from "h3";
import { AppDataSource } from "~~/server/DB/data-source.js";
import { User } from "~~/server/DB/entity/User.js";
import { compressImage } from "~~/server/utils/imageCompress";

export default defineEventHandler(async (event) => {
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
	const user = await userRepo.findOneBy({ id });
	if (!user) {
		throw createError({ statusCode: 404, statusMessage: "User not found" });
	}

	user.photo = await compressImage(fileBuffer, file.mimetype, 1000000);
	user.photoMimeType = file.mimetype; // "image/jpeg" or "image/png"
	await userRepo.save(user);

	return {
		success: true,
		photoBundle: { photo: user.photo, photoMimeType: user.photoMimeType },
	};
});
