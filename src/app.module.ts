import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Emp, EmpSchema } from './schemas/emp.schema';
import { EmpsService } from './emp.service';
import { UniqueEmpCodeValidator } from './validators/unique-emp-code-validator';
import { EmpController } from './emp.controller';
/*
mongoose connection
*/
const mongoConnection = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    uri: config.get<string>('MONGO_URL'),
  }),
});

/* Defining  mongoose models to be used  in the current scope. */
const mongoModels = MongooseModule.forFeature([
  { name: Emp.name, schema: EmpSchema },
]);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    mongoConnection,
    mongoModels,
  ],
  controllers: [AppController, EmpController],
  providers: [EmpsService, UniqueEmpCodeValidator],
})
export class AppModule {}
