import { Share, Printer, FileText, File, Grid, Copy } from 'react-feather'
import { useTranslation } from 'react-i18next'
import React from 'react'
import {
  Row,
  Col,
  Input,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import toast from 'react-hot-toast'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import copy from 'clipboard-copy'
import '@styles/react/libs/react-select/_react-select.scss'

const CustomHeader = ({ data, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  const { t } = useTranslation()
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

// ** Downloads PDF
  function downloadPDF() {
    const input =  document.querySelector('.react-dataTable')
    if (!input) return console.error('Table element not found')
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      const width = pdf.internal.pageSize.getWidth()
      const height = (canvas.height * width) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, width, height)
      pdf.save('table.pdf')
    })
  }
// ** Downloads XLS
  function downloadExcel(array) {
    const dataToExport = array
    const ws = XLSX.utils.json_to_sheet(dataToExport)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, 'table.xlsx')
  }
// ** Copy to Clipboard
  function copyToClipboard() {
    const input = document.querySelector('.react-dataTable')
    if (input) {
      copy(input.innerText)
      toast.success('Таблица скопирована в буфер обмена!')
    }
  }
// ** Print table
  function printTable() {   
    const input = document.querySelector('.react-dataTable')
    window.print()
    // const input = document.querySelector('.react-dataTable')

    // const printWindow = window.open('', '_blank')
    // printWindow.document.write('<html><head><title>Print</title></head><body>')
    // const cloneTable = input.cloneNode(true)
    // printWindow.document.body.appendChild(cloneTable)
  
    // const styles = document.head.querySelectorAll('style')
    // styles.forEach(style => {
    //   printWindow.document.head.appendChild(style.cloneNode(true))
    // })

    // printWindow.document.head.insertAdjacentHTML('beforeend', styles)
    // printWindow.document.write('</body></html>')
    // printWindow.document.close()
    // printWindow.print()
    // printWindow.close()
  }

  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>{t('CustomHeaderData.show')}</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </Input>
            <label htmlFor='rows-per-page'>{t('CustomHeaderData.records')}</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
            {t('CustomHeaderData.search')}
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            <UncontrolledDropdown className='me-1'>
              <DropdownToggle color='secondary' caret outline>
                <Share className='font-small-4 me-50' />
                <span className='align-middle'>{t('CustomHeaderData.export')}</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100' onClick={() => printTable()}>
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>{t('CustomHeaderData.print')}</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadExcel(data)}>
                  <Grid className='font-small-4 me-50' />
                  <span className='align-middle'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadPDF()}>
                  <File className='font-small-4 me-50' />
                  <span className='align-middle'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => copyToClipboard()}>
                  <Copy className='font-small-4 me-50' />
                  <span className='align-middle'>{t('CustomHeaderData.copy')}</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CustomHeader