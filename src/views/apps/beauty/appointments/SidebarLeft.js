import { Fragment } from 'react'
import classnames from 'classnames'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { appointmentsObj } from '../../../../configs/initial'
import { Card, CardBody, Button, Input, Label } from 'reactstrap'
import illustration from '@src/assets/images/pages/calendar-illustration.png'

// const renderFilters = masters => {
//  return masters ? masters.map(master => ({ id: master.id, label: `${master.master_name} ${master.surname ? master.surname : ''}`})) : []
// }

// const filters = [
//   { id: 1, value: 'pending', label: 'Новая', color: 'warning', className: 'form-check-warning mb-1' },
//   { id: 2, value: 'confirmed', label: 'Подтверждена', color: 'primary', className: 'form-check-primary mb-1' },
//   { id: 3, value: 'comment', label: 'Посещена', color: 'success', className: 'form-check-success mb-1' },
//   { id: 4, value: 'cancelled', label: 'Отменен', color: 'danger', className: 'form-check-danger mb-1' }
// ]

const SidebarLeft = props => {
  const { filters, selectedCalendars, currentMaster, masterOptions, handleMasterChange, currentStore, storeOptions, handleStoreChange, updateFilter, updateAllFilters, userData, selectedMasters } = props
  // const filters = renderFilters(masters)

  return (
    <Fragment>
      <Card className='sidebar-wrapper shadow-none'>
        <CardBody className='card-body d-flex flex-column my-sm-0 mb-3'>
              <Label for='plan-select'>Заведение</Label>
              <Select
                name='plan-select'
                theme={selectThemeColors}
                isClearable={false}
                isDisabled={userData && userData.type === 2}
                className='react-select'
                classNamePrefix='select'
                options={storeOptions}
                value={currentStore}
                onChange={handleStoreChange}
                placeholder="Не выбрано"
              />
        </CardBody>
        <CardBody className='card-body d-flex flex-column my-sm-0 mb-3'>
              <Label for='master-select'>Специалист</Label>
              <Select
                theme={selectThemeColors}
                name='master-select'
                isClearable={false}
                isDisabled={!currentStore.value}
                className='react-select'
                classNamePrefix='select'
                options={masterOptions}
                value={currentMaster}
                onChange={handleMasterChange}
                placeholder="Не выбран"
              />
        </CardBody>
        <CardBody>
          <h5 className='section-label mb-1'>
            <span className='align-middle'>Записи</span>
          </h5>
          <div className='form-check mb-1'>
            <Input
              id='view-all'
              type='checkbox'
              label='View All'
              className='select-all'
              checked={selectedCalendars.length === filters.length}
              onChange={e => updateAllFilters(e.target.checked)}
            />
            <Label className='form-check-label' for='view-all'>
              Показать все
            </Label>
          </div>
          <div className='calendar-events-filter'>
            {filters.length &&
              filters.map(filter => {
                return (
                  <div
                    key={`${filter.id}-key`}
                    className={classnames('form-check', {
                      [filter.className]: filter.className
                    })}
                  >
                    <Input
                      type='checkbox'
                      key={filter.id}
                      label={filter.label}
                      className='input-filter'
                      id={`${filter.id}-event`}
                      checked={selectedCalendars.includes(filter.value)}
                      onChange={() => updateFilter(filter.value)}
                    />
                    <Label className='form-check-label' for={`${filter.id}-event`}>
                      {filter.label}
                    </Label>
                  </div>
                )
              })}
          </div>
        </CardBody>
      </Card>
      <div className='mt-auto'>
        <img className='img-fluid' src={illustration} alt='illustration' />
      </div>
    </Fragment>
  )
}

export default SidebarLeft
