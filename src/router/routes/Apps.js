// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Orders = lazy(() => import('../../views/apps/food/orders/list'))
const OrdersPreview = lazy(() => import('../../views/apps/food/orders/preview'))
const OrdersEdit = lazy(() => import('../../views/apps/food/orders/edit'))
const OrdersHistory = lazy(() => import('../../views/apps/food/orders/edit'))
const OrdersOnMap = lazy(() => import('../../views/apps/food/orders/edit'))
const OrdersReview = lazy(() => import('../../views/apps/food/orders/edit'))

const Stores = lazy(() => import('../../views/apps/food/stores/list'))
const StoreDetail = lazy(() => import('../../views/apps/food/stores/detail'))
const StoreAdd = lazy(() => import('../../views/apps/food/stores/add'))
const Categories = lazy(() => import('../../views/apps/food/categories/list'))
const Branches = lazy(() => import('../../views/apps/food/branches/list'))
const Tables = lazy(() => import('../../views/apps/food/tables/list'))
const RatingWaiters = lazy(() => import('../../views/apps/food/rating/waiters/list'))
const RatingOrders = lazy(() => import('../../views/apps/food/rating/orders/list'))
const RatingStores = lazy(() => import('../../views/apps/food/rating/stores/list'))


const Chat = lazy(() => import('../../views/apps/chat'))
const Todo = lazy(() => import('../../views/apps/todo'))
const Email = lazy(() => import('../../views/apps/email'))
const Kanban = lazy(() => import('../../views/apps/kanban'))
const Calendar = lazy(() => import('../../views/apps/calendar'))

const InvoiceAdd = lazy(() => import('../../views/apps/invoice/add'))
const InvoiceList = lazy(() => import('../../views/apps/invoice/list'))
const InvoiceEdit = lazy(() => import('../../views/apps/invoice/edit'))
const InvoicePrint = lazy(() => import('../../views/apps/invoice/print'))
const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'))

const EcommerceShop = lazy(() => import('../../views/apps/ecommerce/shop'))
const EcommerceDetail = lazy(() => import('../../views/apps/ecommerce/detail'))
const EcommerceWishlist = lazy(() => import('../../views/apps/ecommerce/wishlist'))
const EcommerceCheckout = lazy(() => import('../../views/apps/ecommerce/checkout'))

const UserList = lazy(() => import('../../views/apps/user/list'))
const UserView = lazy(() => import('../../views/apps/user/view'))
const Roles = lazy(() => import('../../views/apps/roles-permissions/roles'))
const Permissions = lazy(() => import('../../views/apps/roles-permissions/permissions'))

const WaitersList = lazy(() => import('../../views/apps/user/waiters/list'))
const WaitersView = lazy(() => import('../../views/apps/user/waiters/view'))

const AppRoutes = [
  {
    element: <Orders />,
    path: '/apps/food/orders/list'
  },
  {
    element: <OrdersPreview />,
    path: '/apps/food/orders/preview/:id'
  },
  {
    element: <OrdersEdit />,
    path: '/apps/food/orders/edit/:id'
  },
  {
    element: <OrdersHistory />,
    path: '/apps/food/orders/hist/:id'
  },
  {
    element: <OrdersOnMap />,
    path: '/apps/food/orders/map/:id'
  },
  {
    element: <OrdersReview />,
    path: '/apps/food/orders/rev/:id'
  },
  {
    element: <Stores />,
    path: '/apps/food/stores/list',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/food/stores/store-detail/:id',
    element: <StoreDetail />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/food/stores/add',
    element: <StoreAdd />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    element: <Categories />,
    path: '/apps/food/categories/list'
  },
  {
    element: <Branches />,
    path: '/apps/food/branches/list'
  },
  {
    element: <Tables />,
    path: '/apps/food/tables/list'
  },
  {
    element: <RatingWaiters />,
    path: '/apps/food/rating/waiters/list'
  },
  {
    element: <RatingOrders />,
    path: '/apps/food/rating/orders/list'
  },
  {
    element: <RatingStores />,
    path: '/apps/food/rating/stores/list'
  },
  {
    element: <Email />,
    path: '/apps/email',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/:folder',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/label/:label',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/:filter'
  },
  {
    path: '/apps/chat',
    element: <Chat />,
    meta: {
      appLayout: true,
      className: 'chat-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo/:filter',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo/tag/:tag',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Calendar />,
    path: '/apps/calendar'
  },
  {
    element: <Kanban />,
    path: '/apps/kanban',
    meta: {
      appLayout: true,
      className: 'kanban-application'
    }
  },
  {
    element: <InvoiceList />,
    path: '/apps/invoice/list'
  },
  {
    element: <InvoicePreview />,
    path: '/apps/invoice/preview/:id'
  },
  {
    path: '/apps/invoice/preview',
    element: <Navigate to='/apps/invoice/preview/4987' />
  },
  {
    element: <InvoiceEdit />,
    path: '/apps/invoice/edit/:id'
  },
  {
    path: '/apps/invoice/edit',
    element: <Navigate to='/apps/invoice/edit/4987' />
  },
  {
    element: <InvoiceAdd />,
    path: '/apps/invoice/add'
  },
  {
    path: '/apps/invoice/print',
    element: <InvoicePrint />,
    meta: {
      layout: 'blank'
    }
  },
  {
    element: <EcommerceShop />,
    path: '/apps/ecommerce/shop',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    element: <EcommerceWishlist />,
    path: '/apps/ecommerce/wishlist',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/product-detail',
    element: <Navigate to='/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/food/stores/product-detail/:store',
    element: <EcommerceDetail />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/checkout',
    element: <EcommerceCheckout />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    element: <UserList />,
    path: '/apps/user/list'
  },
  {
    element: <UserView />,
    path: '/apps/user/view/:id'
  },
  {
    element: <Roles />,
    path: '/apps/roles'
  },
  {
    element: <Permissions />,
    path: '/apps/permissions'
  },
  {
    element: <WaitersList />,
    path: '/apps/user/waiters/list'
  },
  {
    element: <WaitersView />,
    path: '/apps/user/waiters/view/:id'
  }
]

export default AppRoutes
