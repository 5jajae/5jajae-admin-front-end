import { SidebarItem } from '../types/common/sidebar/sidebarItem.ts';

export const menus: SidebarItem[] = [
  {
    title: '카테고리',
    icon: '',
    link: '/categories',
    children: [
      {
        title: '카테고리 목록',
        link: '/categories',
      },
    ],
  },
  {
    title: '업체',
    icon: '',
    link: '/stores',
    children: [
      {
        title: '업체 목록',
        link: '/stores',
      },
    ],
  },
];
