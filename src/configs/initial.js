export const roles = {
  1: "user",
  2: "business",
  3: "admin"
}
export const statusObj = {
  1: { label: 'Новый',  colorName: 'light-warning' },
  2: { label: 'Подтвержден',  colorName: 'light-primary' },
  3: { label: 'Отменен', colorName: 'light-danger' },
  4: { label: 'Готово', colorName: 'light-success' },
  5: { label: 'В пути', colorName: 'light-secondary' },
  6: { label: 'Получен', colorName: 'light-success' },
  7: { label: 'Прибыл', colorName: 'light-dark' },
  8: { label: 'Доставлено', colorName: 'light-success' },
  9: { label: 'Отказ клиента', colorName: 'light-danger' },
  10: { label: 'Выполнен', colorName: 'light-success' },
  11: { label: 'Начислены баллы', colorName: 'light-success' }
}

export const appointmentsObj = {
  pending: { label: 'Новая', colorName: 'light-warning' },
  confirmed: { label: 'Подтверждена',  colorName: 'light-info' },
  completed: { label: 'Посещена', colorName: 'light-success' },
  cancelled: { label: 'Отменен', colorName: 'light-danger' }
}

export const logoSize = {
  s: {width: "60px", height: "34px"},
  xl: {width: "90px", height: "51px"}
}

export const paymentType = {
  1: "Наличными",
  2: "Пейбокс"
}
export const orderType = {
  1: "Доставка",
  2: "Самовывоз",
  3: "Внутри заведения"
}
export const businessType = {
  1: "Food",
  2: "Beauty"
}

export const storeType = {
  1: "Пользователь",
  2: "Предприятие",
  3: "Администратор",
  4: "Мастер"
}

export const priceLevels = {
  1: "Низкий",
  2: "Средний",
  3: "Высокий"
}

export const feedsType = {
  1: "Новость",
  2: "Акция"
}
export const wsActions = {
  update: { label: 'Обновление', colorName: 'light-success' },
  create: { label: 'Создание',  colorName: 'light-warning' },
  delete: { label: 'Удаление', colorName: 'light-danger' }
}

// export const BASE_URL = "http://167.99.246.103:8080"
// export const FOOD_ORDERS_WS_URL = "ws://167.99.246.103:8080/api/v2/malina/products/user-order/"
// export const FOOD_BOOKINGS_WS_URL = "ws://167.99.246.103:8080/api/v2/malina/products/bookings/"
// export const BEAUTY_ORDERS_WS_URL = "ws://167.99.246.103:8080/api/v2/malina/beauty/beauty_orders/"
// export const BEAUTY_APPOINTMENTS_WS_URL = "ws://167.99.246.103:8080/api/v2/malina/beauty/beauty_appointments/"

export const BASE_URL = "https://malina-proxy.onrender.com"
export const FOOD_ORDERS_WS_URL = "wss://malina-proxy.onrender.com/api/v2/malina/products/user-order/ws/"
export const FOOD_BOOKINGS_WS_URL = "wss://malina-proxy.onrender.com/api/v2/malina/products/bookings/ws/"
export const BEAUTY_ORDERS_WS_URL = "wss://malina-proxy.onrender.com/api/v2/malina/beauty/beauty_orders/ws/"
export const BEAUTY_APPOINTMENTS_WS_URL = "wss://malina-proxy.onrender.com/api/v2/malina/beauty/beauty_appointments/ws/"

