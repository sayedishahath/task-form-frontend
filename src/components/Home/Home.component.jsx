import { useNavigate } from "react-router-dom";
import styles from './Home.module.css';
import { useSelector,useDispatch } from "react-redux";
import { startDeleteForm } from "../../actions/formActions";
export default function Home() {
    const dispatch = useDispatch()
    const forms = useSelector((state=>{
        return state.form.data
    }))
    console.log(forms)
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/form/create");
  };

  const handleNavigateToForm = (id) => {
    navigate(`/form/${id}`);
  }
  const handleNavigateToEdit = (id)=>{
    navigate(`/form/${id}/edit`)
  }

  const handleDelete = (id) => {
    dispatch(startDeleteForm(id))
    console.log('delete clicked')
  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to form Builder</h1>
        <p className={styles.description}>This is a simple form builder</p>
      </header>
      <button className={styles.button} onClick={handleNavigate}>Create Form</button>
      <hr className={styles.hr} />
      <div  className={styles.formsContainer}>
        <h2 className={styles.title}>Forms</h2>
        {forms.length !=0?
         <div className={styles.tileContainer}>
         {forms?.map((form)=>{
             return (
                 <div key={form._id} className={styles.formTiles}>
                     <div className={styles.formTitle}>{form.title}</div>
                     <button onClick={()=>{
                        handleNavigateToForm(form._id)
                     }} className={styles.actionBtnVe}>View</button>
                     <button onClick={()=>{
                        handleNavigateToEdit(form._id)
                     }} className={styles.actionBtnEd}>Edit</button>
                     <button onClick={()=>{
                        handleDelete(form._id)
                     }} className={styles.actionBtnDe}>Delete</button>
                 </div>
             );
         })}
         </div>:
         <div className={styles.description}>No forms created yet.</div>}
        
       
        
      </div>
    </div>
  );
}