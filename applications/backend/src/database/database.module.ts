import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydb.sql',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class DataBaseModule {}
