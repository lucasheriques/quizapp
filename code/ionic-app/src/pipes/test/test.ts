import { Pipe, PipeTransform } from "@angular/core";

/**
 * Generated class for the TestPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: "test",
  pure: false
})
export class TestPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => Object.assign({ key }, value[key]));
  }
}
