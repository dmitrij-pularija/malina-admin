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
    id: 'establishments',
    title: 'Establishments',
    icon: <Grid size={20} />,
    navLink: '/apps/food/establishments/wishlist'
  },
  {
    id: 'categories',
    title: 'Categories',
    icon: <Server size={20} />,
    navLink: '/apps/food/categories/list'
  },
  {
    id: 'branches',
    title: 'Branches',
    icon: <GitBranch size={20} />,
    navLink: '/apps/food/branches/list'
  },
  {
    id: 'tables',
    title: 'Tables',
    icon: <BookOpen size={20} />,
    navLink: '/apps/food/tables/list'
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
