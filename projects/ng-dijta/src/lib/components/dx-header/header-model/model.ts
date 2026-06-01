export type Notifications = Notification[]

export interface Notification {
    groupName?: string,
    groupList?: GroupList[] | undefined,
    showAvatar?: boolean
}

export interface GroupList {
    pkId?: number
    userName?: string
    notificationData?: string
    isRead?: boolean
    notificationDate?: string
}

export interface NotificationAvatar {
    name?: string
    size?: number
}

export interface HeaderIcons {
    event: string;
    icon: string;
    label:string;
}
export interface UserDetails {
    profileImage?: string;
    firstName?: string;
    lastName?: string
    subtitle?: string;
}
export interface TopBarSettings {
    isSearchVisible: boolean,
    isCompanyVisible: boolean,
    isMenuVisible: boolean,
    isNotificationVisible: boolean,
    isProfileVisible: boolean,
}
export interface ProfileMenuDropdown {
    label: string,
    event: string,
    icon?: string
}
export interface CompanyInfo {
    defaultId?: number;
    companyList?: Company[]
}
export interface Company {
    logo?: string;
    name?: string;
    default?: boolean;
    hideName?: boolean;
}
export interface ReadNotification {
    id?: number,
    groupName?: string,
    isRead?: boolean
}