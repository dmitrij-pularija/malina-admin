import { Fragment } from 'react'
import classnames from 'classnames'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { Card, CardBody, Button, Input, Label } from 'reactstrap'
import illustration from '@src/assets/images/pages/calendar-illustration.png'

const renderFilters = masters => {
 return masters ? masters.map(master => ({ id: master.id, label: `${master.master_name} ${master.surname ? master.surname : ''}`})) : []
}

const SidebarLeft = props => {
  const { masters, currentStore, storeOptions, handleStoreChange, updateFilter, updateAllFilters, userData, selectedMasters } = props
  const filters = renderFilters(masters)

  return (
    <Fragment>
      <Card className='sidebar-wrapper shadow-none'>
        <CardBody className='card-body d-flex flex-column my-sm-0 mb-3'>
              <Label for='plan-select'>Заведение</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                isDisabled={userData && userData.type === 2}
                className='react-select'
                classNamePrefix='select'
                options={storeOptions}
                value={currentStore}
                onChange={handleStoreChange}
              />
        </CardBody>
        <CardBody>
          <h5 className='section-label mb-1'>
            <span className='align-middle'>Специалисты</span>
          </h5>
          {masters.length ? (
          <>
          <div className='form-check mb-1'>
            <Input
              id='view-all'
              type='checkbox'
              label='View All'
              className='select-all'
              checked={masters.length === selectedMasters.length}
              onChange={e => updateAllFilters(e.target.checked)}
            />
            <Label className='form-check-label' for='view-all'>
              Показать всех
            </Label>
          </div>
          <div className='calendar-events-filter'>
            {filters.length &&
              filters.map(filter => {
                return (
                  <div
                    key={`${filter.id}-key`}
                    className='form-check form-check-primary mb-1'
                  >
                    <Input
                      type='checkbox'
                      key={filter.id}
                      label={filter.label}
                      className='input-filter'
                      id={`${filter.id}-event`}
                      checked={selectedMasters.includes(filter.id)}
                      onChange={() => updateFilter(filter.id)}
                    />
                    <Label className='form-check-label' for={`${filter.id}-event`}>
                      {filter.label}
                    </Label>
                  </div>
                )
              })}
          </div>
          </>
          ) : (
              <h5 className='section-label mt-3'>
              <span className='align-middle'>не выбраны</span>
              </h5>
          )}
        </CardBody>
      </Card>
      <div className='mb-0'>
        <img className='img-fluid' src={illustration} alt='illustration' />
      </div>
    </Fragment>
  )
}

export default SidebarLeft
