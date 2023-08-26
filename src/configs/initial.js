export const roles = {
  1: "user",
  2: "admin",
  3: "superadmin"
}
export const statusObj = {
  1: { label: 'Новый',  colorName: 'light-warning' },
  2: { label: 'Обрабатывается',  colorName: 'light-primary' },
  3: { label: 'Отменен', colorName: 'light-danger' },
  4: { label: 'Готов', colorName: 'light-success' },
  5: { label: 'В пути', colorName: 'light-secondary' },
  6: { label: 'Забрали', colorName: 'light-success' },
  7: { label: 'Курьер прибыл', colorName: 'light-dark' },
  8: { label: 'Доставлен', colorName: 'light-success' },
  9: { label: 'Отказ клиентв', colorName: 'light-dark' },
  10: { label: 'Выполнен', colorName: 'light-success' },
  10: { label: 'Выполнен', colorName: 'light-success' }
}

export const logoSize = {
  s: {width: "60px", height: "34px"},
  xl: {width: "90px", height: "51px"}
}

export const paymentType = {
  1: "Наличными",
  2: "Картой",
  3: "На сайте"
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
  1: "1",
  2: "2",
  3: "3",
  4: "4"
}

export const priceLevels = {
  1: "1",
  2: "2",
  3: "3"
}

export const BASE_URL = "https://malina-proxy.onrender.com"
// export const BASE_URL = "http://167.99.246.103:8080"
// 
// http://167.99.246.103:8080/api/v2/malina/users/user/