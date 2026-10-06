import { Buffer } from "buffer";
import jpeg from "jpeg-js";
// @ts-ignore
import { PNG } from "pngjs";
export async function compressImage(
    inputBuffer: Buffer,
    mimeType: string,
    targetFileMB: number,
    rescale: number = 1
): Promise<Buffer> {
    const targetBytes = targetFileMB * 10000 * rescale;
    console.log(targetBytes,inputBuffer.length)

    if (inputBuffer.length <= targetBytes || mimeType === "image/svg+xml") {
        return inputBuffer; // no processing
    }

    // --- JPEG ---
    if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
        return compressJPG(inputBuffer, targetBytes);
    }

    // --- PNG ---
    if (mimeType === "image/png") {
        return compressPNG(inputBuffer, targetBytes);
    }

    // --- Default: return original ---
    return inputBuffer;
}

const compressJPG = (inputBuffer: Buffer, targetBytes: number) => {
    const decoded = jpeg.decode(inputBuffer, { useTArray: true });

    let quality = 80;
    let output = jpeg.encode(decoded, quality).data;

    while (output.length > targetBytes && quality > 30) {
        quality -= 10;
        output = jpeg.encode(decoded, quality).data;
    }

    return Buffer.from(output);
};

const compressPNG = (inputBuffer: Buffer, targetBytes: number) => {
    const png = PNG.sync.read(inputBuffer);

    // PNG compression is lossless; re-encoding removes metadata
    const output = PNG.sync.write(png, {
        colorType: png.colorType,
        inputHasAlpha: png.alpha
    });

    return output.length <= inputBuffer.length ? output : inputBuffer;
};
