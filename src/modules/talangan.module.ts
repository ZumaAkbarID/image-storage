import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TalanganController } from "../controllers/talangan/talangan.controller";
import { MulterModule } from "@nestjs/platform-express";
import { TalanganService } from "../services/talangan.service";
import { memoryStorage } from "multer";
import { ConfigService } from "../services/config.service";
import { TokenMiddleware } from "../middleware/token.middleware";

@Module({
  imports: [
    MulterModule.register({
      dest: "./storage/talangan",
      storage: memoryStorage(),
    }),
  ],
  controllers: [TalanganController],
  providers: [
    TalanganService,
    {
      provide: ConfigService,
      useValue: new ConfigService(".env"),
    },
  ],
  exports: [TalanganService],
})
export class TalanganModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: "talangan/upload", method: RequestMethod.POST });
  }
}
