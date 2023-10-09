import { Grid, Clipboard, FileText, Command, Award, Circle, ShoppingCart, Users, ShoppingBag } from 'react-feather'

export default [
  {
    header: 'Malina beauty'
  },
  {
    id: 'beautyOrders',
    title: 'Orders',
    icon: <ShoppingCart size={20} />,
    navLink: '/apps/beauty/orders/list'
  },
  {
    id: 'Services',
    title: 'Services',
    icon: <Command size={20} />,
    children: [
      {
        id: 'ServicesCategories',
        title: 'Service Categories',
        icon: <Circle size={12} />,
        navLink: '/apps/beauty/services/categories/list'
      },
      {
        id: 'ServicesServices',
        title: 'Services',
        icon: <Circle size={12} />,
        navLink: '/apps/beauty/services/services/list'
      }
    ]
  },
  {
    id: 'goods',
    title: 'Goods',
    icon: <ShoppingBag size={20} />,
    children: [
      {
        id: 'beautyProductsCategories',
        title: 'Beauty Products Categories',
        icon: <Circle size={12} />,
        navLink: '/apps/beauty/products/categories/list'
      },
      {
        id: 'beautyProducts',
        title: 'Beauty Products',
        icon: <Circle size={12} />,
        navLink: '/apps/beauty/products/products/list'
      }
    ]
  },    
  {
    id: 'structureBeauty',
    title: 'Structure',
    icon: <Grid size={20} />,
    children: [
      {
        id: 'specialties',
        title: 'Specialties',
        icon: <Circle size={12} />,
        navLink: '/apps/beauty/specialties/list'
      }
    ]
  },
  {
    id: 'staff',
    title: 'Staff',
    icon: <Users size={20} />,
    children: [
      {
        id: 'masters',
        title: 'Masters',
        icon: <Circle size={12} />,
        navLink: '/apps/user/masters/list'
      }
    ]
  },
  {
    id: 'feedbackBeauty',
    title: 'Feedback',
    icon: <Award size={20} />,
    children: [
      {
        id: 'orderBeautyFeedback',
        title: 'Order Beauty Feedback',
        icon: <Circle size={12} />,
        navLink: '/apps/beauty/rating/orders/list'
      },
      {
        id: 'beautyComplaints',
        title: 'Beauty Complaints',
        icon: <Circle size={12} />,
        navLink: '/apps/beauty/rating/complaints/list'
      },
      {
        id: 'reviewsSpecialties',
        title: 'Reviews about Specialties',
        icon: <Circle size={12} />,
        navLink: '/apps/beauty/rating/masters/list'
      }
    ]
  },
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