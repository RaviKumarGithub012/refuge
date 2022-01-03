import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import { getFormulaDropdown } from '../../../services/redux/shouldCost/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const oprators = ['+', '-', '(', ')', '*', '%', '/'];

const CreateFormula = ({t, handleHideModal, getFormulaDropdown, formula_dropdowns = [], finalFormula, otherType, itemNames }) => {

  useEffect(() => {
    (async () => {
      const projectDetail = localStorage.getItem('projectDetail');
      if (projectDetail) {
        let { project_id } = JSON.parse(projectDetail);
        if(otherType){
          await getFormulaDropdown(project_id, 'otherType');
        }
        else{
          await getFormulaDropdown(project_id);
        }
        
      }
    })();
  }, []);

  const [formulaInput, setFormulaInput] = useState({
    f_type: '',
    op_type: '',
    number: ''
  });

  const [formulaTotal, setFormulaTotal] = useState('');
  const [f_total, setF_total] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [storeValue, setStoreValue] = useState([]);
  const [storeName, setStoreName] = useState([]);
  const formula_list = useRef(null);

  useEffect(() => {
    setIsError(true);
    return () => setIsError(false);
  }, []);

  useEffect(() => {
    if (finalFormula.length && formula_dropdowns.length) {
      const numberArray = finalFormula.map(item => {
        console.log(item)
        if (isNaN(item) && !oprators.includes(item)) {
          const { value, adjusted_value } = formula_dropdowns.find(f => String(f.variable_name) === String(item)) || {};
          // return value;
          let sendData = adjusted_value ? adjusted_value : value;
          return sendData;
        }
        return item;
      });
      if (numberArray.length) {
        setF_total([...numberArray]);
        setStoreValue([...finalFormula]);
      }
    }
    if(itemNames){
      let namesFormulaVal = itemNames.split(',')
      setStoreName(namesFormulaVal)
    }
  }, [finalFormula, formula_dropdowns, itemNames]);

  const handleReset = () => {
    setFormulaInput({
      f_type: '',
      op_type: '',
      number: ''
    });
    setFormulaTotal('');
    setF_total([]);
    setStoreValue([]);
    setCurrentValue('');
    setErrorMsg('');
    setIsError(true);
  }

  const handleFormulaTotal = () => {
    try {
      setFormulaTotal(eval(f_total.join('')));
    } catch {
      setFormulaTotal(null);
      setErrorMsg(`Formula is not valid!`);
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!isError) {
      handleHideModal(storeValue, f_total, storeName);
      setTimeout(() => handleReset(), 100);
    } else {
      setErrorMsg(`Formula is not valid!`);
    }
  }

  const handleAddNumberType = () => {
    const { f_type } = formulaInput || {};
    let selectedValue = '';
    if (f_type.length && formula_dropdowns.length) {
      setErrorMsg('');
      const currentFormula = formula_dropdowns.find(item => item.variable_name.toLowerCase() === f_type.toLowerCase());
      if (currentFormula?.variable_name) {
        const { variable_name, value, adjusted_value } = currentFormula || {}
        storeName.push(variable_name)
        setStoreName([...storeName])
        storeValue.push(variable_name);
        setStoreValue([...storeValue]);
        selectedValue = adjusted_value ? adjusted_value : value;
        // selectedValue = value;
        setCurrentValue(variable_name);
        setIsError(false);
      } else if (!isNaN(f_type)) {
        selectedValue = f_type;
        storeValue.push(f_type);
        setStoreValue([...storeValue]);
        setCurrentValue(f_type);
        setIsError(false);
      }
      f_total.push(selectedValue);
      setF_total([...f_total]);
      setFormulaInput({
        ...formulaInput,
        f_type: '',
        number: ''
      });
    } 
    else if(!formula_dropdowns.length){
      selectedValue = f_type
      storeValue.push(selectedValue);
      setStoreValue([...storeValue]);
      f_total.push(selectedValue);
      setF_total([...f_total]);
    }
    else if (!f_type.length) {
      setErrorMsg('Please add the value!');
      setIsError(true);
    }
  };
  const handleAddOprator = (oprator) => {
    if (oprator !== '(' || oprator !== ')') {
      setCurrentValue(String(oprator));
    }
    if (storeValue.length || oprator === '(' || oprator === ')') {
      setErrorMsg(``);
      const lastValue = storeValue[storeValue.length - 1];
      const f_value = formula_dropdowns.find(item => item.variable_name.toLowerCase() === currentValue.toLowerCase());
      if (!isNaN(currentValue) || f_value?.variable_name || oprator === '(' || oprator === ')' || lastValue === ')') {
        f_total.push(oprator);
        setF_total([...f_total]);
        storeValue.push(oprator);
        setStoreValue([...storeValue]);
        setIsError(false);
      } else {
        setErrorMsg(`Invalid syntax!`);
        setIsError(true);
      }
    } else {
      setErrorMsg(`Please add the value!`);
      setIsError(true);
    }
  };

  /* Taking step back of formula */
  const handlStepBack = () => {
    storeValue.pop();
    f_total.pop();
    setCurrentValue(storeValue[storeValue.length - 1]);
    setStoreValue([...storeValue]);
    setF_total([...f_total]);
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group calculator-group">
        </div>
        <div className="calculator-main">
          <div className="form-group calculator-group">
            <FormControl
              className='form-control'
              type='text'
              placeholder={`Enter number or search...`}
              value={formulaInput.f_type}
              onChange={e => { setFormulaInput({ ...formulaInput, f_type: e.target.value }); setErrorMsg('') }}
              aria-label="Text input with dropdown button"
              list="formula_list"
            />
            <datalist id="formula_list" ref={formula_list}>
              {
                formula_dropdowns.length && formula_dropdowns.map(item => (
                  <option
                    key={item.id}
                    value={item.variable_name}
                    data-id={item.id}
                  >{`${item.variable_name} ${item.adjusted_value ? item.adjusted_value : item.value}`}</option>
                  // >{`${item.variable_name} ${item.value || item.adjusted_value}`}</option>
                ))
              }
            </datalist>
            <button
              type="button"
              className="btn-add"
              onClick={handleAddNumberType}>
              <span></span>
            </button>
          </div>
          <div className="calculated-data">
            <p className="m-0">{storeValue.join('') ?? ''}</p>
            <div>
              <small>
                <p className="m-0">{f_total ?? ''}</p>
                <p className="m-0"> {formulaTotal ?? ''}</p>
                <p>{errorMsg}</p>
              </small>
            </div>
          </div>
          <div className="calculator-list">
            <ul>
              <li>
                <button type="button" className="btn-calculator" onClick={() => handleAddOprator('/')}>&#247;</button>
              </li>
              <li><button type="button" className="btn-calculator" onClick={handleReset}>C</button></li>
              <li>
                <button type="button" className="btn-calculator" onClick={() => handleAddOprator('*')}>x</button>
              </li>
              <li>
                <button type="button" className="btn-calculator" onClick={() => handleAddOprator('(')}>(</button>
              </li>
              <li>
                <button type="button" className="btn-calculator" onClick={() => handleAddOprator(')')}>)</button>
              </li>
              <li>
                <button type="button" className="btn-calculator" onClick={() => handleAddOprator('-')}>-</button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn-calculator"
                  onClick={handlStepBack}
                  disabled={f_total.length || storeValue.length ? false : true}
                >&#8634;</button>
              </li>
              <li>
                <button type="button" className="btn-calculator" onClick={() => handleAddOprator('%')}>%</button>
              </li>
              <li>
                <button type="button" className="btn-calculator" onClick={() => handleAddOprator('+')}>+</button>
              </li>
              <li className="width-2">
                <button type="button" className="btn-calculator btn-equal" onClick={handleFormulaTotal}>=</button>
              </li>
            </ul>
          </div>
          <div className="modal-btn">
            <input type="submit" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  )
}

CreateFormula.propTypes = {
  handleHideModal: PropTypes.func
}

const mapStateToProps = state => ({
  formula_dropdowns: state.conversionReducer.formula_dropdowns
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getFormulaDropdown
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateFormula);