/*global $ cities */

// Lesson 2 - displaying cities in a list
$(function(){

    $.get('/cities', appendToList);
    
    $('form').on('submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var cityData = form.serialize();
        
    $('.block-list').on('click', 'a[data-block]', function(event){
        if (!confirm('Are you sure?')) {
            return false;
        }
        
        var target = $(event.currentTarget);
        
        $.ajax ({
            type: 'DELETE', url: '/cities/' + target.data('block')
        }).done(function() {
            target.parents('li').remove();
        });
    });
});    
        
    $.ajax({
        type: 'POST', url: '/cities', data: cityData 
    }).done(function(cityName){
        appendToList([cityName]);
        form.trigger('reset');
    });  
    });
    
    function appendToList(cities) {
        var list = [];
        var content, city;
        for (var i in cities){
            city = cities[i]; 
            content = '<a href="/cities/'+city+'">'+city+'</a>';
            list.push($('<li>', { html: content }));
        }
        $('.cities-list').append(list); 
    }