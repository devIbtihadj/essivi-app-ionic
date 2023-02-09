import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maps'
})
export class MapsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
