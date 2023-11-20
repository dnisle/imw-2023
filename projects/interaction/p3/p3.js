$(document).ready(function () {
    var countdownTrue = true;
    var countdownValue = 10;
    
    $('#reset').on('click', function () {
        console.log("clicked!");
        location.reload(); // Reload the page
    });
    $('body').on('click', '#reset2', function () {
        console.log("clicked!");
        location.reload(); // Reload the page
    });
    

    function explode(){
        //hide all image when explode
        $('.img').hide();
        console.log("BOOM!");
        // Display explosion.gif //https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fsearch%2Fexplosion-gifs&psig=AOvVaw109jzKofIioM6R-bl_cmsF&ust=1700374588220000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiSyovzzIIDFQAAAAAdAAAAABAc
        var explosionImg = $('<img>').attr({
            'src': 'images/explosion.gif',
            'id': 'explosionImg'
        });
        $('#bombcontainer').append(explosionImg);

        // Remove explosion image after a delay (adjust as needed)
        setTimeout(function () {
            explosionImg.remove();
        }, 1700); // run the gif once then remove it
        setTimeout(function () {
            $('#bombcontainer').append('<p id="retrytext">Hit to retry</p>');
            $('#intro').remove();
            // Change visibility of #reset to visible after every image is removed
            $('#reset').css('display', 'block');
        }, 1700)
    }

    function updateCountdown() {
        if (countdownTrue){
            console.log(countdownValue);
            console.log(countdownTrue);
            //written with the help of CHATGPT
            $('#countdown').text('00:' + (countdownValue < 10 ? '0' : '') + countdownValue);
                countdownValue--;
            if (countdownValue >= 0 && countdownTrue == true) {
                setTimeout(updateCountdown, 1000); // Update every second
            }
            if (countdownValue < 0){
                explode();
            }
            
        }
        
    }

    // Initial countdown start
    updateCountdown();
    
    $('.vang').on('click', function () {
        //https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fsearch%2Fmissile-gifs&psig=AOvVaw05A6XanMpMaCWgB_qkxUOq&ust=1700453957578000&source=images&cd=vfe&opi=89978449&ved=0CBIQjhxqFwoTCLDG1uKaz4IDFQAAAAAdAAAAABAS
        var rocketGif= $('<img>').attr({
            'src': 'images/rocket.gif',
            'id': 'rocketGif'
        });
        $('#bombcontainer').append(rocketGif);
        
        var fireworkGif= $('<img>').attr({
            'src': 'images/firework.gif',
            'id': 'fireworkGif'
        });
        var resetImg = $('<img>').attr({
            'src': 'images/reset.png',
            'id': 'reset2'
        });
        setTimeout(function () {
            $('body').append(fireworkGif);
            rocketGif.remove();
            $('#bombcontainer').append(resetImg);
        }, 1700); // run the gif once then remove it
        
        //
        console.log("Correct wire!");
        countdownTrue = false;
        //change img to cut wired
        $('.vang').attr('src', 'images/vangcut.png');
    });
    $('.xanh').on('click', function () {
        
        console.log("Wrong wire");
        countdownTrue = false;
        explode();
        //change img to cut wired
        $('.xanh').attr('src', 'images/xanhcut.png');
        
         
        });
    });


