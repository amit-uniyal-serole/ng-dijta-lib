import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { map, takeWhile } from 'rxjs/operators';
import { DefaultCompany } from './company-logo';
import { AsyncSource } from './model/async-source';
import { AvatarStatus, DxAvatarFooterBadge, NgDxAvatarSettings } from './model/avatar';
import { AvatarSource } from './model/avatar-source.enum';
import { Source } from './model/source';
import { SourceFactory } from './model/source.factory';
import { AvatarService } from './service/avatar.service';
import { Subject } from 'rxjs';
type Style = Partial<CSSStyleDeclaration>;
interface SvgStyles {
  'border-radius': string,
  'width': string | number,
  'height': string | number
}
interface StatusStyles {
  'background-color'?: string,
  'color'?: string
}

@Component({
  selector: 'ndx-avatar',
  templateUrl: './dx-avatar.component.html',
  styleUrls: ['./dx-avatar.component.scss']
})
export class DxAvatarComponent {

  @Input() public avatarSettings!: NgDxAvatarSettings;
  @Input() public footerBadge!: DxAvatarFooterBadge;
  @Input('src')
  public custom?: string | null;
  @Input('icon')
  public icon?: string | null;
  @Input('name')
  public initials?: string | null;
  @Input() public value?: string | null;
  @Input() isCompanyLogo: boolean = false;
  @Input() avatarStatus!: AvatarStatus;
  // external Images
  @Input('facebookId')
  public facebook?: string | null;
  @Input('twitterId')
  public twitter?: string | null;
  @Input('googleId')
  public google?: string | null;
  @Input('instagramId')
  public instagram?: string | null;
  @Input('vkontakteId')
  public vkontakte?: string | null;
  @Input('skypeId')
  public skype?: string | null;
  @Input('gravatarId')
  public gravatar?: string | null;
  @Input('githubId')
  public github?: string | null;
  // 
  @Input('isRecordProfile')
  public isRecordProfile?: boolean = false;

  @Output()
  public clickOnAvatar: EventEmitter<Source> = new EventEmitter<Source>();

  @Output()
  public onImageUpload: EventEmitter<any> = new EventEmitter<any>();

  public isAlive = true;
  public avatarSrc: string | null = null;
  public avatarText: string | null = null;
  public avatarStyle: Style = {};
  public hostStyle: Style = {};

  private currentIndex = -1;
  private sources: Source[] = [];

  public round!: boolean;
  public size!: string | number;
  public textSizeRatio!: number;
  public bgColor: string | undefined;
  public fgColor!: string;
  public borderColor: string | undefined;
  public style!: Style;
  public cornerRadius!: string | number;
  public placeholder?: string;
  public initialsSize!: string | number;
  public isImageUpload: boolean = false;
  defaultLogo: boolean = false;
  defaultCompanyLogo: string = DefaultCompany.logo;
  customSub = new Subject<HTMLElement>();

  constructor(
    public sourceFactory: SourceFactory,
    private avatarService: AvatarService,
    private elementRef: ElementRef
  ) {
  }
  setAvatar(): void {
    this.round = this.avatarSettings?.round ?? true;
    this.size = this.avatarSettings?.size ?? 50;
    this.textSizeRatio = this.avatarSettings?.textSizeRatio ?? 3;
    this.bgColor = this.avatarSettings?.bgColor ?? undefined;
    this.fgColor = this.avatarSettings?.fgColor ?? "#FFF";
    this.borderColor = this.avatarSettings?.borderColor ?? undefined;
    this.style = this.avatarSettings?.style ?? {};
    this.cornerRadius = this.avatarSettings?.cornerRadius ?? 0;
    this.placeholder = this.avatarSettings?.placeholder ?? undefined;
    this.initialsSize = this.avatarSettings?.initialsSize ?? 1;
    this.avatarSrc = this.avatarSettings?.avatarSrc ?? null;
    this.isImageUpload = this.avatarSettings?.isImageUpload ?? false;
  }

  open() {
    this.customSub.next(this.elementRef.nativeElement.querySelector('img'));
  }


  updateInitials(name: string | undefined): string | undefined {
    if (name && name != '' && name != '-') {
      let countOfWords = name.split(' ');
      if (countOfWords.length > 0) {
        if (name && countOfWords.length > 1) {
          name = name;
        } else {
          // taking first two values if we don't have two words
          name =
            name[0] + ' ' + name[1];
        }
      }
    }
    return name
  }

  svgStyles(): SvgStyles {
    const obj: SvgStyles = {
      'border-radius': '50%',
      'width': this.size,
      'height': this.size
    }
    return obj
  }

  setStatus(color: string, icon: string): StatusStyles {
    let status: StatusStyles = {}
    if (icon && color) {
      status = {
        'color': color
      }
    } else {
      status = {
        'background-color': color
      }
    }
    return status
  }

  public onAvatarClicked(): void {
    this.clickOnAvatar.emit(this.sources[this.currentIndex]);
  }

  /**
   * Detect inputs change
   *
   * param {{ [propKey: string]: SimpleChange }} changes
   *
   * memberof AvatarComponent
   */
  public ngOnChanges(changes: SimpleChanges): void {
    this.setAvatar();
    if (this.initials) {
      this.initials = this.updateInitials(this.initials ?? '')
    }
    for (const propName in changes) {
      if (this.avatarService.isSource(propName)) {
        const sourceType: AvatarSource = AvatarSource[propName.toUpperCase() as keyof typeof AvatarSource];
        const currentValue = changes[propName].currentValue;
        if (currentValue && typeof currentValue === 'string') {
          this.addSource(sourceType, currentValue);
        } else {
          this.removeSource(sourceType);
        }
      }
    }
    // reinitialize the avatar component when a source property value has changed
    // the fallback system must be re-invoked with the new values.
    this.initializeAvatar();
  }

  /**
   * Fetch avatar source
   *
   * memberOf AvatarComponent
   */
  public fetchAvatarSource(): void {
    const previousSource = this.sources[this.currentIndex];
    if (previousSource) {
      this.avatarService.markSourceAsFailed(previousSource);
      this.defaultLogo = true
    }

    const source = this.findNextSource();
    if (!source) {
      this.avatarSrc = null;
      return;
    }

    if (this.avatarService.isTextAvatar(source.sourceType)) {
      this.buildTextAvatar(source);
      this.avatarSrc = null;
    } else {
      this.buildImageAvatar(source);
    }
  }

  private findNextSource(): Source | null {
    while (++this.currentIndex < this.sources.length) {
      const source = this.sources[this.currentIndex];
      if (source && !this.avatarService.sourceHasFailedBefore(source)) {
        return source;
      }
    }

    return null;
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }

  /**
   * Initialize the avatar component and its fallback system
   */
  private initializeAvatar(): void {
    this.currentIndex = -1;
    if (this.sources.length > 0) {
      this.sortAvatarSources();
      this.fetchAvatarSource();
      this.hostStyle = {
        width: this.size + 'px',
        height: this.size + 'px'
      };
    }
  }

  private sortAvatarSources(): void {
    this.sources.sort((source1, source2) =>
      this.avatarService.compareSources(source1.sourceType, source2.sourceType)
    );
  }

  private buildTextAvatar(avatarSource: Source): void {
    this.avatarText = avatarSource.getAvatar(+this.initialsSize);
    this.avatarStyle = this.getInitialsStyle(avatarSource.sourceId);
  }

  private buildImageAvatar(avatarSource: Source): void {
    this.avatarStyle = this.getImageStyle();
    if (avatarSource instanceof AsyncSource) {
      this.fetchAndProcessAsyncAvatar(avatarSource);
    } else {
      this.avatarSrc = avatarSource.getAvatar(+this.size);
    }
  }

  /**
   *
   * returns initials style
   *
   * memberOf AvatarComponent
   */
  private getInitialsStyle(avatarValue: string): Style {
    return {
      textAlign: 'center',
      borderRadius: this.round && !this.isRecordProfile ? '100%' : this.isRecordProfile ? 'unset' : this.cornerRadius + 'px',
      border: this.borderColor ? '1px solid ' + this.borderColor : '',
      textTransform: 'capitalize',
      color: this.fgColor,
      backgroundColor: this.bgColor
        ? this.bgColor
        : this.avatarService.getRandomColor(avatarValue),
      font:
        Math.floor(+this.size / this.textSizeRatio) +
        'px Helvetica, Arial, sans-serif',
      lineHeight: this.size + 'px',
      ...this.style
    };
  }

  /**
   *
   * returns image style
   *
   * memberOf AvatarComponent
   */
  private getImageStyle(): Style {
    return {
      maxWidth: '100%',
      borderRadius: this.round && !this.isRecordProfile ? '50%' : this.isRecordProfile ? 'unset' : this.cornerRadius + 'px',
      border: this.borderColor ? '1px solid ' + this.borderColor : '',
      width: this.size + 'px',
      height: this.size + 'px',
      ...this.style,
    };
  }
  /**
   * Fetch avatar image asynchronously.
   *
   * param {Source} source represents avatar source
   * memberof AvatarComponent
   */
  private fetchAndProcessAsyncAvatar(source: AsyncSource): void {
    if (this.avatarService.sourceHasFailedBefore(source)) {
      return;
    }

    this.avatarService
      .fetchAvatar(source.getAvatar(+this.size))
      .pipe(
        takeWhile(() => this.isAlive),
        map(response => source.processResponse(response, +this.size)),
      )
      .subscribe(
        avatarSrc => (this.avatarSrc = avatarSrc),
        err => {
          this.fetchAvatarSource();
        },
      );
  }

  /**
   * Add avatar source
   *
   * param sourceType avatar source type e.g facebook,twitter, etc.
   * param sourceValue  source value e.g facebookId value, etc.
   */
  private addSource(sourceType: AvatarSource, sourceValue: string): void {
    const source = this.sources.find(s => s.sourceType === sourceType);
    if (source) {
      source.sourceId = sourceValue;
    } else {
      this.sources.push(
        this.sourceFactory.newInstance(sourceType, sourceValue),
      );
    }
  }

  /**
   * Remove avatar source
   *
   * param sourceType avatar source type e.g facebook,twitter, etc.
   */
  private removeSource(sourceType: AvatarSource): void {
    this.sources = this.sources.filter(source => source.sourceType !== sourceType);
  }

  fileChangeEvent(event: any) {
    this.onImageUpload.emit(event?.target?.files)
  }

}
