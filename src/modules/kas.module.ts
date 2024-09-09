import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { KasController } from "../controllers/kas/kas.controller";
import { MulterModule } from "@nestjs/platform-express";
import { KasService } from "../services/kas.service";
import { memoryStorage } from "multer";
import { ConfigService } from "../services/config.service";
import { TokenMiddleware } from "../middleware/token.middleware";

@Module({
  imports: [
    MulterModule.register({
      dest: "./storage/kas",
      storage: memoryStorage(),
    }),
  ],
  controllers: [KasController],
  providers: [
    KasService,
    {
      provide: ConfigService,
      useValue: new ConfigService(".env"),
    },
  ],
  exports: [KasService],
})
export class KasModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: "kas/upload", method: RequestMethod.POST });
  }
}
