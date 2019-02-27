import $ from 'jquery';

function getCookie(name){
    var cookieValue = null;
    if(document.cookie && document.cookie !== ''){
        var cookies = document.cookie.split(';');
        for (var i = 0;i < cookies.length; i++){
            var cookie = $.trim(cookies[i]);
            // Does these cookie name begin with csrf
            if(cookie.substring(0,name.length + 1) === (name + '=')){
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
}

const csrftoken = getCookie('csrftoken');
export default csrftoken;