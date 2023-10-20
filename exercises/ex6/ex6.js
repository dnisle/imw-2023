//onclick #dnis function
$("#dnis").click(function() {
    console.log("click!");
    $("#para2").fadeIn();
});

//Hover #dnis event
$("#dnis").hover(function() {
//mouse over event
    $(this).css('color', 'yellow');
}, function() {
    //reset color when not hovered
    $(this).css('color', 'red');
});

//Hover student event
$("#student").hover(function() {
//mouse over event
    $(this).css('color', 'yellow');
}, function() {
    //reset color when not hovered
    $(this).css('color', 'red');
});

//create a square on click #student
$("#student").click(function() {
    const InsSquare = '<div class="container"><div id="square">Hover me!</div></div>'
    $('body').append(InsSquare);
});


//hide #para2 by default to fadeIn() with another function    
$("#para2").hide();

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
let colorIndex = 0;

function changeColor() { //written with the help of chatGPT, prompt:" 
                         //give me a jquery block of code that cycle an element's color slowly overtime through all colors"
    $('#advert').css('color', colors[colorIndex]);
        colorIndex = (colorIndex + 1) % colors.length;
    }

    // Set an interval to gradually change the color every 2 seconds (adjust the timing as needed)
setInterval(changeColor, 1000);


//initially I used on hovered but:"is not correctly binding to the square because the square is created dynamically after the page loads,
//  and the event is attached to it before it exists in the DOM" -CHATGPT, so I was suggested to detect mouseenter on body instead.
$('body').on('mouseenter', '#square', function () {
    console.log("hovered!");
    $(this).css('background-color', 'pink');
  }).on('mouseleave', '#square', function () {
    $(this).css('background-color', 'grey');
    console.log("switched back!");
  });

