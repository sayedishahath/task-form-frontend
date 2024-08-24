import { useEffect, useState } from 'react';
import styles from './ViewForm.module.css';
import { useParams } from 'react-router-dom';
import { GET_ONE_FORM } from '../../apis/formApi';
import axios from 'axios';

export default function ViewForm() {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const [inputs,setInputs] = useState({})
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`${GET_ONE_FORM}${id}`);
        setForm(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchForm();
  }, [id]);

  const handleChange = (label, e) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [label]: e.target.value,
    }));
    console.log(inputs)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('form submitted, check console for data')
    console.log(inputs);
  };
  return (
    <>
    <h1 className={styles.title}>View Form</h1>
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>{form.title}</h2>
        <form  onSubmit={handleSubmit}>
        <div className={styles.fieldsContainer}>
            {form.inputs?.map((field, index) => (
                <div key={field._id} className={styles.field}>
                <label className={styles.label}>{field.label}</label>
                <input
                    type={field.formType}
                    placeholder={field.placeholder}
                    className={styles.input}
                    required
                    onChange={(e) => handleChange(field.label, e)}
                />
                </div>
            ))}
        </div>
        <input 
            className={styles.button}
            type='submit'
            value='Submit'
        />
        </form>
      </div>
    </div>
    </>
  );
}