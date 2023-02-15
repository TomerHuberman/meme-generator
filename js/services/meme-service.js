'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

let gImgs = [
    { id: 1, url: 'imgs-square/1.jpg', keywords: ['funny', 'politicoes'] },
    { id: 2, url: 'imgs-square/2.jpg', keywords: [ 'animal'] },
    { id: 3, url: 'imgs-square/3.jpg', keywords: ['kids', 'animal'] },
    { id: 4, url: 'imgs-square/4.jpg', keywords: ['animal'] },
    { id: 5, url: 'imgs-square/5.jpg', keywords: ['funny', 'kids'] },
    { id: 6, url: 'imgs-square/6.jpg', keywords: ['funny', 'actors'] },
    { id: 7, url: 'imgs-square/7.jpg', keywords: ['funny', 'kids'] },
    { id: 8, url: 'imgs-square/8.jpg', keywords: ['funny', 'actors'] },
    { id: 9, url: 'imgs-square/9.jpg', keywords: ['funny', 'kids'] },
    { id: 10, url: 'imgs-square/10.jpg', keywords: ['funny', 'politicoes'] },
    { id: 11, url: 'imgs-square/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'imgs-square/12.jpg', keywords: ['funny', 'actors'] },
    { id: 13, url: 'imgs-square/13.jpg', keywords: ['funny', 'actors'] },
    { id: 14, url: 'imgs-square/14.jpg', keywords: ['funny', 'actors'] },
    { id: 15, url: 'imgs-square/15.jpg', keywords: ['funny', 'actors'] },
    { id: 16, url: 'imgs-square/16.jpg', keywords: ['funny', 'actors'] },
    { id: 17, url: 'imgs-square/17.jpg', keywords: ['funny', 'politicoes'] },
    { id: 18, url: 'imgs-square/18.jpg', keywords: ['funny', 'kids'] },

];
let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'asdasdasd',
            size: 30,
            align: 'left',
            color: 'white',
            x: 225,
            y: 40,
            pos: 'top'
        },
        {
            txt: 'hey line',
            size: 40,
            align: 'left',
            color: 'white',
            x: 225,
            y: 410,
            pos: 'bottom'
        },
    ]
}

function filterParam(filterBy) {
    changeParam('filterBy',filterBy)
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function scaleFont(num) {
    getCurrLine().size += num
    selectedLine()
}

function changeColor(color) {
    getCurrLine().color = color
}

function setImg(id) {
    gMeme.selectedImgId = id
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
    getCurrLine().txt = txt
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function moveLine(num) {
    if (getCurrLine().y > 420 && num > 0 || getCurrLine().y < 30 && num < 0) return
    getCurrLine().y += num
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function addLine() {
    const newLine = {
        txt: 'Add text in here',
        size: 30,
        align: 'left',
        color: 'white',
        x: 225,
    }
    if (!gMeme.lines.find(line => line.pos === 'top')) {
        newLine.y = 40
        newLine.pos = 'top'
    } else if (!gMeme.lines.find(line => line.pos === 'bottom')) {
        newLine.y = 410
        newLine.pos = 'bottom'
    } else {
        newLine.y = 225
    }

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function drawText(lines) {
    lines.forEach(line => {
        gCtx.beginPath()
        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px impact`
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'

        gCtx.fillText(line.txt, line.x, line.y) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(line.txt, line.x, line.y) // Draws (strokes) a given text at the given (x, y) position.
    });
}

function selectedLine(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 3
    const line = getCurrLine()
    const width = gCtx.measureText(line.txt).width + 10
    console.log("line.txt: ", line.txt);
    console.log("width: ", width);
    const height = line.size + 10
    gCtx.strokeRect(x - width / 2, y - height / 2, width, height)
}

function isLineClick() {
    const line = getCurrLine()
    const width = gCtx.measureText(line.txt).width + 10
    const height = line.size + 10
    x - width / 2, y - height / 2, width, height
}