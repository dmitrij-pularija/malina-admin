import { useDispatch, useSelector } from "react-redux"
import { useEffect} from 'react'
// ** User List Component
import Table from "./Table"
import { getData } from '../../../stores/store'

// ** Styles
import "@styles/react/apps/app-users.scss"

const RatingOrdersList = () => {
  const dispatch = useDispatch()
  const stores = useSelector(state => state.stores.data)


useEffect(() => {
  if (!stores.length) dispatch(getData())  
}, [])

  return (
    <div className="app-user-list">
      <Table stores={stores} />
    </div>
  )
}

export default RatingOrdersList
