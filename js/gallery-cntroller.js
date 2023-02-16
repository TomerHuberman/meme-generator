'use strict'

function renderGallery() {
    let strHtml = ``
    const imgs = getImgs()
    strHtml = imgs.map(img => `<img src = ${img.url} alt = "" onclick="onSetImg(${img.id})"></img>`)

    const elGallery = document.querySelector('.img-container')
    elGallery.innerHTML = strHtml.join('')
}

function setFilterParam(filterBy) {
    filterParam(filterBy)
    renderGallery()
}

function onSetImg(id) {
    changeMainTo('editor')
    setImg(id)
    if (!gMeme.lines.length) {
        addLine()
        addLine()
    }
    renderMeme()
}

function changeMainTo(section) {
    const elMains = document.querySelectorAll('.main')
    elMains.forEach(main => {
        main.classList.add('none')
    })
    const elMain = document.querySelector(`.main-${section}`)
    elMain.classList.remove('none')
    if (section === 'memes') renderMemes()
}