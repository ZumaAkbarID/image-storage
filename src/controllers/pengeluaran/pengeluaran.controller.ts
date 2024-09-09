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
import { PengeluaranService } from "../../services/pengeluaran.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("pengeluaran")
export class PengeluaranController {
  private directory: string;

  constructor(private readonly pengeluaranService: PengeluaranService) {
    this.directory = "storage/pengeluaran";
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
    return await this.pengeluaranService.upload(file, this.directory, req);
  }

  @Get("view/:namafile")
  async getPhoto(@Param("namafile") namafile: string, @Res() res) {
    const file = await this.pengeluaranService.getPhoto(
      namafile,
      this.directory
    );

    return file.pipe(res);
  }
}
