'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

let gImgs = [
    { id: 1, url: 'imgs-square/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'imgs-square/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'imgs-square/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'imgs-square/4.jpg', keywords: ['funny', 'cat'] },

];
let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'hey this is my 1st line',
            size: 30,
            align: 'left',
            color: 'white',
            x: 250,
            y: 50,
        },
        {
            txt: 'hey this is my 2nd line',
            size: 40,
            align: 'left',
            color: 'white',
            x: 250,
            y: 350,
        },
    ]
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function scaleFont(num) {
    getCurrLine().size += num
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
    return gImgs
}

function getImgById(id) {
    return gImgs.find(img => img.id === id)
}

function setLineTxt(txt) {
    getCurrLine().txt = txt
}

function getCurrLine() {
    return  gMeme.lines[gMeme.selectedLineIdx]
}