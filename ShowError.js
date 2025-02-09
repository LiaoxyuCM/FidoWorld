
function showError(){
    //Error: Getting error FidoWorld/:8  GET https://cdn.jsdelivr.net/npm/marked/marked.min.js net::ERR_CONNECTION_TIMED_OUT

    const errorMsg = document.createElement('div');
    errorMsg.className = 'error';
    errorMsg.textContent = 'Cannot load the markdown parser. Please try again later.';
    document.body.appendChild(errorMsg);
    const firstchild = document.body.firstChild;
    document.body.insertBefore(errorMsg, firstchild);
}
