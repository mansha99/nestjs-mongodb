import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError, useContainer } from 'class-validator';

bootstrap();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setUpGlobalValidationPipe(app);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
/**
 * Because this pipe uses the class-validator and class-transformer 
 * libraries, there are many options available. You configure these settings 
 * via a configuration object passed to the pipe. Following are the built-in options:
 * Options passed to validator during validation.
 ValidationPipeOptions 
 exceptionFactory?: (errors: ValidationError[]) => any;
    
 */

async function setUpGlobalValidationPipe(app) {
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        var errorMessages = {};
        errors.forEach((e) => {
          errorMessages[e.property] = Object.values(e.constraints)[0];
        });
        return new UnprocessableEntityException({
          statusCode: 422,
          message: 'Unprocessable Entity',
          errors: errorMessages,
        });
      },
    }),
  );
}

// exceptionFactory	Function	Takes an array of the validation errors
// and returns an exception object to be thrown.
