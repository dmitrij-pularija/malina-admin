// ** Navigation imports
import foood from './foood'
import apps from './apps'
import pages from './pages'
import forms from './forms'
import tables from './tables'
import others from './others'
import charts from './charts'
import dashboards from './dashboards'
import uiElements from './ui-elements'

// ** Merge & Export

export default [...dashboards, ...foood, ...apps, ...pages, ...uiElements, ...forms, ...tables, ...charts, ...others]
