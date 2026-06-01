import { KeyValueModel } from "../../core";
import { DxTableColumn } from "../dx-table/interfaces/dx-table.interface";
import { DxCanvasData, DxCanvasSetting } from "./model/dx-canvas-interface";
interface demo {
    name?: string
}
export class DxCanvas {
    static readonly ChangeViewOptions: KeyValueModel[] = [
        {
            keyTt: 'canvas-1', // flat
            valueTt: 'canvas-1'
        },
        {
            keyTt: 'canvas-2', // column
            valueTt: 'canvas-2'
        },
        {
            keyTt: 'canvas-3',//mixed
            valueTt: 'canvas-3'
        },
    ]
    static readonly CardListData: DxCanvasData<any>[] = [
        {

            card: {
                data: {
                    name: 'test'
                },
                left: {
                    class: ['avatar-flex'],
                    avatar: {
                        src: 'https://seeklogo.com/images/N/nsw-logo-2E47C9FEF1-seeklogo.com.png',
                        avatarName: 'Demo Card',
                    }
                },
                center: {
                    title: 'Classic Black Rose luxury British Saloon Car',
                    body: {
                        // hideLabel: true,
                        // hideSeparator: true,
                        source: [
                            {
                                labelTt: 'Year',
                                valueTt: '1962',
                                type: 'text',
                            },
                            {
                                labelTt: 'Kilometers',

                                valueTt: '120000',
                                type: 'text',
                            },
                            {
                                labelTt: 'Fuel Type',
                                valueTt: 'petrol',
                                type: 'text',
                            },
                            {
                                labelTt: 'Modified',
                                valueTt: new Date(),
                                type: 'date',
                                settings: {
                                    date: {
                                        format: 'DD-MM-YYYY'
                                    }
                                }
                            },
                        ]
                    },
                    footer: {
                        // hideLabel: true,
                        // hideSeparator: true,
                        source: [
                            {
                                labelTt: 'Place',
                                icon: 'map',
                                valueTt: 'Abbe Cremins',
                                type: 'text',

                            },
                            {
                                labelTt: 'City',
                                valueTt: 'Austin,Texas',
                                type: 'text',
                                icon: 'location_on',
                                color: '#fc5252'
                            },
                            {
                                labelTt: 'Phone',
                                valueTt: '404-243-6434',
                                type: 'text',
                                icon: 'call',
                                color: '#29bc74bf'
                            },
                            {
                                labelTt: 'Email',
                                valueTt: 'reach@gmail.com',
                                type: 'text',
                                icon: 'email',
                                color: '#71a9be'
                            }
                        ]
                    },
                },
                right: {
                    // title: {
                    //   valueTt: '32000',
                    //   type: 'currency',
                    //   color: '#fc5252'
                    // },
                    body: {
                        content: 'Robert Marshall',
                        avatar: {
                            src: 'https://crm.zoho.in/crm/images/customization-images/owner4.jpg',
                            avatarName: 'Robert Marshall'
                        },
                        footer: {
                            valueTt: new Date(),
                            type: 'date',
                            color: '#fc5252',
                            settings: {
                                date: {
                                    format: 'MMMM d, y'
                                }
                            }
                        },
                    }
                }
            }
        },
        {
            card: {
                left: {
                    class: ['avatar-flex'],
                    avatar: {
                        src: 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=300%2C203&ssl=1',
                        avatarName: 'Demo Card',
                    }
                },
                center: {
                    title: 'Romaguera Group',
                    body: {
                        source:
                            [
                                {
                                    labelTt: 'Website',
                                    valueTt: 'www.Romaguera.com',
                                    type: 'text',
                                },

                                {
                                    labelTt: 'Last Activity',
                                    valueTt: new Date(),
                                    type: 'date',
                                }
                            ]
                    },
                    footer: {
                        // hideSeparator: true,
                        // hideLabel: true,
                        source: [
                            {
                                labelTt: 'Place',
                                icon: 'map',
                                valueTt: 'Montgomery',
                                type: 'text',

                            },
                            {
                                labelTt: 'City',
                                valueTt: 'United States',
                                type: 'text',
                                icon: 'location_on',
                                color: '#fc5252'
                            },
                            {
                                labelTt: 'Phone',
                                valueTt: '404-124-4323',
                                type: 'text',
                                icon: 'call',
                                color: '#29bc74bf'
                            },
                            {
                                labelTt: 'Email',
                                valueTt: 'Romaguera@gmail.com',
                                type: 'text',
                                icon: 'email',
                                color: '#71a9be'
                            }
                        ]
                    },
                }, right: {
                    // title: {
                    //   valueTt: '43000',
                    //   type: 'currency',
                    //   color: '#fc5252',
                    //   // settings: {
                    //   //   currency: {
                    //   //     displayType: 'code',
                    //   //     currencyCode: 'MYR'
                    //   //   }
                    //   // }
                    // },
                    body: {
                        content: 'Robert Marshall',
                        avatar: {
                            src: 'https://crm.zoho.in/crm/imagescustomization-images/owner1.jpg',
                            avatarName: 'Robert Marshall'
                        },
                        icon: 'calendar_today',
                        footer: {
                            valueTt: new Date(),
                            type: 'date',
                            color: '#fc5252',
                            settings: {
                                date: {
                                    format: 'MMMM d, y'
                                }
                            }
                        },
                    }
                }
            }
        },
        {
            card: {
                left: {
                    class: ['avatar-flex'],
                    avatar: {
                        src: 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=300%2C203&ssl=1',
                        avatarName: 'Demo Card',
                    }
                },
                center: {
                    title: 'Romaguera Group',
                    body: {
                        source:
                            [
                                {
                                    labelTt: 'Website',
                                    valueTt: 'www.Romaguera.com',
                                    type: 'text',
                                },

                                {
                                    labelTt: 'Last Activity',
                                    valueTt: new Date(),
                                    type: 'date',
                                }
                            ]
                    },
                    footer: {
                        // hideSeparator: true,
                        hideLabel: true,
                        source: [
                            {
                                labelTt: 'Place',
                                icon: 'map',
                                valueTt: 'Montgomery',
                                type: 'text',

                            },
                            {
                                labelTt: 'City',
                                valueTt: 'United States',
                                type: 'text',
                                icon: 'location_on',
                                color: '#fc5252'
                            },
                            {
                                labelTt: 'Phone',
                                valueTt: '404-124-4323',
                                type: 'text',
                                icon: 'call',
                                color: '#29bc74bf'
                            },
                            {
                                labelTt: 'Email',
                                valueTt: 'Romaguera@gmail.com',
                                type: 'text',
                                icon: 'email',
                                color: '#71a9be'
                            }
                        ]
                    },
                }, right: {
                    title: {
                        valueTt: '43000',
                        type: 'currency',
                        color: '#fc5252',
                        // settings: {
                        //   currency: {
                        //     displayType: 'code',
                        //     currencyCode: 'MYR'
                        //   }
                        // }
                    },
                    body: {
                        content: 'Robert Marshall',
                        avatar: {
                            src: 'https://crm.zoho.in/crm/images/customization-images/owner1.jpg',
                            avatarName: 'Robert Marshall'
                        },
                        icon: 'calendar_today',
                        footer: {
                            icon: 'calendar_today',
                            valueTt: new Date(),
                            type: 'date',
                            color: '#fc5252',
                            settings: {
                                date: {
                                    format: 'MMMM d, y'
                                }
                            }
                        },
                    }
                }
            }
        },


    ]
    static readonly testData: DxCanvasData<demo>[] = [{

        card: {
            data: {
                name: 'demo data'
            },
            left: {
                class: ['avatar-flex'],
                avatar: {
                    src: 'https://seeklogo.comimages/N/nsw-logo-2E47C9FEF1-seeklogo.com.png',
                    avatarName: 'Agency',
                    statusSetting: {
                        // color: '#1947cc',
                        position: 'bottom-right',
                        icon: 'account_circle'
                    }
                }
            },
            center: {
                title: 'Agency',
                badge: 'Active',
                subTitle: {
                    valueTt: 'Onboard Indigit Agent',
                    align: 'right',

                },
                body: {

                    // hideSeparator: true,
                    source: [
                        {
                            labelTt: 'Year',
                            valueTt: '1962',
                            type: 'text',
                        },
                        {
                            labelTt: 'Kilometers',

                            valueTt: '120000',
                            type: 'text',
                        },
                        {
                            labelTt: 'Fuel Type',
                            valueTt: 'petrol',
                            type: 'text',
                        },
                        {
                            labelTt: 'Modified',
                            valueTt: new Date(),
                            type: 'date',
                            settings: {
                                date: {
                                    format: 'DD-MM-YYYY'
                                }
                            }
                        },
                    ]
                },
                footer: {
                    hideLabel: true,
                    // hideSeparator: true,
                    source: [
                        {
                            icon: 'map',
                            labelTt: 'Place',

                            valueTt: 'Abbe Cremins',
                            type: 'text',

                        },
                        {
                            labelTt: 'City',
                            valueTt: 'Austin,Texas',
                            type: 'text',
                            icon: 'location_on',
                            color: '#fc5252'
                        },
                        {
                            labelTt: 'Phone',
                            valueTt: '404-243-6434',
                            type: 'text',
                            icon: 'call',
                            color: '#29bc74bf'
                        },
                        {
                            labelTt: 'Email',
                            valueTt: 'reach@gmail.com',
                            type: 'text',
                            icon: 'email',
                            color: '#71a9be'
                        }
                    ]
                },
            },
            right: {
                // title: {
                //   valueTt: '32000',
                //   type: 'currency',
                //   color: '#fc5252'
                // },
                body: {
                    content: 'Martina',
                    avatar: {
                        src: 'https://crm.zoho.in/cr/images/customization-images/owner4.jpg',
                        avatarName: 'Robert Marshall'
                    },
                    footer: {
                        valueTt: new Date(),
                        type: 'date',
                        color: '#fc5252',
                        settings: {
                            date: {
                                format: 'MMMM d, y'
                            }
                        }
                    },
                }
            }
        }
    },
    {
        card: {

            left: {
                class: ['avatar-flex'],
                avatar: {
                    src: 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=300%2C203&ssl=1',
                    avatarName: 'Program',
                    statusSetting: {
                        color: 'green',
                        position: 'bottom-right',
                        icon: 'lock'

                    }
                }
            },
            center: {
                title: 'Program',
                subTitle: {
                    valueTt: 'Manage Program',
                    align: 'bottom',

                },

                body: {
                    source:
                        [
                            {
                                valueTt: 'test description Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed  ',
                                type: 'text'
                            },
                            // {
                            //     labelTt: 'Website',
                            //     valueTt: 'www.Romaguera.com',
                            //     type: 'text',
                            // },

                            // {
                            //     labelTt: 'Last Activity',
                            //     valueTt: new Date(),
                            //     type: 'date',
                            // }
                        ]
                },
                footer: {
                    // hideSeparator: true,
                    // hideLabel: true,
                    source: [
                        {
                            labelTt: 'Place',
                            icon: 'map',
                            valueTt: 'Montgomery',
                            type: 'text',

                        },
                        {
                            labelTt: 'City',
                            valueTt: 'United States',
                            type: 'text',
                            icon: 'location_on',
                            color: '#fc5252'
                        },
                        {
                            labelTt: 'Phone',
                            valueTt: '404-124-4323',
                            type: 'text',
                            icon: 'call',
                            color: '#29bc74bf'
                        },
                        {
                            labelTt: 'Email',
                            valueTt: 'Romaguera@gmail.com',
                            type: 'text',
                            icon: 'email',
                            color: '#71a9be'
                        }
                    ]
                },
            }, right: {
                // title: {
                //   valueTt: '43000',
                //   type: 'currency',
                //   color: '#fc5252',
                //   // settings: {
                //   //   currency: {
                //   //     displayType: 'code',
                //   //     currencyCode: 'MYR'
                //   //   }
                //   // }
                // },
                body: {
                    content: 'sagar',
                    avatar: {
                        src: 'https://crm.zoho.in/crm/imagescustomization-images/owner1.jpg',
                        avatarName: 'Robert Marshall'
                    },
                    icon: 'calendar_today',
                    footer: {
                        valueTt: new Date(),
                        type: 'date',
                        color: '#fc5252',
                        settings: {
                            date: {
                                format: 'MMMM d, y'
                            }
                        }
                    },
                }
            }
        }
    },
    {
        card: {
            isSticky: true,
            left: {
                class: ['avatar-flex'],
                avatar: {
                    src: 'https://seeklogo.com/images/N/nsw-logo-2E47C9FEF1-seeklogo.com.png',
                    avatarName: 'Demo Card',
                    statusSetting: {
                        // icon: 'lock_open',
                        color: '#19df19'
                    }
                }
            },
            center: {
                title: 'Romaguera Group',
                // badge: 'Active',
                body: {
                    source:
                        [
                            {
                                labelTt: 'Website',
                                valueTt: 'www.Romaguera.com',
                                type: 'text',
                            },

                            {
                                labelTt: 'Last Activity',
                                valueTt: new Date(),
                                type: 'date',
                            }
                        ]
                },
                footer: {
                    // hideSeparator: true,
                    hideLabel: true,
                    source: [
                        {
                            labelTt: 'Place',
                            icon: 'map',
                            valueTt: 'Montgomery',
                            type: 'text',

                        },
                        {
                            labelTt: 'City',
                            valueTt: 'United States',
                            type: 'text',
                            icon: 'location_on',
                            color: '#fc5252'
                        },
                        {
                            labelTt: 'Phone',
                            valueTt: '404-124-4323',
                            type: 'text',
                            icon: 'call',
                            color: '#29bc74bf'
                        },
                        {
                            labelTt: 'Email',
                            valueTt: 'Romaguera@gmail.com',
                            type: 'text',
                            icon: 'email',
                            color: '#71a9be'
                        }
                    ]
                },
            }, right: {
                title: {
                    valueTt: '43000',
                    type: 'currency',
                    color: '#fc5252',
                    // settings: {
                    //   currency: {
                    //     displayType: 'code',
                    //     currencyCode: 'MYR'
                    //   }
                    // }
                },
                body: {
                    content: 'charan',
                    avatar: {
                        src: 'https://seeklogo.com/images/N/nsw-logo-2E47C9FEF1-seeklogo.com.png',
                        avatarName: 'Robert Marshall',
                        statusSetting: {
                            color: 'green',
                            position: 'bottom-right',
                            icon: 'lock'

                        }
                    },
                    icon: 'calendar_today',
                    footer: {
                        icon: 'calendar_today',
                        valueTt: new Date(),
                        type: 'date',
                        color: '#fc5252',
                        settings: {
                            date: {
                                format: 'MMMM d, y'
                            }
                        }
                    },
                }
            }
        }
    }, {
        card: {

            left: {
                class: ['avatar-flex'],
                avatar: {
                    src: 'https://seeklogo.com/images/N/nw-logo-2E47C9FEF1-seeklogo.com.png',
                    avatarName: 'Youth Allowance',
                    statusSetting: {
                        color: 'red'
                    }
                }
            },
            center: {
                title: 'Youth Allowance',
                body: {
                    // hideLabel: true,
                    // hideSeparator: true,
                    source: [
                        {
                            labelTt: 'Year',
                            valueTt: '1962',
                            type: 'text',
                        },
                        {
                            labelTt: 'Kilometers',

                            valueTt: '120000',
                            type: 'text',
                        },
                        {
                            labelTt: 'Fuel Type',
                            valueTt: 'petrol',
                            type: 'text',
                        },
                        {
                            labelTt: 'Modified',
                            valueTt: new Date(),
                            type: 'date',
                            settings: {
                                date: {
                                    format: 'DD-MM-YYYY'
                                }
                            }
                        },
                    ]
                },
                footer: {
                    // hideLabel: true,
                    // hideSeparator: true,
                    source: [
                        {
                            labelTt: 'Place',
                            icon: 'map',
                            valueTt: 'Abbe Cremins',
                            type: 'text',

                        },
                        {
                            labelTt: 'City',
                            valueTt: 'Austin,Texas',
                            type: 'text',
                            icon: 'location_on',
                            color: '#fc5252'
                        },
                        {
                            labelTt: 'Phone',
                            valueTt: '404-243-6434',
                            type: 'text',
                            icon: 'call',
                            color: '#29bc74bf'
                        },
                        {
                            labelTt: 'Email',
                            valueTt: 'reach@gmail.com',
                            type: 'text',
                            icon: 'email',
                            color: '#71a9be'
                        }
                    ]
                },
            },
            right: {
                // title: {
                //   valueTt: '32000',
                //   type: 'currency',
                //   color: '#fc5252'
                // },
                body: {
                    content: 'ram',
                    avatar: {
                        src: 'https://crm.zoho.in/crm/images/customization-images/owner4.jpg',
                        avatarName: 'Robert Marshall'
                    },
                    footer: {
                        valueTt: new Date(),
                        type: 'date',
                        color: '#fc5252',
                        settings: {
                            date: {
                                format: 'MMMM d, y'
                            }
                        }
                    },
                }
            }
        }
    },
    {
        card: {
            left: {
                class: ['avatar-flex'],
                avatar: {
                    src: 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=300%2C203&ssl=1',
                    avatarName: 'Demo Card',
                }
            },
            center: {
                title: 'Sai',
                body: {
                    source:
                        [
                            {
                                labelTt: 'Website',
                                valueTt: 'www.Romaguera.com',
                                type: 'text',
                            },

                            {
                                labelTt: 'Last Activity',
                                valueTt: new Date(),
                                type: 'date',
                            }
                        ]
                },
                footer: {
                    // hideSeparator: true,
                    // hideLabel: true,
                    source: [
                        {
                            labelTt: 'Place',
                            icon: 'map',
                            valueTt: 'Montgomery',
                            type: 'text',

                        },
                        {
                            labelTt: 'City',
                            valueTt: 'United States',
                            type: 'text',
                            icon: 'location_on',
                            color: '#fc5252'
                        },
                        {
                            labelTt: 'Phone',
                            valueTt: '404-124-4323',
                            type: 'text',
                            icon: 'call',
                            color: '#29bc74bf'
                        },
                        {
                            labelTt: 'Email',
                            valueTt: 'Romaguera@gmail.com',
                            type: 'text',
                            icon: 'email',
                            color: '#71a9be'
                        }
                    ]
                },
            }, right: {
                // title: {
                //   valueTt: '43000',
                //   type: 'currency',
                //   color: '#fc5252',
                //   // settings: {
                //   //   currency: {
                //   //     displayType: 'code',
                //   //     currencyCode: 'MYR'
                //   //   }
                //   // }
                // },
                body: {
                    content: 'Robert Marshall',
                    avatar: {
                        src: 'https://crm.zoho.in/crm/imagescustomization-images/owner1.jpg',
                        avatarName: 'Robert Marshall'
                    },
                    icon: 'calendar_today',
                    footer: {
                        valueTt: new Date(),
                        type: 'date',
                        color: '#fc5252',
                        settings: {
                            date: {
                                format: 'MMMM d, y'
                            }
                        }
                    },
                }
            }
        }
    },
    {
        card: {
            left: {
                class: ['avatar-flex'],
                avatar: {
                    src: 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=300%2C203&ssl=1',
                    avatarName: 'Demo Card',
                }
            },
            center: {
                title: 'Sai',
                body: {
                    source:
                        [
                            {
                                labelTt: 'Website',
                                valueTt: 'www.Romaguera.com',
                                type: 'text',
                            },

                            {
                                labelTt: 'Last Activity',
                                valueTt: new Date(),
                                type: 'date',
                            }
                        ]
                },
                footer: {
                    // hideSeparator: true,
                    // hideLabel: true,
                    source: [
                        {
                            labelTt: 'Place',
                            icon: 'map',
                            valueTt: 'Montgomery',
                            type: 'text',

                        },
                        {
                            labelTt: 'City',
                            valueTt: 'United States',
                            type: 'text',
                            icon: 'location_on',
                            color: '#fc5252'
                        },
                        {
                            labelTt: 'Phone',
                            valueTt: '404-124-4323',
                            type: 'text',
                            icon: 'call',
                            color: '#29bc74bf'
                        },
                        {
                            labelTt: 'Email',
                            valueTt: 'Romaguera@gmail.com',
                            type: 'text',
                            icon: 'email',
                            color: '#71a9be'
                        }
                    ]
                },
            }, right: {
                // title: {
                //   valueTt: '43000',
                //   type: 'currency',
                //   color: '#fc5252',
                //   // settings: {
                //   //   currency: {
                //   //     displayType: 'code',
                //   //     currencyCode: 'MYR'
                //   //   }
                //   // }
                // },
                body: {
                    content: 'Robert Marshall',
                    avatar: {
                        src: 'https://crm.zoho.in/crm/imagescustomization-images/owner1.jpg',
                        avatarName: 'Robert Marshall'
                    },
                    icon: 'calendar_today',
                    footer: {
                        valueTt: new Date(),
                        type: 'date',
                        color: '#fc5252',
                        settings: {
                            date: {
                                format: 'MMMM d, y'
                            }
                        }
                    },
                }
            }
        }
    }, {
        card: {
            left: {
                class: ['avatar-flex'],
                avatar: {
                    src: 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=300%2C203&ssl=1',
                    avatarName: 'Demo Card',
                }
            },
            center: {
                title: 'Sai',
                body: {
                    source:
                        [
                            {
                                labelTt: 'Website',
                                valueTt: 'www.Romaguera.com',
                                type: 'text',
                            },

                            {
                                labelTt: 'Last Activity',
                                valueTt: new Date(),
                                type: 'date',
                            }
                        ]
                },
                footer: {
                    // hideSeparator: true,
                    // hideLabel: true,
                    source: [
                        {
                            labelTt: 'Place',
                            icon: 'map',
                            valueTt: 'Montgomery',
                            type: 'text',

                        },
                        {
                            labelTt: 'City',
                            valueTt: 'United States',
                            type: 'text',
                            icon: 'location_on',
                            color: '#fc5252'
                        },
                        {
                            labelTt: 'Phone',
                            valueTt: '404-124-4323',
                            type: 'text',
                            icon: 'call',
                            color: '#29bc74bf'
                        },
                        {
                            labelTt: 'Email',
                            valueTt: 'Romaguera@gmail.com',
                            type: 'text',
                            icon: 'email',
                            color: '#71a9be'
                        }
                    ]
                },
            }, right: {
                // title: {
                //   valueTt: '43000',
                //   type: 'currency',
                //   color: '#fc5252',
                //   // settings: {
                //   //   currency: {
                //   //     displayType: 'code',
                //   //     currencyCode: 'MYR'
                //   //   }
                //   // }
                // },
                body: {
                    content: 'Robert Marshall',
                    avatar: {
                        src: 'https://crm.zoho.in/crm/imagescustomization-images/owner1.jpg',
                        avatarName: 'Robert Marshall'
                    },
                    icon: 'calendar_today',
                    footer: {
                        valueTt: new Date(),
                        type: 'date',
                        color: '#fc5252',
                        settings: {
                            date: {
                                format: 'MMMM d, y'
                            }
                        }
                    },
                }
            }
        }
    }, {
        card: {
            left: {
                class: ['avatar-flex'],
                avatar: {
                    src: 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=300%2C203&ssl=1',
                    avatarName: 'Demo Card',
                }
            },
            center: {
                title: 'Sai',
                body: {
                    source:
                        [
                            {
                                labelTt: 'Website',
                                valueTt: 'www.Romaguera.com',
                                type: 'text',
                            },

                            {
                                labelTt: 'Last Activity',
                                valueTt: new Date(),
                                type: 'date',
                            }
                        ]
                },
                footer: {
                    // hideSeparator: true,
                    // hideLabel: true,
                    source: [
                        {
                            labelTt: 'Place',
                            icon: 'map',
                            valueTt: 'Montgomery',
                            type: 'text',

                        },
                        {
                            labelTt: 'City',
                            valueTt: 'United States',
                            type: 'text',
                            icon: 'location_on',
                            color: '#fc5252'
                        },
                        {
                            labelTt: 'Phone',
                            valueTt: '404-124-4323',
                            type: 'text',
                            icon: 'call',
                            color: '#29bc74bf'
                        },
                        {
                            labelTt: 'Email',
                            valueTt: 'Romaguera@gmail.com',
                            type: 'text',
                            icon: 'email',
                            color: '#71a9be'
                        }
                    ]
                },
            }, right: {
                // title: {
                //   valueTt: '43000',
                //   type: 'currency',
                //   color: '#fc5252',
                //   // settings: {
                //   //   currency: {
                //   //     displayType: 'code',
                //   //     currencyCode: 'MYR'
                //   //   }
                //   // }
                // },
                body: {
                    content: 'Robert Marshall',
                    avatar: {
                        src: 'https://crm.zoho.in/crm/imagescustomization-images/owner1.jpg',
                        avatarName: 'Robert Marshall'
                    },
                    icon: 'calendar_today',
                    footer: {
                        valueTt: new Date(),
                        type: 'date',
                        color: '#fc5252',
                        settings: {
                            date: {
                                format: 'MMMM d, y'
                            }
                        }
                    },
                }
            }
        }
    }, {
        card: {
            left: {
                class: ['avatar-flex'],
                avatar: {
                    src: 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=300%2C203&ssl=1',
                    avatarName: 'Demo Card',
                }
            },
            center: {
                title: 'Sai',
                body: {
                    source:
                        [
                            {
                                labelTt: 'Website',
                                valueTt: 'www.Romaguera.com',
                                type: 'text',
                            },

                            {
                                labelTt: 'Last Activity',
                                valueTt: new Date(),
                                type: 'date',
                            }
                        ]
                },
                footer: {
                    // hideSeparator: true,
                    // hideLabel: true,
                    source: [
                        {
                            labelTt: 'Place',
                            icon: 'map',
                            valueTt: 'Montgomery',
                            type: 'text',

                        },
                        {
                            labelTt: 'City',
                            valueTt: 'United States',
                            type: 'text',
                            icon: 'location_on',
                            color: '#fc5252'
                        },
                        {
                            labelTt: 'Phone',
                            valueTt: '404-124-4323',
                            type: 'text',
                            icon: 'call',
                            color: '#29bc74bf'
                        },
                        {
                            labelTt: 'Email',
                            valueTt: 'Romaguera@gmail.com',
                            type: 'text',
                            icon: 'email',
                            color: '#71a9be'
                        }
                    ]
                },
            }, right: {
                // title: {
                //   valueTt: '43000',
                //   type: 'currency',
                //   color: '#fc5252',
                //   // settings: {
                //   //   currency: {
                //   //     displayType: 'code',
                //   //     currencyCode: 'MYR'
                //   //   }
                //   // }
                // },
                body: {
                    content: 'Robert Marshall',
                    avatar: {
                        src: 'https://crm.zoho.in/crm/imagescustomization-images/owner1.jpg',
                        avatarName: 'Robert Marshall'
                    },
                    icon: 'calendar_today',
                    footer: {
                        valueTt: new Date(),
                        type: 'date',
                        color: '#fc5252',
                        settings: {
                            date: {
                                format: 'MMMM d, y'
                            }
                        }
                    },
                }
            }
        }
    }, {
        card: {
            left: {
                class: ['avatar-flex'],
                avatar: {
                    src: 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=300%2C203&ssl=1',
                    avatarName: 'Demo Card',
                }
            },
            center: {
                title: 'Sai',
                body: {
                    source:
                        [
                            {
                                labelTt: 'Website',
                                valueTt: 'www.Romaguera.com',
                                type: 'text',
                            },

                            {
                                labelTt: 'Last Activity',
                                valueTt: new Date(),
                                type: 'date',
                            }
                        ]
                },
                footer: {
                    // hideSeparator: true,
                    // hideLabel: true,
                    source: [
                        {
                            labelTt: 'Place',
                            icon: 'map',
                            valueTt: 'Montgomery',
                            type: 'text',

                        },
                        {
                            labelTt: 'City',
                            valueTt: 'United States',
                            type: 'text',
                            icon: 'location_on',
                            color: '#fc5252'
                        },
                        {
                            labelTt: 'Phone',
                            valueTt: '404-124-4323',
                            type: 'text',
                            icon: 'call',
                            color: '#29bc74bf'
                        },
                        {
                            labelTt: 'Email',
                            valueTt: 'Romaguera@gmail.com',
                            type: 'text',
                            icon: 'email',
                            color: '#71a9be'
                        }
                    ]
                },
            }, right: {
                // title: {
                //   valueTt: '43000',
                //   type: 'currency',
                //   color: '#fc5252',
                //   // settings: {
                //   //   currency: {
                //   //     displayType: 'code',
                //   //     currencyCode: 'MYR'
                //   //   }
                //   // }
                // },
                body: {
                    content: 'Robert Marshall',
                    avatar: {
                        src: 'https://crm.zoho.in/crm/imagescustomization-images/owner1.jpg',
                        avatarName: 'Robert Marshall'
                    },
                    icon: 'calendar_today',
                    footer: {
                        valueTt: new Date(),
                        type: 'date',
                        color: '#fc5252',
                        settings: {
                            date: {
                                format: 'MMMM d, y'
                            }
                        }
                    },
                }
            }
        }
    }, {
        card: {
            left: {
                class: ['avatar-flex'],
                avatar: {
                    src: 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=300%2C203&ssl=1',
                    avatarName: 'Demo Card',
                }
            },
            center: {
                title: 'Sai',
                body: {
                    source:
                        [
                            {
                                labelTt: 'Website',
                                valueTt: 'www.Romaguera.com',
                                type: 'text',
                            },

                            {
                                labelTt: 'Last Activity',
                                valueTt: new Date(),
                                type: 'date',
                            }
                        ]
                },
                footer: {
                    // hideSeparator: true,
                    // hideLabel: true,
                    source: [
                        {
                            labelTt: 'Place',
                            icon: 'map',
                            valueTt: 'Montgomery',
                            type: 'text',

                        },
                        {
                            labelTt: 'City',
                            valueTt: 'United States',
                            type: 'text',
                            icon: 'location_on',
                            color: '#fc5252'
                        },
                        {
                            labelTt: 'Phone',
                            valueTt: '404-124-4323',
                            type: 'text',
                            icon: 'call',
                            color: '#29bc74bf'
                        },
                        {
                            labelTt: 'Email',
                            valueTt: 'Romaguera@gmail.com',
                            type: 'text',
                            icon: 'email',
                            color: '#71a9be'
                        }
                    ]
                },
            }, right: {
                // title: {
                //   valueTt: '43000',
                //   type: 'currency',
                //   color: '#fc5252',
                //   // settings: {
                //   //   currency: {
                //   //     displayType: 'code',
                //   //     currencyCode: 'MYR'
                //   //   }
                //   // }
                // },
                body: {
                    content: 'Robert Marshall',
                    avatar: {
                        src: 'https://crm.zoho.in/crm/imagescustomization-images/owner1.jpg',
                        avatarName: 'Robert Marshall'
                    },
                    icon: 'calendar_today',
                    footer: {
                        valueTt: new Date(),
                        type: 'date',
                        color: '#fc5252',
                        settings: {
                            date: {
                                format: 'MMMM d, y'
                            }
                        }
                    },
                }
            }
        }
    }, {
        card: {
            left: {
                class: ['avatar-flex'],
                avatar: {
                    src: 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=300%2C203&ssl=1',
                    avatarName: 'Demo Card',
                }
            },
            center: {
                title: 'Sai',
                body: {
                    source:
                        [
                            {
                                labelTt: 'Website',
                                valueTt: 'www.Romaguera.com',
                                type: 'text',
                            },

                            {
                                labelTt: 'Last Activity',
                                valueTt: new Date(),
                                type: 'date',
                            }
                        ]
                },
                footer: {
                    // hideSeparator: true,
                    // hideLabel: true,
                    source: [
                        {
                            labelTt: 'Place',
                            icon: 'map',
                            valueTt: 'Montgomery',
                            type: 'text',

                        },
                        {
                            labelTt: 'City',
                            valueTt: 'United States',
                            type: 'text',
                            icon: 'location_on',
                            color: '#fc5252'
                        },
                        {
                            labelTt: 'Phone',
                            valueTt: '404-124-4323',
                            type: 'text',
                            icon: 'call',
                            color: '#29bc74bf'
                        },
                        {
                            labelTt: 'Email',
                            valueTt: 'Romaguera@gmail.com',
                            type: 'text',
                            icon: 'email',
                            color: '#71a9be'
                        }
                    ]
                },
            }, right: {
                // title: {
                //   valueTt: '43000',
                //   type: 'currency',
                //   color: '#fc5252',
                //   // settings: {
                //   //   currency: {
                //   //     displayType: 'code',
                //   //     currencyCode: 'MYR'
                //   //   }
                //   // }
                // },
                body: {
                    content: 'Robert Marshall',
                    avatar: {
                        src: 'https://crm.zoho.in/crm/imagescustomization-images/owner1.jpg',
                        avatarName: 'Robert Marshall'
                    },
                    icon: 'calendar_today',
                    footer: {
                        valueTt: new Date(),
                        type: 'date',
                        color: '#fc5252',
                        settings: {
                            date: {
                                format: 'MMMM d, y'
                            }
                        }
                    },
                }
            }
        }
    },
    {
        card: {
            left: {
                class: ['avatar-flex'],
                avatar: {
                    src: 'https://i1.wp.com/www.sltechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=300%2C203&ssl=1',
                    avatarName: 'Demo Card',
                }
            },
            center: {
                title: 'Mark',
                body: {
                    source:
                        [
                            {
                                labelTt: 'Website',
                                valueTt: 'www.Romaguera.com',
                                type: 'text',
                            },

                            {
                                labelTt: 'Last Activity',
                                valueTt: new Date(),
                                type: 'date',
                            }
                        ]
                },
                footer: {
                    // hideSeparator: true,
                    hideLabel: true,
                    source: [
                        {
                            labelTt: 'Place',
                            icon: 'map',
                            valueTt: 'Montgomery',
                            type: 'text',

                        },
                        {
                            labelTt: 'City',
                            valueTt: 'United States',
                            type: 'text',
                            icon: 'location_on',
                            color: '#fc5252'
                        },
                        {
                            labelTt: 'Phone',
                            valueTt: '404-124-4323',
                            type: 'text',
                            icon: 'call',
                            color: '#29bc74bf'
                        },
                        {
                            labelTt: 'Email',
                            valueTt: 'Romaguera@gmail.com',
                            type: 'text',
                            icon: 'email',
                            color: '#71a9be'
                        }
                    ]
                },
            }, right: {
                title: {
                    valueTt: '43000',
                    type: 'currency',
                    color: '#fc5252',
                    // settings: {
                    //   currency: {
                    //     displayType: 'code',
                    //     currencyCode: 'MYR'
                    //   }
                    // }
                },
                body: {
                    content: 'Krishna',
                    avatar: {
                        src: 'https://crm.zoho.in/crm/images/customization-images/owner1.jpg',
                        avatarName: 'Robert Marshall'
                    },
                    icon: 'calendar_today',
                    footer: {
                        icon: 'calendar_today',
                        valueTt: new Date(),
                        type: 'date',
                        color: '#fc5252',
                        settings: {
                            date: {
                                format: 'MMMM d, y'
                            }
                        }
                    },
                }
            }
        }
    },]
    static readonly MockSetting: DxCanvasSetting = {
        viewType: 'canvas-3',
        toggleStickySettings: true,

        pageSize: 5,
        pagination: true,
        totalItems: 100,
        paginationFirstLastButtons: true,
        multiSelect: true,
        leftSectionAvatar: {
            size: 50,
            round: false,
            cornerRadius: 4,
            // textSizeRatio: 
            initialsSize: 2,
        },
        rightSectionAvatar: {
            size: 49,
            round: false,
            cornerRadius: 4,
            textSizeRatio: 3,
            initialsSize: 2,

        },
        multiActionButtonSettings:
        {
            title: 'New Agency',
            type: 'agency',
            show: true,
            class: 'dxBtn',

            multiActionDropDown: {
                show: true,
                menuList: [
                    {
                        label: 'Create',
                        event: 'create',

                    },
                    {
                        label: 'Edit',
                        event: 'edit',

                    },

                ]
            }
        },
        // paginatorDropDown: {
        //     label: 'canvas-3',
        //     itemLabelAsMenuLabel: true,
        //     menuList: [
        //         {
        //             event: 'canvas-1',
        //             label: 'canvas-1',
        //             icon: 'view_headline'
        //         },
        //         {
        //             event: 'canvas-2',
        //             label: 'canvas-2',
        //             icon: 'view_column'
        //         },
        //         {
        //             event: 'canvas-3',
        //             label: 'canvas-3',
        //             icon: 'horizontal_split'
        //         }
        //     ]
        // }
    }
    static readonly CardActions: DxTableColumn<any> = {
        title: '',
        columnDef: 'action',
        field: 'action',
        type: 'action',
        avatarType:'avatar_with_text',
        actionType: ['menu'],
        menuOptions: [{
            event: 'edit',
            label: 'Edit',
            icon: 'edit'
        }, {
            event: 'view',
            label: 'View',
            icon: 'visibility'
        }]
    }
}