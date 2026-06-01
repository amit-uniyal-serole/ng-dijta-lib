import { Company } from "./model";

export interface Profile {
    profileBasic: ProfileBasic;
}

export interface ProfileBasic {
    name?: string;
    imgSrc?: string;
    userCode?: string;
    email?: string;
    designation?: string;
    layoutType?: string;
    showLayoutOption?: boolean;
    profileActions?: ProfileBasicAction[];
    companyList?: Company[];
    footerTitle?:string;
}
export interface ProfileBasicAction {
    label?: string;
    type?: string;
    color?: string;
    isNotClose?: boolean;
}