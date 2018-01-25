/*global $ cities */
$(function(){

    $.get('/cities', appendToList);
        
    function appendToList(cities) {
        var list = [];
        for (var i in cities){
            list.push($('<li>', {text : cities[i] }, '</li>'));
        }
        $('.cities-list').append(list); 
    }    
});