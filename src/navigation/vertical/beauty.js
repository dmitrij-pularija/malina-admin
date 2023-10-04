// ** Icons Import
import { Grid, Clipboard, FileText, BookOpen, Award, Circle, ShoppingCart, Users, Shield } from 'react-feather'

export default [
  {
    header: 'Malina beauty'
  },
  // {
  //   id: 'specialties',
  //   title: 'Specialties',
  //   icon: <ShoppingCart size={20} />,
  //   navLink: '/apps/beauty/specialties/list'
  // },
  // {
  //   id: 'menu',
  //   title: 'Menu',
  //   icon: <Clipboard size={20}/>,
  //   children: [
  //     {
  //       id: 'productCategories',
  //       title: 'Categories',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/food/products/categories/list'
  //     },
  //     {
  //       id: 'addons',
  //       title: 'Addons',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/food/products/addons/list'
  //     },
  //     {
  //       id: 'products',
  //       title: 'Products',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/food/products/products/list'
  //     }
  //   ]
  // },    
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
        id: 'reviewsSpecialties',
        title: 'Reviews about Specialties',
        icon: <Circle size={12} />,
        navLink: '/apps/beauty/rating/masters/list'
      }
    ]
  }
]
