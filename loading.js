function showLoading() {
    const div = document.createElement("div");
    div.classList.add("loading", "centralize")

    const img = document.createElement("img");
    img.src = "/imagens/loading.gif";
    img.style.width = "60px"; 

    div.appendChild(img);
    document.body.appendChild(div) 
}

function hideLoading() {
   const loadings =  document.getElementsByClassName("loading")
   if(loadings.length) {
    loadings[0].remove();
   }
}
