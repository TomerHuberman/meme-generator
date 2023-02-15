'use strict'

function renderGallery() {
    let strHtml = ``
    const imgs = getImgs()
    strHtml = imgs.map(img => `<img src = ${img.url} alt = "" onclick="onSetImg(${img.id})"></img>`)

    const elGallery = document.querySelector('.img-container')
    elGallery.innerHTML = strHtml.join('')
}

function onSetImg(id) {
    changeMainTo('editor')
    setImg(id)
    renderMeme()
}

function changeMainTo(section) {
    const elMains = document.querySelectorAll('.main')
    elMains.forEach(main => {
        main.classList.add('none')
    })
    const elMain = document.querySelector(`.main-${section}`)
    elMain.classList.remove('none')
}