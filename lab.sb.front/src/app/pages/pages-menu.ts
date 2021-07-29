import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    data: {id: ''},
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    data: {id: 'usuario'},
    title: 'Usuário',
    icon: 'people-outline',
    link: '/pages/usuario/list'
  }
];
