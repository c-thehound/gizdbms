import { HANDLE_ON_CHANGE, MAKE_SALE, FETCH_SALES } from "./action-types";
import $ from 'jquery';
import csrftoken from "../../../utils/csrf_token";

export const handleChange = (name,value) => dispatch =>{
    dispatch({
        type:HANDLE_ON_CHANGE,
        payload:{name:name,value:value}
    })
}

export const makeSale = (data) => dispatch =>{
    $.ajax({
        url:'/api/sales/',
        type:'POST',
        data:data,
        headers:{
            'X-CSRFTOKEN':csrftoken
        },
        success:function(res){
            dispatch({
                type:MAKE_SALE,
                payload:res
            })
        }
    })
}

export const fetchSales = () => dispatch =>{
    $.ajax({
        url:'/api/sales/',
        type:'GET',
        headers:{
            'X-CSRFTOKEN':csrftoken
        },
        success:function(res){
            dispatch({
                type:FETCH_SALES,
                payload:res
            })
        }
    })
}