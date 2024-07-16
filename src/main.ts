import { MainApp } from './main-app';

async function bootstrap() {
  const app = new MainApp();

  await app.init();
  await app.listen();
}
bootstrap();
