import { Buffer } from "buffer";
import jpeg from "jpeg-js";
// @ts-ignore
import { PNG } from "pngjs";

export async function compressImage(
	inputBuffer: Buffer,
	mimeType: string,
	targetFileSizeKb: number
): Promise<Buffer> {
	const targetBytes = targetFileSizeKb * 1024;

	if (inputBuffer.length <= targetBytes) {
		return inputBuffer;
	}

	// --- SVG ---
	if (mimeType === "image/svg+xml") {
		return inputBuffer; // no processing
	}

	// --- JPEG ---
	if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
		const decoded = jpeg.decode(inputBuffer, { useTArray: true });

		let quality = 80;
		let output = jpeg.encode(decoded, quality).data;

		while (output.length > targetBytes && quality > 30) {
			quality -= 10;
			output = jpeg.encode(decoded, quality).data;
		}

		return Buffer.from(output);
	}

	// --- PNG ---
	if (mimeType === "image/png") {
		const png = PNG.sync.read(inputBuffer);

		// PNG compression is lossless; re-encoding removes metadata
		const output = PNG.sync.write(png, {
			colorType: png.colorType,
			inputHasAlpha: png.alpha,
		});

		return output.length <= inputBuffer.length ? output : inputBuffer;
	}

	// --- Default: return original ---
	return inputBuffer;
}
