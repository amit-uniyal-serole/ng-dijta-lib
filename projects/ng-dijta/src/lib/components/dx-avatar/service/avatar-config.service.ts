import { Injectable, Inject, Optional } from '@angular/core';
import { AvatarConfig } from '../model/avatar-config';
import { AVATAR_CONFIG } from '../model/avatar-config.token';
import { AvatarSource } from '../model/avatar-source.enum';

@Injectable()
export class AvatarConfigService {
  constructor(
    @Optional()
    @Inject(AVATAR_CONFIG)
    public userConfig: AvatarConfig
  ) {}

  public getAvatarSources(defaultSources: AvatarSource[]): AvatarSource[] {
    if (
      this.userConfig &&
      this.userConfig.sourcePriorityOrder &&
      this.userConfig.sourcePriorityOrder.length
    ) {
      const uniqueSources = [...new Set(this.userConfig.sourcePriorityOrder)];
      const validSources = uniqueSources.filter(source =>
        defaultSources.includes(source)
      );
      return [
        ...validSources,
        ...defaultSources.filter(source => !validSources.includes(source))
      ];
    }
    return defaultSources;
  }

  public getAvatarColors(defaultColors: string[]): string[] {
    return (
      (this.userConfig &&
        this.userConfig.colors &&
        this.userConfig.colors.length &&
        this.userConfig.colors) ||
      defaultColors
    );
  }
}