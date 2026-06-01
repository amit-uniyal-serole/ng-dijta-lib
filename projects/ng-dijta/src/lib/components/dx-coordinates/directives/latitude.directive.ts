import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import _Inputmask from 'inputmask';
import type Inputmask from 'inputmask';
import { Direction } from "./coordinates-directive/direction.enum";
const InputmaskConstructor =
  (_Inputmask as unknown as { default?: Inputmask.Static }).default ||
  _Inputmask;
@Directive({
  selector: '[latitudeMask]'
})
export class LatitudeMaskDirective implements OnInit {
  @Input() direction: Direction | undefined;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // `[#]` wraps the sign character in inputmask's optional-group syntax so
    // users can type digits directly without first entering `+` / `-`.
    if (this.direction && this.direction === 2) {
      InputmaskConstructor({
        mask: '[#]999° 99\' 99\" E',
        definitions: {
          'E': {
            validator: "[EW]",
            cardinality: 1,
            casing: "upper"
          },
          '#': {
            validator: "[+-]",
            cardinality: 1,
          }
        },
      }).mask(this.el.nativeElement);
    } else if (this.direction && this.direction === 1) {
      InputmaskConstructor({
        mask: '[#]99° 99\' 99\" N',
        definitions: {
          'N': {
            validator: "[NS]",
            cardinality: 1,
            casing: "upper"
          },
          '#': {
            validator: "[+-]",
            cardinality: 1,
          }
        }
      }).mask(this.el.nativeElement);
    }

  }

}

