import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { createReadStream } from "fs";
import * as path from "path";
import * as sharp from "sharp";
import * as fs from "fs";
import { ConfigService } from "./config.service";
import { globStreamSync } from "glob";

@Injectable()
export class KasService {
  private async getDateTime(): Promise<string> {
    let date_time = new Date();

    let date = String(date_time.getDate()).padStart(2, "0");
    let month = String(date_time.getMonth() + 1).padStart(2, "0");
    let year = date_time.getFullYear();
    let hours = String(date_time.getHours()).padStart(2, "0");
    let minutes = String(date_time.getMinutes()).padStart(2, "0");
    let seconds = String(date_time.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${date}-${hours}-${minutes}-${seconds}`;
  }

  async upload(file: Express.Multer.File, destination: string, req) {
    if (!file) throw new BadRequestException("file wajib ada");

    const allowedMimeTypes = new ConfigService(".env").getAllowedMimes();

    if (!allowedMimeTypes.includes(file.mimetype))
      throw new BadRequestException(
        "Invalid file type. Only JPG, JPEG and PNG are allowed."
      );

    if (!fs.existsSync(path.join(destination))) fs.mkdirSync(destination);

    let filename: string = "KAS-" + (await this.getDateTime()) + ".webp";
    let oldFileExists: string = path.join(
      process.cwd(),
      destination,
      req.old_filename ?? ""
    );

    try {
      if (req.old_filename && fs.existsSync(oldFileExists)) {
        try {
          fs.unlinkSync(oldFileExists);
        } catch (error) {
          throw new ServiceUnavailableException(error);
        }
      }
    } catch (error) {
      return {
        status: false,
        error: error,
        message: error.message,
      };
    }

    try {
      const res = await sharp(file.buffer)
        .webp({ lossless: false, quality: 60, alphaQuality: 80 })
        .toFile(path.join(destination, filename));

      const config = new ConfigService(".env");

      return {
        status: true,
        originalName: file.originalname,
        newName: filename,
        fileName: file.filename,
        originalSize: file.size,
        currentSize: res.size,
        optimized: file.size - res.size,
        mimeType: file.mimetype,
        url: config.get("APP_URL") + "/kas/view/" + filename,
      };
    } catch (error) {
      return {
        status: false,
        error: error,
      };
    }
  }

  async getPhoto(namafile: string, directory: string) {
    let filepath: string = "";

    const filePattern = `${directory}/${namafile}`;

    globStreamSync(filePattern, {})
      .on("data", (file) => {
        filepath = file;
      })
      .on("end", () => {
        if (!filepath) {
          throw new NotFoundException("File tidak ditemukan");
        }
      });

    return createReadStream(path.join(process.cwd(), filepath));
  }
}
