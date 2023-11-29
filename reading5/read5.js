document.addEventListener("DOMContentLoaded", function() {
    const images = ['flowers/1.png', 'flowers/2.png', 'flowers/3.png', 'flowers/4.png', 'flowers/5.png', 'flowers/6.png'];
    let currentIndex = 0;
    const waterBox = document.getElementById('waterBox');

    //embed div with currently active image
    function showImage(index) {
        const container = document.querySelector('.container');
        container.innerHTML = `<img class ="img" src="${images[index]}" alt="Image ${index + 1}">`;
    }

    //image switcher
    function toggleImages() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            showImage(currentIndex);
        } else {
            console.log("All images have been displayed.");
        }
    }

    waterBox.addEventListener('click', toggleImages);

    // show the initial image
    showImage(currentIndex);
});
