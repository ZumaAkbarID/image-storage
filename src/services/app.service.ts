import { Injectable, Res, HttpStatus, Ip } from "@nestjs/common";
import { Response } from "express";
import { createReadStream } from "fs";
import * as path from "path";

@Injectable()
export class AppService {
  getHello(@Res() res: Response, @Ip() ip) {
    return createReadStream(path.join(process.cwd(), "storage/404.jpg")).pipe(
      res
    );
  }
}
