// ** Icons Import
import { Grid, Clipboard, FileText, BookOpen, Award, Circle, ShoppingCart, Users, Shield } from 'react-feather'

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
    id: 'menu',
    title: 'Menu',
    icon: <Clipboard size={20}/>,
    children: [
      {
        id: 'productCategories',
        title: 'Categories',
        icon: <Circle size={12} />,
        navLink: '/apps/food/products/categories/list'
      },
      {
        id: 'addons',
        title: 'Addons',
        icon: <Circle size={12} />,
        navLink: '/apps/food/products/addons/list'
      },
      {
        id: 'products',
        title: 'Products',
        icon: <Circle size={12} />,
        navLink: '/apps/food/products/products/list'
      }
    ]
  },    
  {
    id: 'structure',
    title: 'Structure',
    icon: <Grid size={20} />,
    children: [
      // {
      //   id: 'branches',
      //   title: 'Branches',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/food/branches/list'
      // },
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
        navLink: '/apps/food/stores/list'
      },
      {
        id: 'tables',
        title: 'Tables',
        icon: <Circle size={12} />,
        navLink: '/apps/food/tables/list'
      },
      {
        id: 'specialties',
        title: 'Specialties',
        icon: <Circle size={12} />,
        navLink: '/apps/beauty/specialties/list'
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
      },
      {
        id: 'chefs',
        title: 'Chefs',
        icon: <Circle size={12} />,
        navLink: '/apps/user/chefs/list'
      },
      {
        id: 'masters',
        title: 'Masters',
        icon: <Circle size={12} />,
        navLink: '/apps/user/masters/list'
      }
    ]
  },
  {
    id: 'feedback',
    title: 'Feedback',
    icon: <Award size={20} />,
    children: [
      {
        id: 'reviewsEstablishments',
        title: 'Reviews about establishments',
        icon: <Circle size={12} />,
        navLink: '/apps/food/rating/stores/list'
      },
      {
        id: 'orderFeedback',
        title: 'Order Feedback',
        icon: <Circle size={12} />,
        navLink: '/apps/food/rating/orders/list'
      },
      {
        id: 'staffRating',
        title: 'Staff rating',
        icon: <Circle size={12} />,
        navLink: '/apps/food/rating/waiters/list'
      },
      {
        id: 'productComplaints',
        title: 'Complaints',
        icon: <Circle size={12} />,
        navLink: '/apps/food/rating/complaints/list'
      }
    ]
  },
  {
    id: 'feeds',
    title: 'Feeds',
    icon: <FileText size={20} />,
    navLink: '/apps/feed/list'
  },
]
