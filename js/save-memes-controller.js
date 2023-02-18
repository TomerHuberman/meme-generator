'use strict'

function renderMemes() {
    let strHtml = ``
    const memes = loadFromStorage('memes')
    strHtml = memes.map((meme, idx) => `<div class="img-storage-container">
    <img src = ${meme.memeImg} alt = "" onclick="onGetMeme(${idx})"></img>
    <button class="btn-delete-storage btn-round" onclick="deleteFromStorage(${idx})">X</button>
    </div>`)

    const elGallery = document.querySelector('.memes-container')
    elGallery.innerHTML = strHtml.join('')
}

function deleteFromStorage(idx) {
    gMemes.splice(idx, 1)
    saveToStorage('memes', gMemes)
    renderMemes()
}

function onGetMeme(idx) {
    changeMainTo('editor')
    const memes = loadFromStorage('memes')
    setMeme(memes[idx])
    renderMeme()
}
