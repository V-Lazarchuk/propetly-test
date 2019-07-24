import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sliceStr'
})
export class SliceStrPipe implements PipeTransform {

    transform(value: string, count: number): string {
        if (value.length > count) {
            return value.slice(0, count) + '...';
        } else {
            return value;
        }
    }

}
