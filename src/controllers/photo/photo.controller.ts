import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { PhotoService } from "../../services/photo.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("photo")
export class PhotoController {
  private directory: string;

  constructor(private readonly photoService: PhotoService) {
    this.directory = "storage/photo";
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    req: {
      old_filename: string | null;
    }
  ) {
    return await this.photoService.upload(file, this.directory, req);
  }

  @Get("view/:namafile")
  async getPhoto(@Param("namafile") namafile: string, @Res() res) {
    const file = await this.photoService.getPhoto(namafile, this.directory);

    return file.pipe(res);
  }
}
