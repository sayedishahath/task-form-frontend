import { useEffect, useState } from 'react';
import styles from './ViewForm.module.css';
import { useParams } from 'react-router-dom';
import { GET_ONE_FORM } from '../../apis/formApi';
import axios from 'axios';

export default function ViewForm() {
  const [form, setForm] = useState({});
  const [inputs, setInputs] = useState({});
  const [formErrors, setFormErrors] = useState({}); 
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${GET_ONE_FORM}${id}`);
        setForm(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  const handleChange = (label, e) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [label]: e.target.value,
    }));
    validateField(label, e.target.value);
  };

  const validateField = (label, value) => {
    const error = {};
    if (value.trim() === '') {
      error[label] = 'This field is required';
    } else if (label === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error[label] = 'Invalid email address';
    }else if (label === 'password' && value.length<8) {
      error[label] = 'password should be atleast 8 characters';
    }else if (label === 'phone' && !/^\d+$/.test(value)) {
      error[label] = 'phone should have only numbers';
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, [label]: error[label] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.keys(formErrors).some((key) => formErrors[key]);
    if (hasErrors) {
      alert('Please fix the errors before submitting');
      return;
    }
    alert('Form submitted, check console for data');
    console.log(inputs);
  };

  return (
    <>
      <h1 className={styles.title}>View Form</h1>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>{form.title}</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.fieldsContainer}>
              {form.inputs?.map((field, index) => (
                <div key={field._id} className={styles.field}>
                  <label className={styles.label}>{field.label}</label>
                  <input
                    type={field.formType}
                    placeholder={field.placeholder}
                    className={styles.input}
                    onChange={(e) => handleChange(field.label, e)}
                  />
                  {formErrors[field.label] && (
                    <span className={styles.error}>{`*${formErrors[field.label]}`}</span>
                  )}
                </div>
              ))}
            </div>
            <input
              className={styles.button}
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}