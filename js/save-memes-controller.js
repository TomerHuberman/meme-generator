'use strict'

function renderMemes() {
    let strHtml = ``
    const imgs = getImgs()
    const memes = loadFromStorage('memes')
    strHtml = memes.map((meme, idx) => `<img src = ${meme.memeImg} alt = "" onclick="onGetMeme(${idx})"></img>`)

    const elGallery = document.querySelector('.memes-container')
    elGallery.innerHTML = strHtml.join('')
}

function onGetMeme(idx) {
    const memes = loadFromStorage('memes')
    setMeme(memes[idx])
    renderMeme()
    changeMainTo('editor')
}
