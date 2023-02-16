'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    changeMainTo('gallery')
    renderGallery()
    // filterParam('')
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function renderMeme(d) {
    let currMeme = getMeme()
    let currImg = getImgById(currMeme.selectedImgId)
    const img = new Image() // Create a new html img element
    img.src = currImg.url // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(currMeme.lines)
        setTxtInputValue()
        if (d) return
        const { x, y } = getCurrLine()
        selectedLine(x, y)
    }
}

function onChangeColor(color) {
    changeColor(color)
    renderMeme()
}

function onScaleFont(num) {
    scaleFont(num)
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    setTxtInputValue()
    renderMeme()
}

function setTxtInputValue() {
    const elTxtInput = document.querySelector('.txt-input')
    elTxtInput.value = getCurrLine().txt
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onMoveLine(num) {
    moveLine(num)
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function downloadImg(elLink) {
    if (confirm('are you sure you want to download?')) return
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
