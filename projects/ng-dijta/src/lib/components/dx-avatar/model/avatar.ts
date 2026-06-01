export type Style = Partial<CSSStyleDeclaration>;
export type STATUS = 'active' | 'in-active';
export type POSITION = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export interface NgDxAvatar {
    round: boolean;
    size: string | number;
    textSizeRatio: number;
    bgColor: string | undefined;
    fgColor: string;
    borderColor: string;
    style: Style;
    cornerRadius: string | number;
    facebookId: string | null;
    twitter: string | null;
    google: string | null;
}

export interface NgDxAvatarSettings {
    round?: boolean;
    size?: string | number;
    textSizeRatio?: number;
    bgColor?: string | undefined;
    fgColor?: string;
    borderColor?: string | undefined;
    style?: Style;
    cornerRadius?: string | number;
    placeholder?: string;
    initialsSize?: string | number;
    avatarSrc?: string;
    isImageUpload?: boolean;
}
export interface AvatarStatus {
    color?: string,
    position?: POSITION,
    /**
      * @description material icons
      */
    icon?: string,
    toolTip?: string
}

// Avatar
export type AvatarShape = 'circle' | 'squire';
export type AvatarSize = 'sm' | 'md' | 'lg';

export interface Avatar {
    avatarName?: string;
    avatarValue?: string;
    src?: string
    shortName?: string;
}

export interface AvatarSetting {
    size?: AvatarSize;
    shape?: AvatarShape;
    profile?: boolean;
}

export interface DxTableNgDxAvatar {
    avatarName?: string;
    avatarValue?: string;
    src?: string;
    statusSetting?: AvatarStatus,
}

export interface DxAvatarFooterBadge {
    title: string;
    backgroundColor: string;
    color?: string;
    borderRadius?: string;
}