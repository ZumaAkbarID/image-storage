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
import { KasService } from "../../services/kas.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("kas")
export class KasController {
  private directory: string;

  constructor(private readonly kasService: KasService) {
    this.directory = "storage/kas";
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
    return await this.kasService.upload(file, this.directory, req);
  }

  @Get("view/:namafile")
  async getPhoto(@Param("namafile") namafile: string, @Res() res) {
    const file = await this.kasService.getPhoto(namafile, this.directory);

    return file.pipe(res);
  }
}
