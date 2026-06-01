import { Menu } from "../model/menu";

export class MenuData {
    static readonly MENU: Menu[] = [
        {
            label: 'Home',
            code: 'HOME',
            icon: 'home',
            active: true,
            route: {
                path: '/home',
                param: undefined
            },
        },
        {
            label: 'Payment',
            code: 'PAYMENT',
            icon: 'request_quote',
            children: [
                {
                    parentId: 'PAYMENT',
                    label: 'Process Payfort Payment',
                    code: 'PROCESS_PAYFORT_PAYMENT',
                    route: {
                        path: '/process-payment',
                    }
                }
            ]
        },
        {
            label: 'organization',
            code: 'ORGANIZATION',
            icon: 'corporate_fare',
            route: {
                path: '/usermanagement',
                param: {
                    id: 23
                }
            },
        }
    ]
}