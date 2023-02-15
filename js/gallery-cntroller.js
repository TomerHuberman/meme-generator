'use strict'

function renderGallery() {
    let strHtml = ``
    const imgs = getImgs()
    strHtml = imgs.map(img => `<img src = ${img.url} alt = "" onclick="onSetImg(${img.id})"></img>`)

    const elGallery = document.querySelector('.main-gallery')
    elGallery.innerHTML = strHtml.join('')
}

function onSetImg(id) {
    setImg(id)
    renderMeme()
}