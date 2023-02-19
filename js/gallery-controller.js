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
    resetLines()
    renderMeme()
}

function onChangeHeaderActive(section) {
    const navs = document.querySelectorAll('.main-menu a')
    navs.forEach(main => {
        main.classList.remove('active')
    })
    if (section === 'editor') return
    const elNav = document.querySelector(`.nav-${section}`)
    elNav.classList.add('active')
}

function changeMainTo(section) {
    onChangeHeaderActive(section)
    const elMains = document.querySelectorAll('.main')
    elMains.forEach(main => {
        main.classList.add('none')
    })
    const elMain = document.querySelector(`.main-${section}`)
    elMain.classList.remove('none')
    elMain.classList.add('active')
    if (section === 'memes') renderMemes()
}