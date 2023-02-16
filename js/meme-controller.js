'use strict'

let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    changeMainTo('gallery')
    renderGallery()
    addListeners()
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

//Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    if (!gMeme.lines.length) {
        addLine()
        renderMeme()
        return
    }

    const pos = getEvPos(ev)
    const idx = witchLineClick(pos.x, pos.y)
    if (idx === -1) return
    onSwitchLine(idx)
    setLineDrag(true)
    renderMeme()
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    const { isDrag } = getCurrLine()
    if (!isDrag) return

    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderMeme()
}

function onUp() {
    // console.log('Up')
    setLineDrag(false)
    document.body.style.cursor = 'default'
}


function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onChangeColor(color) {
    changeColor(color)
    renderMeme()
}

function onScaleFont(num) {
    scaleFont(num)
    renderMeme()
}

function onSwitchLine(idx) {
    switchLine(idx)
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
    moveLineBtn(num)
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

function onSaveToMemes(){
    saveToMemes()
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
