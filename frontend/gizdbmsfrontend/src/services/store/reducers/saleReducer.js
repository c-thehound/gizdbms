import { HANDLE_ON_CHANGE, MAKE_SALE, FETCH_SALES } from "../actions/action-types";

const initialState = {
    customer:"",
    county:"",
    product:"",
    serial:"",
    quantity:"",
    deposit:"",
    credit:"",
    red:{},
    sales:[]
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
        case FETCH_SALES:
            return{
                ...state,
                sales:action.payload
            }
        default:
            return state;
    }
}