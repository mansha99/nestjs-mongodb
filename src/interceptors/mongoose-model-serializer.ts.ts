import {
  ClassSerializerInterceptor,
  PlainLiteralObject,
  Type,
} from '@nestjs/common';
import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { Document } from 'mongoose';

/*

MongooseModelSerializer : used to serialize MongoDB objects in appropriate format

*/
function MongooseModelSerializer(
  classToIntercept: Type,
): typeof ClassSerializerInterceptor {
  return class Interceptor extends ClassSerializerInterceptor {
    private formatResponse(
      response: PlainLiteralObject | PlainLiteralObject[],
    ) {
      if (Array.isArray(response)) {
        return response.map(this.changePlainObjectToClass);
      }
      return this.changePlainObjectToClass(response);
    }

    private changePlainObjectToClass(document: PlainLiteralObject) {
      if (document instanceof Document) {
        /*
        plainToClass Converts plain (any) object to given class object.
        In emp.controller.ts we have used it as:
        @UseInterceptors(MongooseClassSerializerInterceptor(Emp))
        Thus unnnecessary attributes are stripped off.
        */
        return plainToClass(classToIntercept, document.toJSON());
      }
      return document;
    }

    serialize(
      response: PlainLiteralObject | PlainLiteralObject[],
      options: ClassTransformOptions,
    ) {
      return super.serialize(this.formatResponse(response), options);
    }
  };
}

export default MongooseModelSerializer;
