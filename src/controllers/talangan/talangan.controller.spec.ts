import { Test, TestingModule } from "@nestjs/testing";
import { TalanganController } from "./talangan.controller";

describe("KasController", () => {
  let controller: TalanganController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalanganController],
    }).compile();

    controller = module.get<TalanganController>(TalanganController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
