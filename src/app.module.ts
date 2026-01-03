import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './presentation/controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './application/services/products.service';
import { ProductsModule } from './modules/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    //  Load env variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
   TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    url: config.get<string>('DATABASE_URL'),
    autoLoadEntities: true,
    synchronize: config.get<boolean>('DB_SYNC'),
  }),
}),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
