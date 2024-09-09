import { ApplicationContext } from './app.context';
import { ConfigService } from './services/config.service';

async function bootstrap() {
  const app = await ApplicationContext();
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'Secret-Token'],
  });
  await app.listen(app.get(ConfigService).getInt('APP_PORT'));
}
bootstrap();
