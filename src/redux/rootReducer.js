// ** Reducers Imports
import auth from './authentication'
import orders from '@src/views/apps/food/orders/store'
import tables from '@src/views/apps/food/tables/store'
import users from '@src/views/apps/user/store'
import waiters from '@src/views/apps/user/waiters/store'
import categories from '@src/views/apps/food/categories/store'
import branches from '@src/views/apps/food/branches/store'
import stores from '@src/views/apps/food/stores/store'
import ratingWaiters from '@src/views/apps/food/rating/waiters/store'
import ratingOrders from '@src/views/apps/food/rating/orders/store'
import ratingBeautyOrders from '@src/views/apps/beauty/rating/orders/store'
import ratingStores from '@src/views/apps/food/rating/stores/store'
import ratingMasters from '@src/views/apps/beauty/rating/masters/store'
import productComplaints from '@src/views/apps/food/rating/complaints/store'
import productBeautyComplaints from '@src/views/apps/beauty/rating/complaints/store'
import products from '@src/views/apps/food/products/products/store'
import productsCategories from '@src/views/apps/food/products/categories/store'
import addons from '@src/views/apps/food/products/addons/store'
import chefs from '@src/views/apps/user/chefs/store'
import feeds from '@src/views/apps/feed/store'
import specialties from '@src/views/apps/beauty/specialties/store'
import masters from '@src/views/apps/user/masters/store'
import navbar from './navbar'
import layout from './layout'
import todo from '@src/views/apps/todo/store'
import chat from '@src/views/apps/chat/store'
import email from '@src/views/apps/email/store'
import kanban from '@src/views/apps/kanban/store'
import invoice from '@src/views/apps/invoice/store'
import calendar from '@src/views/apps/calendar/store'
import ecommerce from '@src/views/apps/ecommerce/store'
import dataTables from '@src/views/tables/data-tables/store'
import permissions from '@src/views/apps/roles-permissions/store'

const rootReducer = {
  auth,
  orders,
  branches,
  categories,
  stores,
  tables,
  users,
  chefs,
  waiters,
  masters,
  ratingWaiters,
  ratingMasters,
  ratingOrders,
  ratingBeautyOrders,
  ratingStores,
  productComplaints,
  productBeautyComplaints,
  products,
  productsCategories,
  addons,
  feeds,
  specialties,
  navbar,
  layout,
  todo,
  chat,
  email,
  kanban,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions
}

export default rootReducer
