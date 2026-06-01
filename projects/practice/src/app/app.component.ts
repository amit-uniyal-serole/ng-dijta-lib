import { Component, inject } from "@angular/core";
import { LayoutServiceService, Menu, DxPermissionsService, CompanyInfo, HeaderIcons, Profile, StyleUtils, PermissionInterface } from "ng-dijta";
import { MENU } from "./menu";
import { DxGlobalConfigService } from "projects/ng-dijta/src/public-api";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  layoutServiceService = inject(LayoutServiceService);
  dxPermissionsService = inject(DxPermissionsService)
  dxGlobalConfigService = inject(DxGlobalConfigService);
  val = 20000;
  menu: any[] = [
    {
      code: 'HOME',
      icon: 'home',
      label: 'Home',
      isDisplay: true,
      route: { path: '/home' },
    },
  ];
  isMenusLoading: boolean = true;
  companyInfo: CompanyInfo = {
    defaultId: 1,
    companyList: [
      {
        logo: 'https://template.canva.com/EAE1YAgPM_U/1/0/400w-R-Meu_EcnME.jpg',
        name: 'Optus Pvt. Ltd.',
        default: true
      }
    ]
  };
  headerIcons: HeaderIcons[] = [
    {
      event: 'check_circle',
      icon: 'check_circle',
      label:'Circle'
    }
  ];
  currentUser: Profile = {
    profileBasic: {
      name: 'Jimmie M. Gerardi',
      imgSrc: 'https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg',
      email: 'JimmieMGerardi@teleworm.us',
      designation: 'Correctional officer',
      showLayoutOption: true,
      companyList: [
        {
          logo: 'https://template.canva.com/EAE1YAgPM_U/1/0/400w-R-Meu_EcnME.jpg',
          name: 'Optus Pvt. Ltd.',
          default: true
        }
      ]
    }
  }
  constructor() {
    StyleUtils.setCSSVariablesFromGroupedColors();
  }
  ngOnInit(): void {
    this.dxGlobalConfigService.setDefaultConfig({
      pageSize: 10
    })
    // setTimeout(() => {
    //   const { can, rules } = new AbilityBuilder(Ability);
    //   can(['create'], 'api');
    //   this.ability.update(rules);
    // }, 3000);
    const permission = [
      {
        "action": "settings.system.oncall.manage.group",
        "subject": [
          "create",
          "delete",
          "edit",
          "view"
        ]
      },
      {
        "action": "settings.system.oncall.manage.members",
        "subject": [
          "create",
          "delete",
          "edit",
          "view"
        ]
      },
      {
        "action": "settings.system.oncall.manage.roster",
        "subject": [
          "create",
          "delete",
          "edit",
          "view"
        ]
      }
    ];
    setTimeout(() => {
      // const { can, rules } = new AbilityBuilder(Ability);
      // permission.forEach((item) => {
      //   can(item.subject, item.action)
      // })
      // this.ability.update([...rules]);
      // console.log('rule UPDATE')
      const permissions: PermissionInterface[] = permission.map((per) => {
        return {
          module: per.action,
          permission: per.subject
        }
      })
      this.dxPermissionsService.updateAbility(permissions)
    }, 5000);

    // this.dxHeaderService.setAppConfig({
    //   title: 'SDR',
    //   fullName: 'SDR',
    //   svg: undefined,
    //   position: 'default',
    // });
    setTimeout(() => {
      this.menu = MENU;
      this.isMenusLoading = false;
    }, 3000);

    setTimeout(() => {
      // this.menu = [
      //   {
      //     code: 'HOME',
      //     icon: 'home',
      //     label: 'Home',
      //     isDisplay: true,
      //     route: { path: '/home' },
      //   },
      // ]
    }, 5000);
  }
}
