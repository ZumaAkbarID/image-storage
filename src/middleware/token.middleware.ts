import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ConfigService } from "src/services/config.service";
import * as bcryptjs from "bcryptjs";

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const secret_token = new ConfigService(".env").get("SECRET_TOKEN");

    const header_token = req.header("SECRET-TOKEN");

    if (!header_token) throw new ForbiddenException("token required");

    if (header_token)
      bcryptjs.compare(secret_token, header_token).then((res: boolean) => {
        if (!res) throw new ForbiddenException("invalid token");
      });

    next();
  }
}
