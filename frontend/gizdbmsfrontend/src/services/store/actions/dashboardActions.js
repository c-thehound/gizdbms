import $ from 'jquery';
import csrftoken from '../../../utils/csrf_token';
import { FETCH_DASHBOARD_DATA } from './action-types';

export const fetch_dashboard = () => dispatch =>{
    $.ajax({
        url:'/api/dashboard/',
        type:'GET',
        headers:{
            'X-CSRFTOKEN':csrftoken
        },
        success:function(response){
            dispatch({
                type:FETCH_DASHBOARD_DATA,
                payload:response
            })
        }
    })
}