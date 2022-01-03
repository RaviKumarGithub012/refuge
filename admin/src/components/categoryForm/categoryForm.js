import React, { Fragment, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormSelect from '../common/formFields/formSelect';
import { Button, Table } from 'react-bootstrap';
import './style.css';
import { CommonUrl } from '../../hooks/commonUrl/commonurl';
import { checkEmpty, DataStorage } from '../../services/commonFunctions/commonFunctions';
import ModalBox from "../common/modal";
import ReactPaginate from 'react-paginate';
import LoaderHoc from "../../components/common/loaderHoc/loaderHoc";



const CategoryForm = ({
  history,
  t,
  getProdcutCategoryGroup,
  productCatGroupData,
  productCatData,
  getProductCategories,
  getProductSubCategories,
  getProductRows,
  prodcutSubCatData,
  productRowsData,
  getShouldCost,
  allProductRows,
  setIsLoading
}) => {

  /* Get data storages fucntions from commonfunctions.js */
  const { setData, getStorData } = DataStorage || {};

  /* getting root base url  */
  const { baseURL } = useContext(CommonUrl) || {};

  const [productCatGroup, setProductCatGroup] = useState('');
  const [productCat, setProductCat] = useState('');
  const [productSubCat, setProductSubCat] = useState('');
  const [tableData, setTableData] = useState([]);
  const [filterApplied, setFilterApplied] = useState({category_group: false,category: false, sub_category: false});

  const [isFilled, setIsFilled] = useState(true);
  const [activeRow, setActiveRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [totalSkus, setTotalSkus] = useState(0);
  const [inputSearch, setInputSearch] = useState('');
  const [selectedPage, setSelectedPage] = useState('');

  const [pageCount, setPageCount] = useState(null);
  const [perpage] = useState(5);

  /* fetching product categories */
  useEffect(() => {
    (async () => {
      if (inputSearch.length || selectedPage !== null && Number(selectedPage)) {
        const search_params = `?page=${selectedPage || Number(selectedPage) !== 0 ? selectedPage : ''}&text=${inputSearch ?? ''}`
        setIsLoading(true)
        await getShouldCost(search_params);
        setIsLoading(false)
      } else {
        setIsLoading(true)
        await getShouldCost();
        setIsLoading(false)
      }
    })();
  }, [inputSearch, selectedPage]);

  useEffect(() => {
    const { records, pagination } = allProductRows || {};
    if (records && pagination) {
      setTableData(records);
      const page_count = Math.ceil(pagination.total_records / pagination.page_size);
      setPageCount(page_count);
      setTotalSkus(pagination?.total_records);
    }
  }, [allProductRows]);

  useEffect(() => {
    if (productCat.length || productCatGroup.length || productSubCat.length) {
      (async () => {

      })();
      setIsFilled(false);
    } else {
      setIsFilled(true);
    }
  }, [productCat, productCatGroup, productSubCat]);


  /* getting stored data for selected prodcuts */
  useEffect(() => {
    const data = getStorData('selectedProduct');
    if (checkEmpty(data)) {
      const { productCat, productCatGroup, productSubCat } = data || {};
      setProductCatGroup(productCatGroup);
      setProductCat(productCat);
      setProductSubCat(productSubCat);
    }
  }, []);

  useEffect(() => {
    const { records, pagination } = productRowsData || {};
    if (records && pagination) {
      setTableData(records);
      setTotalSkus(pagination?.total_records);
      const page_count = Math.ceil(pagination.total_records / pagination.page_size);
      setPageCount(page_count);
      setTotalSkus(pagination?.total_records);
      setData('selectedProduct', { productCat, productCatGroup, productSubCat });
      setShowModal(false);
    }
  }, [productRowsData]);

  const handleSubmit = async e => {
    e.preventDefault();
    const search_params = `?page=${selectedPage}&text=${inputSearch}&group=${productCatGroup}&category=${productCat}&subcategory=${productSubCat}`
    setIsLoading(true)
    setFilterApplied({category_group: productCatGroup ? true : false, category: productCat ? true : false, sub_category: productSubCat ? true : false})
    await getShouldCost(search_params);
    handleCancel()
    setIsLoading(false)
  };

  const handleTableCell = (cellData = {}) => {
    const { id, description, color, material, ah3, category_ah4, subcategory_ah5, project_id } = cellData || {};
    return <>
      <td>{id}</td>
      <td>{ah3}</td>
      <td>{category_ah4}</td>
      <td>{subcategory_ah5}</td>
      <td>{description}</td>
      <td><span className="status not-started">{`Not Started`}</span></td>

    </>
  };

  const handleContinue = () => {
    if (activeRow !== -1 || activeRow === 0) {
      setData('current_s_table_row', tableData[activeRow].id);
      history.push({
        pathname: `${baseURL}/create-project`,
        state: {
          project_name: tableData[activeRow].description
        }
      });
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setTimeout(() => {
      setActiveRow(null);
      setIsFilter(false);
    }, 100);
  }

  const handleRowClick = index => {
    setActiveRow(index);
    setShowModal(true);
    setIsFilter(true);
  };

  const handleUseTemplate = () => {
    if (activeRow !== -1 || activeRow === 0) {
      // history.push(`${baseURL}/similar-product`);
      history.push({
        pathname: `${baseURL}/similar-product`,
        state:{
          project_id: tableData[activeRow].id
        } 
      });
    }
  }

  const handlePageClick = async (e) => {
    const selectedPage = e.selected;
    setSelectedPage(selectedPage+1);
  };

  const handleFilterClick = async () => {
    setShowModal(true);
    await getProdcutCategoryGroup();
    await getProductCategories()
    await getProductSubCategories()
  }

  const handleReset = async() =>{
    setProductSubCat('')
    setProductCat('')
    setProductCatGroup('')
    setFilterApplied({category_group: false, category: false, sub_category: false})
    setShowModal(false);
    await getShouldCost();
  }

  return (
    <>
      <h2>{t('select_product')}</h2>
      <div className="filter-group">
        <div className="search-container">
          <div className="sku-info">
            <span>{t('total_no_of_SKU')}</span>
            <strong>{totalSkus}</strong>
          </div>
          <div className="search-control-group">
            <div className="form-group">
              <input
                type="text"
                placeholder="Type here..."
                className="form-control search-control"
                onChange={e => setInputSearch(e.target.value)}
                value={inputSearch}
              />
            </div>
            <div className="form-group">
              <Button onClick={handleFilterClick} className="btn-block btn-small">
                {t('filter')} <span className="filter-icon"></span>
              </Button>
            </div>
          </div>
        </div>
        {<Fragment>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{t('sku')}</th>
                <th style={{backgroundColor: filterApplied.category_group && '#000'}}>{'Category Group'}</th>
                <th style={{backgroundColor: filterApplied.category && '#000'}}>{'Category'}</th>
                <th style={{backgroundColor: filterApplied.sub_category && '#000'}}>{'Sub Category'}</th>
                <th>{t('Description')}</th>
                <th>{t('Should Cost Created')}</th>

              </tr>
            </thead>
            <tbody>
              {
                tableData.length ? tableData.map((item, i) => {
                  return <tr
                    key={item.id} onClick={() => handleRowClick(i)}>
                    {handleTableCell(item)}
                  </tr>
                }) : null
              }
            </tbody>
          </Table>
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
        </Fragment>
        }
      </div>
      <ModalBox
        title={t('Create Project')}
        modalClose={handleCancel}
        isModalOpen={showModal}
        size={isFilter ? "md" : "xl"}
      >
        {
          isFilter ?
            <div className="text-center">
              <p>
                {t('sku_Pop_txt')}{" "} {t('sku_Pop_Id')} <strong>{activeRow !== null ? tableData[activeRow].id : null}</strong>
              </p>
              <Button onClick={handleCancel} className="btn-outline btn btn-secondary">No</Button>
              <Button className="ms-3" onClick={handleContinue}>Yes</Button>
              <strong className="d-block my-3">Or</strong>
              <Button onClick={handleUseTemplate}>Use Template</Button>
            </div> : <form onSubmit={handleSubmit}>
              <div className="modal-row">
                <div className="column grid-3">
                  <FormSelect
                    id="ah3"
                    data={productCatGroupData}
                    onChange={val => setProductCatGroup(val)}
                    label={t('product_category_group')}
                    valKey={"ah3"}
                    value={productCatGroup}
                  />
                </div>
                <div className="column grid-3">
                  <FormSelect
                    id="category_ah4"
                    data={productCatData}
                    onChange={val => setProductCat(val)}
                    label={t("product_category")}
                    valKey={"category_ah4"}
                    value={productCat}
                    // isDisabled={productCatGroup.length ? false : true}
                  />
                </div>
                <div className="column grid-3">
                  <FormSelect
                    id="subcategory_ah5"
                    data={prodcutSubCatData}
                    onChange={val => setProductSubCat(val)}
                    label={t("product_sub_category")}
                    valKey={"subcategory_ah5"}
                    value={productSubCat}
                    // isDisabled={productCat.length ? false : true}
                  />
                </div>
              </div>
              <div className="modal-btn">
                <Button variant="secondary" onClick={handleCancel} className="btn-outline">{t('cancel')}</Button>
                <Button variant="secondary" onClick={handleReset} className="btn-outline">{t('Reset')}</Button>
                <Button type="submit" disabled={isFilled}>{t('apply')}</Button>
              </div>
            </form>
        }
      </ModalBox>
    </>
  )
}

CategoryForm.propTypes = {
  history: PropTypes.any
};

export default LoaderHoc(CategoryForm);