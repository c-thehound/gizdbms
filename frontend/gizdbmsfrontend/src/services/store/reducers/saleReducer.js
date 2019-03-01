import { HANDLE_ON_CHANGE, MAKE_SALE } from "../actions/action-types";

const initialState = {
    customer:"",
    county:"",
    product:"",
    serial:"",
    quantity:"",
    deposit:"",
    credit:"",
    red:{}
}

export default function(state = initialState,action){
    switch (action.type) {
        case HANDLE_ON_CHANGE:
            return{
                ...state,
                [action.payload.name]:action.payload.value
            }
        case MAKE_SALE:
            return{
                ...state,
                res:action.payload
            }
        default:
            return state;
    }
}