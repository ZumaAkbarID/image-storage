import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { PhotoController } from "../controllers/photo/photo.controller";
import { MulterModule } from "@nestjs/platform-express";
import { PhotoService } from "../services/photo.service";
import { memoryStorage } from "multer";
import { ConfigService } from "../services/config.service";
import { TokenMiddleware } from "../middleware/token.middleware";

@Module({
  imports: [
    MulterModule.register({
      dest: "./storage/photo",
      storage: memoryStorage(),
    }),
  ],
  controllers: [PhotoController],
  providers: [
    PhotoService,
    {
      provide: ConfigService,
      useValue: new ConfigService(".env"),
    },
  ],
  exports: [PhotoService],
})
export class PhotoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: "photo/upload", method: RequestMethod.POST });
  }
}
