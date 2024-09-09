import { Controller, Get, Res, Ip } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response, @Ip() ip) {
    return this.appService.getHello(res, ip);
  }
}
