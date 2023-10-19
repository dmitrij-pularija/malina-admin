import { Grid, Calendar, FileText, Command, Award, Circle, ShoppingCart, Users, ShoppingBag } from 'react-feather'
export default [
  {
    header: 'Malina beauty'
  },
  // {
  //   id: 'beautyOrders',
  //   title: 'Orders',
  //   icon: <ShoppingCart size={20} />,
  //   navLink: '/apps/beauty/orders/list'
  // },
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
      },
      {
        id: 'beautyAppointments',
        title: 'Appointments',
        icon: <Circle size={12} />,
        navLink: '/apps/beauty/appointments'
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
      },
      {
        id: 'beautyOrders',
        title: 'Orders',
        icon: <Circle size={12} />,
        navLink: '/apps/beauty/orders/list'
      }
    ]
  },    
  {
    id: 'staff',
    title: 'Staff',
    icon: <Users size={20} />,
    children: [
      {
        id: 'specialties',
        title: 'Specialties',
        icon: <Circle size={12} />,
        navLink: '/apps/beauty/specialties/list'
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
    id: 'feeds',
    title: 'Feeds',
    icon: <FileText size={20} />,
    navLink: '/apps/feed/list'
  }
]