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
import { TalanganService } from "../../services/talangan.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("talangan")
export class TalanganController {
  private directory: string;

  constructor(private readonly talanganService: TalanganService) {
    this.directory = "storage/talangan";
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
    return await this.talanganService.upload(file, this.directory, req);
  }

  @Get("view/:namafile")
  async getPhoto(@Param("namafile") namafile: string, @Res() res) {
    const file = await this.talanganService.getPhoto(namafile, this.directory);

    return file.pipe(res);
  }
}
