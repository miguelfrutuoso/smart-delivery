import { Time } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTranform'
})
export class DateTranformPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): String {
    return value.substring(11, 16);
  }

}
