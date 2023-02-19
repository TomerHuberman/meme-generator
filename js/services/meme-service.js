'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gMemes
let gImgs = [
    { id: 1, url: 'imgs-square/1.jpg', keywords: ['funny', 'politicians'] },
    { id: 2, url: 'imgs-square/2.jpg', keywords: ['animal'] },
    { id: 3, url: 'imgs-square/3.jpg', keywords: ['kids', 'animal'] },
    { id: 4, url: 'imgs-square/4.jpg', keywords: ['animal'] },
    { id: 5, url: 'imgs-square/5.jpg', keywords: ['funny', 'kids'] },
    { id: 6, url: 'imgs-square/6.jpg', keywords: ['funny', 'actors'] },
    { id: 7, url: 'imgs-square/7.jpg', keywords: ['funny', 'kids'] },
    { id: 8, url: 'imgs-square/8.jpg', keywords: ['funny', 'actors'] },
    { id: 9, url: 'imgs-square/9.jpg', keywords: ['funny', 'kids'] },
    { id: 10, url: 'imgs-square/10.jpg', keywords: ['funny', 'politicians'] },
    { id: 11, url: 'imgs-square/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'imgs-square/12.jpg', keywords: ['funny', 'actors'] },
    { id: 13, url: 'imgs-square/13.jpg', keywords: ['funny', 'actors'] },
    { id: 14, url: 'imgs-square/14.jpg', keywords: ['funny', 'actors'] },
    { id: 15, url: 'imgs-square/15.jpg', keywords: ['funny', 'actors'] },
    { id: 16, url: 'imgs-square/16.jpg', keywords: ['funny', 'actors'] },
    { id: 17, url: 'imgs-square/17.jpg', keywords: ['funny', 'politicians'] },
    { id: 18, url: 'imgs-square/18.jpg', keywords: ['funny', 'kids'] },
    { id: 19, url: 'imgs-not-square/putin.jpg', keywords: ['funny', 'kids'] },
    { id: 20, url: 'imgs-not-square/drevil.jpg', keywords: ['funny', 'kids'] },
];

_getMemes()

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
}

function setCanvasHeight(canvasWidth, imgHeight, imgWidth) {
    return canvasWidth * imgHeight / imgWidth
}

function setMeme(meme) {
    gMeme = meme
}

function filterParam(filterBy) {
    changeParam('filterBy', filterBy)
}

function switchLine(idx) {
    gMeme.selectedLineIdx = idx
}

function scaleFont(num) {
    getCurrLine().size += num
    markSelectedLine()
}

function changeColor(color) {
    getCurrLine().color = color
}

function setImg(id) {
    gMeme.selectedImgId = id
}


// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
        // Can also do it this way:
        // img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function addNewImg(img) {
    gImgs.push(
        { id: gImgs.length + 1, url: `${img.src}`, keywords: ['funny', 'kids'] },
    )
    setImg(gImgs.length)
    resetLines()
    renderMeme()
}

function getMeme() {
    return gMeme
}
function getImgs() {
    const filterBy = getValFromParam('filterBy')
    if (!filterBy) return gImgs
    return gImgs.filter(img => img.keywords.toString().includes(filterBy))
}

function getImgById(id) {
    return gImgs.find(img => img.id === id)
}

function setLineTxt(txt) {
    if (!getCurrLine()) addLine()
    getCurrLine().txt = txt
}

function clearEmpty() {
    gMeme.lines = gMeme.lines.filter(line => line.txt !== '')
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getCurrLineTxt() {
    return getCurrLine().txt
}

function moveLineBtn(num) {
    if (getCurrLine().y > 420 && num > 0 || getCurrLine().y < 30 && num < 0) return
    getCurrLine().y += num
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function addEmoji(emoji) {
    const newEmoji = {
        txt: `${emoji}`,
        size: 50,
        isDrag: false,
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2,
    }
    gMeme.lines.push(newEmoji)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function resetLines() {
    renderMeme()
    gMeme.lines = []
    addLine()
    addLine()
    gMeme.selectedLineIdx = 0
}

function getDeffTxt() {
    return 'Text will be here'
}

function addLine() {
    const newLine = {
        txt: getDeffTxt(),
        size: 30,
        align: 'left',
        fontFamily: 'impact',
        color: 'white',
        isDrag: false,
        x: gElCanvas.width / 2,

    }
    if (!gMeme.lines.find(line => line.pos === 'top')) {
        newLine.y = 40
        newLine.pos = 'top'
    } else if (!gMeme.lines.find(line => line.pos === 'bottom')) {
        newLine.y = gElCanvas.height - 40
        newLine.pos = 'bottom'
    } else {
        newLine.y = gElCanvas.height / 2
    }

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function measureText() {
    const { txt, size } = getCurrLine()
    const height = size + 10
    const width = gCtx.measureText(txt).width + 10
    return { height, width }
}

function markSelectedLine(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 3
    const { height, width } = measureText()
    gCtx.strokeRect(x - width / 2, y - height / 2, width, height)
}

function moveLine(dx, dy) {
    const line = getCurrLine()
    line.x += dx
    line.y += dy
}

function setLineDrag(isDrag) {
    getCurrLine().isDrag = isDrag
}

function witchLineClick(x, y) {
    return gMeme.lines.findIndex(line => {
        const width = gCtx.measureText(line.txt).width + 10
        const height = line.size + 10
        return line.x - width / 2 < x && line.x + width / 2 > x &&
            line.y - height / 2 < y && line.y + height / 2 > y
    })
}

function saveToMemes() {
    const memeToSave = JSON.parse(JSON.stringify(gMeme))
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    memeToSave.memeImg = imgContent
    memeToSave.isFromStorage = true
    gMemes.push(memeToSave)
    saveToStorage('memes', gMemes)
}

function _getMemes() {
    const memes = loadFromStorage('memes')
    gMemes = memes ? memes : []
}