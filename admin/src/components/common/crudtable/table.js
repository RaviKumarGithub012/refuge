import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, DropdownButton } from 'react-bootstrap';
import './index.css';
import ReactPaginate from 'react-paginate';
import { withTranslation } from 'react-i18next';
import Loader from '../loader'

const CrudTable = ({
  thead = [],
  tbody = [],
  actionsTitle = "Action",
  createTask = () => { },
  actionItems = () => { },
  // ReturnDropdowns = () => { },
  ReturnInputs = () => { },
  selectHandler = () => { },
  ReturnModal = () => { },
  handleTableCell = () => { },
  pageCount,
  perpage,
  handlePageClick,
  isloading,
  removeCreate,
  removeActions,
  t,
  currentPage,
  selectedMachine,
  createTitle = t('create_table_title')
}) => {
  return (
    <>
      <div className="crud_tbale">

        {/* {ReturnDropdowns()} */}
        {ReturnInputs()}
        {ReturnModal()}
        {isloading ? <Loader /> : <Table responsive striped>
          <thead>
            <tr>
              {
                thead.map(({ item, id }) => (
                  <th key={id}>{item}</th>
                ))
              }
              {removeActions ? null : <th>{actionsTitle}</th>}
            </tr>
          </thead>
          <tbody>
            {
              tbody.map((item, index) => (
                <tr key={item.id} style={{backgroundColor: selectedMachine ? selectedMachine.id === item.id && 'rgba(19,111,121,0.35)': null}} onClick={() => selectHandler(item)}>
                  {handleTableCell(item)}
                  <td>
                    {removeActions ? null : 
                    <DropdownButton align='end' id={`dropdown-item-button_${item.id}`} title="Action">
                      {actionItems(item.id, index)}
                    </DropdownButton>}
                    {/* {removeActions ? null : actionItems(item.id, index)} */}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>}

      </div>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={perpage}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={'page-item d-block'}
        pageLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      {removeCreate ? null : <div style={{ textAlign: 'right' }}>
        <Button onClick={createTask}>{createTitle}</Button>
      </div>}

    </>
  )
}

CrudTable.propTypes = {
  thead: PropTypes.array.isRequired,
  tbody: PropTypes.array.isRequired,
  actionsTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  createTask: PropTypes.func,
  actionItems: PropTypes.func,
  ReturnDropdowns: PropTypes.func,
  ReturnInputs: PropTypes.func,
  handleTableCell: PropTypes.func
}

export default withTranslation()(CrudTable);