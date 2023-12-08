import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinByComma'
})
export class JoinByCommaPipe implements PipeTransform {
  transform(value: any[], prop?: string): string {
    if (!value) {
      return '';
    }

    if(prop) {
      return value.map((item: any) => item[prop]).join(', ');
    }
    return value.join(', ');
  }
}
