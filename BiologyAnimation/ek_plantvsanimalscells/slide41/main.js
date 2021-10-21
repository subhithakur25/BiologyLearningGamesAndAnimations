$(() => {
    const firstImage = $('#firstImage')
    const secondImage = $('#secondImage')
    const secondImageDiv = $('#secondImageDiv')
    const firstImageDiv = $('#firstImageDiv')

    firstImage.click(() => {
        secondImageDiv.removeClass('d-none')
        firstImageDiv.addClass('d-none d-md-block')
        firstImage.addClass('cursorNotAllowed')
    })

    image1 = resources["image1"]
    image2 = resources["image2"]
    differences = resources["differences"]
    console.log(resources)
    console.log(resources["image1"])    
    
    firstImage.attr('src', image1)
    secondImage.attr('src', image2)

    secondImage.click((() => {
        let clickCount = 0
        let imageSrc = image2

        return () => {
            if(clickCount === differences.length) {
                return
            }

            if(clickCount === differences.length - 1) {
                secondImage.addClass('cursorNotAllowed')
            }

            imageSrc = differences[clickCount].image
            secondImage.attr('src', imageSrc)

            clickCount += 1
        }
    })())
});