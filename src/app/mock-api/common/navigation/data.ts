/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'manage-campaigns',
        title: 'HOME',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/admin/campaigns',
        role: 'Administrator',
    },
    {
        id: 'manage-cause',
        title: 'CAUSE',
        type: 'basic',
        icon: 'heroicons_outline:eye',
        link: '/admin/cause',
        role: 'Administrator',
    },
    {
        id: 'manage-symptoms',
        title: 'SYMPTOMS',
        type: 'basic',
        icon: 'heroicons_outline:clipboard',
        link: '/admin/symptoms',
        role: 'Administrator',
    },
    {
        id: 'manage-pharmacy',
        title: 'PHARMACY',
        type: 'basic',
        icon: 'heroicons_outline:inbox',
        link: '/admin/pharmacy',
        role: 'Administrator',
    },
    {
        id: 'manage-drug',
        title: 'DRUG',
        type: 'basic',
        icon: 'heroicons_outline:link',
        link: '/admin/drug',
        role: 'Administrator',
    },
    {
        id: 'manage-doctor',
        title: 'DOCTOR',
        type: 'basic',
        icon: 'heroicons_outline:users',
        link: '/admin/doctor',
        role: 'Administrator',
    },
    // {
    //     id: 'updateProfile',
    //     title: 'PAGES',
    //     type: 'basic',
    //     icon: 'heroicons_outline:clipboard',
    //     link: '/user/profile',
    // },
    // {
    //     id: 'manageLicense',
    //     title: 'PORTFOLIOUS',
    //     type: 'basic',
    //     icon: 'heroicons_outline:inbox',
    //     link: '/user/manage-license',
    // },
    // {
    //     id: 'manageMyRef',
    //     title: 'CONTACT',
    //     type: 'basic',
    //     icon: 'heroicons_outline:phone',
    //     link: '/user/my-ref-user',
    // },
    {
        id: 'changePassword',
        title: 'CHANGE PASSWORD',
        type: 'basic',
        icon: 'heroicons_outline:key',
        link: '/user/change-password',
    },
    // {
    //     id: 'api.generator',
    //     title: 'API Key Generator',
    //     type: 'basic',
    //     icon: 'heroicons_outline:key',
    //     link: '/api-key',
    // },
    // {
    //     id: 'loyal.setting',
    //     title: 'Loyalty Basic Setting',
    //     type: 'basic',
    //     icon: 'heroicons_outline:cog',
    //     link: '/loyalty-setting',
    // },
    // {
    //     id: 'earning.rules',
    //     title: 'Earning Rules',
    //     type: 'basic',
    //     icon: 'heroicons_outline:cash',
    //     link: '/earning-rules',
    // },
    // {
    //     id: 'level',
    //     title: 'Level Management',
    //     type: 'basic',
    //     icon: 'mat_outline:insert_chart',
    //     link: '/levels',
    // },
    // {
    //     id: 'pos',
    //     title: 'POS Management',
    //     type: 'basic',
    //     icon: 'mat_outline:store',
    //     link: '/point-of-sell',
    // },
    // {
    //     id: 'merchants',
    //     title: 'Merchant Management',
    //     type: 'basic',
    //     icon: 'mat_outline:storefront',
    //     link: '/merchants',
    // },
    // {
    //     id      : 'dashboards',
    //     title   : 'Dashboards',
    //     subtitle: 'Unique dashboard designs',
    //     type    : 'group',
    //     icon    : 'heroicons_outline:home',
    //     children: [
    //         {
    //             id   : 'dashboards.project',
    //             title: 'Project',
    //             type : 'basic',
    //             icon : 'heroicons_outline:clipboard-check',
    //             link : '/dashboards/project'
    //         },

    //     ]
    // },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        tooltip: 'Dashboards',
        type: 'aside',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        tooltip: 'Apps',
        type: 'aside',
        icon: 'heroicons_outline:qrcode',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'pages',
        title: 'Pages',
        tooltip: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'UI',
        tooltip: 'UI',
        type: 'aside',
        icon: 'heroicons_outline:collection',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation',
        tooltip: 'Navigation',
        type: 'aside',
        icon: 'heroicons_outline:menu',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'DASHBOARDS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'APPS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'others',
        title: 'OTHERS',
        type: 'group',
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'User Interface',
        type: 'aside',
        icon: 'heroicons_outline:collection',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation Features',
        type: 'aside',
        icon: 'heroicons_outline:menu',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        type: 'group',
        icon: 'heroicons_outline:qrcode',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'group',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'UI',
        type: 'group',
        icon: 'heroicons_outline:collection',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Misc',
        type: 'group',
        icon: 'heroicons_outline:menu',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
