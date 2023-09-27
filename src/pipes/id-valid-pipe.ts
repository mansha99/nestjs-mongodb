import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
/*

In MongoDB , each document has "_id" as unique key.
This pipe makes sure that _id is in correct format.
More details at : https://www.mongodb.com/docs/manual/reference/method/ObjectId/
*/
@Injectable()
export class IdValidPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      throw new UnprocessableEntityException({ id: 'Invalid Id' });
    }
    return value;
  }
}
