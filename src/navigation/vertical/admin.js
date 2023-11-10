import { Grid, Calendar, FileText, Command, Award, Circle, ShoppingCart, Users, ShoppingBag } from 'react-feather'

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
    id: 'beautyAppointments',
    title: 'Appointments',
    icon: <Calendar size={20} />,
    navLink: '/apps/beauty/appointments'
  },
  {
    id: 'staffBeauty',
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
    id: 'foodStaff',
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
        id: 'storeFeedback',
        title: 'Store Feedback',
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
    header: 'Mix'
  },
  {
    id: 'structure',
    title: 'Store',
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
      }
    ]
  },
  {
    id: 'users',
    title: 'Users',
    icon: <Users size={20} />,
    navLink: '/apps/user/list'
  },
  {
    id: 'feeds',
    title: 'Feeds',
    icon: <FileText size={20} />,
    navLink: '/apps/feed/list'
  }
]