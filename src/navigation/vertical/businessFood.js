import { Grid, Clipboard, FileText, Calendar, Award, Circle, ShoppingCart, Users, ShoppingBag } from 'react-feather'

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
    id: 'bookings',
    title: 'Bookings',
    icon: <Calendar size={20} />,
    navLink: '/apps/food/bookings'
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
    id: 'tables',
    title: 'Tables',
    icon: <Grid size={20} />,
    navLink: '/apps/food/tables/list'
  },
  {
    id: 'staff',
    title: 'Staff',
    icon: <Users size={20} />,
    children: [
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
  }
]