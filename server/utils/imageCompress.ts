import sharp from "sharp";
import { optimize } from "svgo";
import { Buffer } from "buffer";

/**
 * Compresses an image buffer to fit under a target size.
 * - Raster formats: uses sharp
 * - SVG: uses svgo
 */
export async function compressImage(
	inputBuffer: Buffer,
	mimeType: string,
	targetFileSizeKb: number,
	maxDeviation: number = 50
): Promise<Buffer> {
	const targetBytes = targetFileSizeKb * 1024;

	// Already small enough → return as-is
	if (inputBuffer.length <= targetBytes) {
		return inputBuffer;
	}

	// --- Handle SVG separately ---
	if (mimeType === "image/svg+xml") {
		const svgText = inputBuffer.toString("utf-8");
		const result = optimize(svgText, {
			multipass: true,
			plugins: [
				"removeDimensions",
				"removeViewBox",
				"cleanupAttrs",
				"removeDoctype",
				"removeComments",
				"removeMetadata",
			],
		});
		return Buffer.from(result.data, "utf-8");
	}

	// --- Handle raster formats with sharp ---
	let qualityLow = 1;
	let qualityHigh = 100;
	let bestBuffer = inputBuffer;

	function sharpFormat(q: number) {
		const s = sharp(inputBuffer);
		switch (mimeType) {
			case "image/jpeg":
			case "image/jpg":
				return s.jpeg({ quality: q });
			case "image/webp":
				return s.webp({ quality: q });
			case "image/png":
				return s.png({ compressionLevel: Math.min(9, Math.floor(q / 11)) });
			case "image/avif":
				return s.avif({ quality: q });
			default:
				// fallback to WebP
				return s.webp({ quality: q });
		}
	}

	while (qualityLow <= qualityHigh) {
		const quality = Math.floor((qualityLow + qualityHigh) / 2);
		const compressedBuffer = await sharpFormat(quality).toBuffer();
		const size = compressedBuffer.length;

		if (Math.abs(size - targetBytes) <= maxDeviation * 1024) {
			return compressedBuffer;
		}

		if (size > targetBytes) {
			qualityHigh = quality - 1;
		} else {
			bestBuffer = compressedBuffer;
			qualityLow = quality + 1;
		}
	}

	return bestBuffer;
}
