import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[dxBalancedBrackets]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: BalancedBracketsDirective,
    multi: true
  }]
})
export class BalancedBracketsDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl<any, any>): { [key: string]: { valid: boolean } } | null {
    if (control?.value) {
      if (this.areBracketsBalanced(control?.value) === 'invalid data') {
        return {
          inValidData: {
            valid: false
          }
        };
      } else {
        if (!this.areBracketsBalanced(control?.value)) {
          return {
            inValidBrackets: {
              valid: false
            }
          };
        } else {
          return null;
        }
      }
    } else {
      return null
    }
  }

  areBracketsBalanced(pattern: string): boolean | string {
    if (pattern?.includes('(' || ')')) {
      const paranthesis: string = pattern.split("").filter(patternChar => patternChar === '(' || patternChar === ')').join("");
      let i = -1;
      let stack: any = [];
      for (let ch of paranthesis) {
        if (ch === '(' || ch === '{' || ch === '[') {
          stack.push(ch);
          i++;
        } else {
          if (i >= 0 && ((stack[i] === '(' && ch === ')') || (stack[i] === '{' && ch === '}') || (stack[i] === '[' && ch === ']'))) {
            stack.pop();
            i--;
          } else {
            return false;
          }
        }
      }
      return i === -1;
    } else {
      return 'invalid data'
    }
  }



}
