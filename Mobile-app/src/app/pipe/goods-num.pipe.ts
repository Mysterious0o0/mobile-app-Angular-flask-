import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'goodsNum'
})
export class GoodsNumPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
