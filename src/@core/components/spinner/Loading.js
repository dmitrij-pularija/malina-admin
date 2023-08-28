import { useSelector } from "react-redux"
import classnames from 'classnames'
import Spinner from './Fallback-spinner'

const Loading = ({ className }) => {
  const orders = useSelector(state => state.orders.loading)
  const categories = useSelector(state => state.categories.loading)
  const stores = useSelector(state => state.stores.loading)
  const tables = useSelector(state => state.tables.loading)
  const users = useSelector(state => state.users.loading)
  const waiters = useSelector(state => state.waiters.loading)
  const ratingWaiters = useSelector(state => state.ratingWaiters.loading)
  const ratingOrders = useSelector(state => state.ratingOrders.loading)
  const ratingStores = useSelector(state => state.ratingStores.loading)

  const isLoading = () => { if (orders || categories || stores || tables || users || waiters || ratingWaiters || ratingOrders || ratingStores) { return true } else { return false } }

  return isLoading() ? (
    <div
      className={classnames('loader', {
        [className]: className
      })}
    >
    <Spinner />
    </div>
  ) : ""
}

export default Loading
