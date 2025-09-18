export type NavbarItem = {
  title: string;
  link?: string;
  children?: NavbarItem[];
  divided?: boolean;
};

export const NavbarData: NavbarItem[] = [
  {
    title: 'Начало',
    link: '/',
  },
  {
    title: 'За нас',
    children: [
      {
        title: 'Мисия',
        link: '/about-us/mission',
      },
      {
        title: 'Екип',
        link: '/about-us/team',
      },
      {
        title: 'Музикални дисциплини',
        link: '/about-us/music-disciplines',
      },
    ],
  },
  {
    title: 'Обучение',
    children: [
      {
        title: 'Инивидуални уроци',
        children: [
          {
            title: 'Поп и джаз пеене',
            link: '/individual-lessons/pop-jazz-singing',
          },
          {
            title: 'Пиано',
            link: '/individual-lessons/piano',
          },
          {
            title: 'Китара',
            link: '/individual-lessons/guitar',
          },
          {
            title: 'Барабани',
            link: '/individual-lessons/drums',
          },
          {
            title: 'Цигулка',
            link: '/individual-lessons/violin',
          },
        ],
      },
      {
        title: 'Подготвителни уроци',
        children: [
          {
            title: 'Средно музикално училище',
            link: '/preparatory-lessons/secondary-music-school',
          },
          {
            title: 'Висше музикално училище',
            link: '/preparatory-lessons/higher-music-school',
          },
        ],
      },
      {
        title: 'Групови уроци',
        children: [
          {
            title: 'Солфеж и музикална теория',
            link: '/group-lessons/solfege-music-theory',
          },
          {
            title: 'Пиано за най-малките',
            link: '/group-lessons/piano-for-little-ones',
          },
          {
            title: 'Вокални групи',
            link: '/group-lessons/vocal-groups',
          },
          {
            title: 'Курс по китара за малчугани',
            link: '/group-lessons/classical-guitar-course',
          },
        ],
      },
      {
        title: 'Цени',
        divided: true,
        link: '/pricing',
      },
    ],
  },
  {
    title: 'Постижения',
    link: '/achievements',
  },
  {
    title: 'Летни уроци',
    link: '/summer-lessons',
  },
  {
    title: 'Събития',
    link: '/events',
  },
];
