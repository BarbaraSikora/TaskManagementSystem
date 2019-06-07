import { Pipe,PipeTransform } from "@angular/core";

@Pipe({ name: "sort" })
export class ArraySortPipe implements PipeTransform {
    transform(array: Array<any>): Array<string> {
        array.sort((a: any, b: any) => {
            if (a.dueDate < b.dueDate) {
                return -1;
            } else if (a.dueDate > b.dueDate) {
                return 1;
            } else {
               return a.priority - b.priority;
            }
        });

        return array;
    }
}
