import { Grid, Calendar, Clipboard, FileText, Command, Award, Circle, ShoppingCart, Users, ShoppingBag } from 'react-feather'

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
  }
]