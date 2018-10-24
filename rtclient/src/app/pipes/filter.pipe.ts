import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      if (item !== null && item !== undefined) {
        for (const prop in item) {
          if (item.hasOwnProperty(prop)) {
            if (
              item[prop] !== null &&
              item[prop] !== undefined &&
              item[prop].toString().replace(/<[^>]*>/g, '').toLowerCase().includes(searchText)
              ) {
              return true;
            }
          }
        }
      }
      return false;
    });
  }

}
