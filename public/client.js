/*global $ cities cityData */

// Lesson 2 - get method to post the cities in a list on HTML page
$(function(){

    $.get('/cities', appendToList);

    function appendToList(cities) {
        var list = [];
        var city, content;
        for (var i in cities){
            city = cities[i]; 
            content = '<a href="/cities/'+ city +'">' + city + '</a>' + '<a href="#" data-city="' + city + '"> X </a>';
            list.push($('<li>', { html: content }));
        }
        $('.cities-list').append(list); 
    }

    function invalidEntry() {
        if ($('#city').length <4 || $('#state').length < 2) {
            alert = "Invalid Entry";
            return false;
        }
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        console.log("on submit buttom clicked");
        
        invalidEntry();
        console.log("invalid entry form ran");
        
        var form = $(this);
        var cityData = form.serialize();
        
        $.ajax({
            type: 'POST', 
            url: '/cities', 
            data: cityData 
    }).done(function(cityName){
        appendToList([cityName]);
        form.trigger('reset');
    });  

//jquery onclick function
$('.cities-list').on('click', '[data-city]', function(event){
    if (!confirm('Are you sure you want to delete this city?')) {
        return false;
    }
    
    var target = $(event.currentTarget); //var for the city/link that is clicked
    
    $.ajax ({
        type: 
        'DELETE', 
        url: '/cities/' + target.data('city')
        }).done(function() {
            target.parents('li').remove();
        });
    });
});    
});
        
    
    