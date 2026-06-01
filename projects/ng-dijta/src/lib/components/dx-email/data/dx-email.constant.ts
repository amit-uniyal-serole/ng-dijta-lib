export class DxEmail {
    static readonly MailMenu: any = [
        {
            title: 'MAILBOXES',
            items: [
                {
                    icon: 'inbox',
                    label: 'Inbox',
                    key: 'inbox',
                },
                {
                    icon: 'send',
                    label: 'Sent',
                    key: 'sent',
                },
                {
                    icon: 'drafts',
                    label: 'Drafts',
                    key: 'draft',
                },
                {
                    icon: 'warning_amber',
                    label: 'Spam',
                    key: 'spam',
                },
                {
                    icon: 'delete',
                    label: 'Trash',
                    key: 'trash',
                },
            ],
        },
        {
            title: 'FILTERS',
            items: [
                {
                    icon: 'star_outline',
                    label: 'Starred',
                    key: 'starred',
                },
                {
                    icon: 'error_outline',
                    label: 'Important',
                    key: 'important',
                },
            ],
        },
        {
            title: 'LABELS',
            items: [
                {
                    icon: 'local_offer',
                    label: 'Personal',
                    key: 'personal',
                    color: '#89b4fa',
                },
                {
                    icon: 'local_offer',
                    label: 'Work',
                    key: 'work',
                    color: '#a1a3f7',
                },
                {
                    icon: 'local_offer',
                    label: 'Payments',
                    key: 'payments',
                    color: '#f69595',
                },
                {
                    icon: 'local_offer',
                    label: 'Invoices',
                    key: 'invoices',
                    color: '#72d4ca',
                },
                {
                    icon: 'local_offer',
                    label: 'Accounts',
                    key: 'accounts',
                    color: '#cb99fa',
                },
                {
                    icon: 'local_offer',
                    label: 'Forums',
                    key: 'forums',
                    color: '#ace9c2',
                },
            ],
        },
        {
            items: [
                {
                    icon: 'settings',
                    label: 'Settings',
                    key: 'settings',
                },
            ],
        },
    ];
    static readonly LABELS = [
        {
            icon: 'local_offer',
            label: 'Personal',
            key: 'personal',
            color: '#3B82F6',
        },
        {
            icon: 'local_offer',
            label: 'Work',
            key: 'work',
            color: '#6366F1',
        },
        {
            icon: 'local_offer',
            label: 'Payments',
            key: 'payments',
            color: '#EF4444',
        },
        // {
        //   icon: 'local_offer',
        //   label: 'Invoices',
        //   key: 'invoices',
        //   color: '#14B8A6',
        // },
        // {
        //   icon: 'local_offer',
        //   label: 'Accounts',
        //   key: 'accounts',
        //   color: '#A855F7',
        // },
        // {
        //   icon: 'local_offer',
        //   label: 'Forums',
        //   key: 'forums',
        //   color: '#22C55E',
        // },
    ];
    static readonly DETAIL_VIEW_MENU = [
        {
            icon: 'local_offer',
            key: 'tags',
            subMenu: DxEmail.MailMenu[2].items.map((menu: any) => {
                menu['checkbox'] = true
                return menu
            })
        },
        {
            icon: 'error_outline',
            key: 'important',
        },
        {
            icon: 'star_outline',
            key: 'starred',
        },
        {
            icon: 'more_vert',
            key: 'menu',
            subMenu: [{
                icon: 'mail',
                label: 'Mark as unread',
                key: 'markAsRead'
            }, {
                icon: 'warning_amber',
                label: 'Spam',
                key: 'spam'
            },
            {
                icon: 'delete',
                label: 'Delete',
                key: 'delete'
            }]
        },
    ];
    static readonly QuillConfig = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline'], // toggled buttons

                [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                [{ font: [] }],
                [{ align: [] }],

                ['link', 'image'], // link and image, video
                ['emoji'],
            ],
        },
        'emoji-toolbar': true,
        'emoji-textarea': false,
        'emoji-shortname': true,
    };
}