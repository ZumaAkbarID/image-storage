import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { PengeluaranController } from "../controllers/pengeluaran/pengeluaran.controller";
import { MulterModule } from "@nestjs/platform-express";
import { PengeluaranService } from "../services/pengeluaran.service";
import { memoryStorage } from "multer";
import { ConfigService } from "../services/config.service";
import { TokenMiddleware } from "../middleware/token.middleware";

@Module({
  imports: [
    MulterModule.register({
      dest: "./storage/pengeluaran",
      storage: memoryStorage(),
    }),
  ],
  controllers: [PengeluaranController],
  providers: [
    PengeluaranService,
    {
      provide: ConfigService,
      useValue: new ConfigService(".env"),
    },
  ],
  exports: [PengeluaranService],
})
export class PengeluaranModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: "pengeluaran/upload", method: RequestMethod.POST });
  }
}
