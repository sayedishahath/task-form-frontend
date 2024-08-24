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

  // Handle form title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Add new input field
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

  // Handle input field label and placeholder changes
  const handleInputChange = (order, field, value) => {
    setInputs(
      inputs.map((input) =>
        input.order === order ? { ...input, [field]: value } : input
      )
    );
  };

  // Delete input field
//   const handleDeleteInput = (order) => {
//     setInputs(inputs.filter((input) => input.order !== order));
//     setInputCount(inputCount - 1);
//   };

const handleDeleteInput = (order) => {
    const newInputs = inputs.filter((input) => input.order !== order);
    newInputs.forEach((input, index) => {
      input.order = index;
    });
    setInputs(newInputs);
    setInputCount(inputCount - 1);
  };
  // Save form to database
  const handleSaveForm = async () => {
    if (!title.trim()) {
      alert('Form title is required');
      return;
    }

    const formData = { title, inputs };

    try {

      dispatch(startCreateForm(formData))
      alert('Form saved successfully');
      navigate('/')
      // Reset form after saving
      setTitle('');
      setInputs([]);
      setInputCount(0);
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save form');
    }
  };

  return (
    <div className= {styles.formCreateContainer}>
      <h2>Create New Form</h2>

      {/* Form Title Input */}
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
      
     

      {/* Display the List of Inputs in a Grid */}
      <div className= {styles.inputGrid}>
        {inputs.map((input) => (
          <div key={input.order} className={styles.inputRow}>
            <div>{`${input.order + 1}. ${input.formType} `}Input</div>
            <div className={styles.inputColumn}>
              <input
                type="text"
                value={input.label}
                onChange={(e) =>
                  handleInputChange(input.order, 'label', e.target.value)
                }
                placeholder="Input label"
                readOnly={false}
                required
              />
              <input
                type="text"
                value={input.placeholder}
                onChange={(e) =>
                  handleInputChange(input.order, 'placeholder', e.target.value)
                }
                placeholder="Input placeholder"
                readOnly={false}
                required 
              />
            </div>
            <div className={styles.inputColumn}>
              <button className={styles.button} onClick={() => handleDeleteInput(input.order)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Save Form Button */}
      <div className={styles.saveForm}>
        <button className={styles.button} onClick={handleSaveForm}>Save Form</button>
      </div>
    </div>
  );
};


