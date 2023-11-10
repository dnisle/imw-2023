// jquery shorthand for making sure document is fully loaded
$(function () {
    fetch("https://dog.ceo/api/breed/poodle/images")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.message[0]);
            // $("main").append("<p>"+data.message[0]+"</p>");
            $("main").append('<div></div>')
            for (let i = 0; i < 12; i++) {
                const randomIndex = Math.floor(Math.random() * data.message.length);
                const imageUrl = data.message[randomIndex];

                // $("main").append("<img src="+imageUrl+">");
                $("main").append(`<img class="dogImg" src="${imageUrl}">`);

            }
        })
        .catch(function (error) {
            $("main").html("There's been an error!");
        })
})