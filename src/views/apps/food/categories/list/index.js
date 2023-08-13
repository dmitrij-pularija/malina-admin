import Table from "./Table"
import Breadcrumbs from '@components/breadcrumbs'
import "@styles/react/apps/app-users.scss"

const CategoriesList = () => {
  return (
    <div className="app-user-list">
      <Breadcrumbs title='Категории' data={[{ title: 'Структура' }, { title: 'Категории' }]} /> 
      <Table />
    </div>
  )
}

export default CategoriesList