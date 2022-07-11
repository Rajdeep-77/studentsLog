import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  pure: false
})
export class FilterPipePipe implements PipeTransform {

  transform(items: any[], args: any) {
    return items.filter(item => item.id.indexOf(args) !== -1);
}

}
