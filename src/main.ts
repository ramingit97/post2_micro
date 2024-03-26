import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, RmqOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { RmqService } from './rmq/rmq.service';

async function bootstrap() {
  const appTcp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'post-service2',
        port: 6000,
      },
    },
  );
  const rmqService = appTcp.get<RmqService>(RmqService);
  const appRmq = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    rmqService.getOptions('post_queue2')
  );

  await appTcp.listen();
  await appRmq.listen();
}
bootstrap();
