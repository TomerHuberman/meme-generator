'use strict'
function changeParam(key, value){
    let params = new URLSearchParams(window.location.search);
    params.delete(key)
    params.append(key, value)
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function deleteQueryParam(key) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    params.delete(key);
    url.search = params.toString();

    window.history.pushState({ path: url.href }, '', url.href);
}

function getValFromParam(key) {
    const queryStringParams = new URLSearchParams(window.location.search);
    return queryStringParams.get(key);
}