import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { CREATE_FORM,GET_FORMS,GET_ONE_FORM,EDIT_FORM,DELETE_FORM } from '../apis/formApi';
export const startCreateForm=(form)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(CREATE_FORM,form,{
            })
            console.log(response.data)
            dispatch(createForm(response.data))
         
        }catch(err){
            console.log(err)
        }
    }
}
const createForm =(form)=>{
    return{
        type:'CREATE_FORM',
        payload:form
    }
}
export const startEditForm=(form,id)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.put(`${EDIT_FORM}${id}`,form,{
            })
            console.log(response.data)
            dispatch(editForm(response.data))
         
        }catch(err){
            console.log(err)
        }
    }
}
const editForm =(form)=>{
    return{
        type:'EDIT_FORM',
        payload:form
    }
}
export const startDeleteForm=(id)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.delete(`${DELETE_FORM}${id}`)
            console.log(response.data)
            dispatch(deleteForm(response.data.form))
         
        }catch(err){
            console.log(err)
        }
    }
}
const deleteForm =(form)=>{
    return{
        type:'DELETE_FORM',
        payload:form
    }
}

export const startGetForms=()=>{
    return async(dispatch)=>{
        try{
            const response = await axios.get(GET_FORMS)
            console.log(response.data)
            dispatch(getForms(response.data))
         
        }catch(err){
            console.log(err)
        }
    }
}
const getForms =(forms)=>{
    console.log('ge',forms)
    return{
        type:'GET_FORMS',
        payload:forms
    }
}