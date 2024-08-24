const initialState = {
    data:[],
    serverErrors:[]
}

export  function  formReducers  (state = initialState, action){
    switch(action.type){
        case "GET_FORMS":
            return {
                ...state,
                data:action.payload
            }
        case "CREATE_FORM":
            return {
                ...state,
                data:[...state.data,action.payload]
            }
        case "DELETE_FORM" :
            return {
                ...state,
                data:state.data.filter(form=>form._id!==action.payload._id)
            }
        case "SET_SERVER_ERRORS":
            return {
                ...state,
                serverErrors:action.serverErrors
            }
        default:
            return state
    }
}