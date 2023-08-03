// ** Icons Import
import { Grid, Server, GitBranch, BookOpen, Award, Circle, ShoppingCart, Users, Shield } from 'react-feather'

export default [
  {
    header: 'Malina food'
  },
  {
    id: 'orders',
    title: 'Orders',
    icon: <ShoppingCart size={20} />,
    navLink: '/apps/food/orders/list'
  },
  {
    id: 'structure',
    title: 'Structure',
    icon: <Grid size={20} />,
    children: [
      {
        id: 'branches',
        title: 'Branches',
        icon: <Circle size={12} />,
        navLink: '/apps/food/branches/list'
      },
      {
        id: 'categories',
        title: 'Categories',
        icon: <Circle size={12} />,
        navLink: '/apps/food/categories/list'
      },
      {
        id: 'store',
        title: 'Store',
        icon: <Circle size={12} />,
        navLink: '/apps/food/store/establishments'
      },
      {
        id: 'tables',
        title: 'Tables',
        icon: <Circle size={12} />,
        navLink: '/apps/food/tables/list'
      }
    ]
  },
  {
    id: 'users',
    title: 'Users',
    icon: <Users size={20} />,
    children: [
      {
        id: 'user',
        title: 'Users',
        icon: <Circle size={12} />,
        navLink: '/apps/user/list'
      },
      {
        id: 'waiters',
        title: 'Waiters',
        icon: <Circle size={12} />,
        navLink: '/apps/user/waiters/list'
      }
    ]
  },
  {
    id: 'feedback',
    title: 'Feedback',
    icon: <Award size={20} />,
    children: [
      {
        id: 'staffRating',
        title: 'Staff rating',
        icon: <Circle size={12} />,
        navLink: '/forms/elements/input'
      },
      {
        id: 'orderFeedback',
        title: 'Order Feedback',
        icon: <Circle size={12} />,
        navLink: '/forms/elements/input'
      },
      {
        id: 'reviewsEstablishments',
        title: 'Reviews about establishments',
        icon: <Circle size={12} />,
        navLink: '/forms/elements/input'
      }
    ]
  }
]
