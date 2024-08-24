import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import styles from "./Form.module.css"
import { useDispatch } from 'react-redux';
import { startCreateForm } from '../../actions/formActions';
import { useNavigate } from 'react-router-dom';
export default function  Form (){
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const [title, setTitle] = useState('');
  const [inputs, setInputs] = useState([]);
  const [inputCount, setInputCount] = useState(0);
  const [inputOpen,setInputOpen] = useState(false)
  const [loading,setLoding] = useState(false)
  const [errors, setErrors] = useState({}); 

const validateInput = (input) => {
const errors = {};
if (!input.label.trim()) {
    errors.label = 'Input label is required';
}
if (!input.placeholder.trim()) {
    errors.placeholder = 'Input placeholder is required';
}
return errors;
};


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

 
  const handleAddInput = (formType) => {
    if (inputCount < 20) {
      setInputs([
        ...inputs,
        { order: inputCount, formType, label: '', placeholder: '' },
      ]);
      setInputCount(inputCount + 1);
    } else {
      alert('Maximum of 20 inputs allowed');
    }
  };

 
  const handleInputChange = (order, field, value) => {
    setInputs(
      inputs.map((input) =>
        input.order === order ? { ...input, [field]: value } : input
      )
    );
    const input = inputs.find((input) => input.order === order);
    const errors = validateInput(input);
    setErrors((prevErrors) => ({ ...prevErrors, [order]: errors }));
  };


const handleDeleteInput = (order) => {
    const newInputs = inputs.filter((input) => input.order !== order);
    newInputs.forEach((input, index) => {
      input.order = index;
    });
    setInputs(newInputs);
    setInputCount(inputCount - 1);
  };
  const handleSaveForm = async () => {
    if (!title.trim()) {
      alert('Form title is required');
      return;
    }

    const formData = { title, inputs };
    const inputErrors = inputs.reduce((acc, input) => {
        const errors = validateInput(input);
        if (Object.keys(errors).length > 0) {
          acc[input.order] = errors;
        }
        return acc;
      }, {});
    
      if (Object.keys(inputErrors).length > 0) {
        setErrors(inputErrors);
        return;
      }
      setLoding(true)
    try {

      dispatch(startCreateForm(formData))
      alert('Form saved successfully');
      setLoding(false)
      navigate('/')
      setTitle('');
      setInputs([]);
      setInputCount(0);
    } catch (error) {
      console.error('Error saving form:', error);
      setLoding(false)
      alert('Failed to save form');
    }
  };

  return (
    <div className= {styles.formCreateContainer}>
      <h2>Create New Form</h2>

      <div className={styles.formTitle}>
        <label>Form Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter form title"
        />
        
      </div>

      {!inputOpen?<button className={styles.openButton} onClick={()=>{setInputOpen(true)}}>Add input</button>:
      <>
        <button className={styles.closeButton} onClick={()=>{setInputOpen(false)}}>Close Add Input</button>
        <div className={styles.addInputButtons}>
            <button className={styles.button} onClick={() => handleAddInput('text')}>Add Text Input</button>
            <button className={styles.button} onClick={() => handleAddInput('email')}>Add Email Input</button>
            <button className={styles.button}onClick={() => handleAddInput('password')}>Add Password Input</button>
            <button className={styles.button} onClick={() => handleAddInput('number')}>Add Number Input</button>
            <button className={styles.button} onClick={() => handleAddInput('date')}>Add Date Input</button>
        </div>
        </>}
      
     

      <div className= {styles.inputGrid}>
        {inputs.map((input) => (
          <div key={input.order} className={styles.inputRow}>
            <div>{`${input.order + 1}. ${input.formType} `}Input</div>
            <div className={styles.inputColumn}>
                <div>
              <input
                type="text"
                value={input.label}
                onChange={(e) =>
                  handleInputChange(input.order, 'label', e.target.value)
                }
                placeholder="Input label"
                readOnly={false}
              />
              
               {errors[input.order] && errors[input.order].label && (
                <span className={styles.error}>
                    {errors[input.order].label}
                </span>
                )}
                </div>
                <div>
              <input
                type="text"
                value={input.placeholder}
                onChange={(e) =>
                  handleInputChange(input.order, 'placeholder', e.target.value)
                }
                placeholder="Input placeholder"
                readOnly={false}
              />
               {errors[input.order] && errors[input.order].placeholder && (
                <span className={styles.error}>
                    {errors[input.order].placeholder}
                </span>
                )}
                </div>
            </div>
            <div className={styles.inputColumn}>
              <button className={styles.button} onClick={() => handleDeleteInput(input.order)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.saveForm}>
        <button className={styles.button} onClick={handleSaveForm}>{loading?"Saving...":"Save Form"}</button>
      </div>
    </div>
  );
};


