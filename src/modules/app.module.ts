import { Module } from "@nestjs/common";
import { AppController } from "../controllers/app.controller";
import { AppService } from "../services/app.service";
import { ConfigModule } from "./config.module";
import { PhotoController } from "../controllers/photo/photo.controller";
import { PhotoModule } from "./photo.module";
import { KasModule } from "./kas.module";
import { KasController } from "src/controllers/kas/kas.controller";
import { TalanganModule } from "./talangan.module";
import { TalanganController } from "src/controllers/talangan/talangan.controller";
import { PengeluaranModule } from "./pengeluaran.module";
import { PengeluaranController } from "src/controllers/pengeluaran/pengeluaran.controller";

@Module({
  imports: [
    ConfigModule,
    PhotoModule,
    KasModule,
    TalanganModule,
    PengeluaranModule,
  ],
  controllers: [
    AppController,
    PhotoController,
    KasController,
    TalanganController,
    PengeluaranController,
  ],
  providers: [AppService],
})
export class AppModule {}
