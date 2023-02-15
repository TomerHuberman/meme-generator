'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    renderMeme()
    renderGallery()
}

function renderMeme() {
    let currMeme = getMeme()
    let currImg = getImgById(currMeme.selectedImgId)
    const img = new Image() // Create a new html img element
    img.src = currImg.url // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(currMeme.lines)
        setTxtInputValue()
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
}

function setTxtInputValue() {
    const elTxtInput = document.querySelector('.txt-input')
    elTxtInput.value = getCurrLine().txt
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function drawText(lines) {
    lines.forEach(line => {
        gCtx.beginPath()
        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px Arial`
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'

        gCtx.fillText(line.txt, line.x, line.y) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(line.txt, line.x, line.y) // Draws (strokes) a given text at the given (x, y) position.
    });

}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
