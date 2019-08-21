window.addEventListener('DOMContentLoaded', (event) => {
    let form = document.getElementById("form")
    let textArea = document.getElementById("textarea")
    
    form.addEventListener('submit', e=>submitHandler(e, form, textArea))
});

let submitHandler= (e, form, textArea) => {
    e.preventDefault()
    let div = document.createElement("div")
    let articleBody = e.target.elements[0].value
    div.innerHTML = articleBody

    let p = Array.from(div.getElementsByTagName("p"))
    let img = Array.from(div.getElementsByTagName("img"))
    let em = Array.from(div.getElementsByTagName("em"))
    let h4 = Array.from(div.getElementsByTagName("h4"))
    let h3 = Array.from(div.getElementsByTagName("h3"))
    let i = Array.from(div.getElementsByTagName("i"))
    let strong = Array.from(div.getElementsByTagName("strong"))
    let span = Array.from(div.getElementsByTagName("span"))
    let font = Array.from(div.getElementsByTagName("font"))
    let a = Array.from(div.getElementsByTagName("a"))

    let pageContents = [p,h3,h4,em,i,a,img,strong,span]
    let pageContentsNoSpan = [p,h3,h4,em,i, img, strong]

    removeStyles(pageContents)
    fontKiller(font)
    spanKiller(div)
    fontReKiller(div)
    
    // spaceKiller(div)
    textArea.value = div.outerHTML
    .replace(/<div>/g,"")
    .replace(/<\/div>/g,"")

}

spaceKiller = function(div){
    console.log(div)
    // for (let i=0;i<data.length;i++){
    //     if(data[i].innerHTML.replace(/\s/g,'').length<1){
    //         div.remove(data[i])
    //         data[i].remove()
    //     }
    // }
    // for (let i=0; )
    // data.forEach(p=>{ 
    //             if (p.innerHTML.replace(/\s/g,'').length<1){

    //              p.remove()
    //             }
    //     }
    // )
    // p.innerHTML.includes("a")?console.log("Found A"):console.log("Didn't find A")
}

spanKiller = function(data){
    let bodyContents = data
    let cleanedBody = bodyContents.innerHTML
        .replace(/<span>/g,"")
        .replace(/<\/span>/g,"")
        .replace(/\s/g," ")
        .replace(/&quot;/g,"'")
        .replace(/<strong><img/g,"<img")
        .replace(/><\/strong>/g,">")
        .replace(/<em><img/g,"<img")
        .replace(/><\/em>/g,">")
        .replace(/&quot;/g,)
        .replace(/&nbsp;/g," ")
        .replace(/<div>/g,"")
        .replace(/<\/div>/g,"")
    data.innerHTML = cleanedBody
}   


let fontKiller = (data) =>{
    data.forEach(font => {
        let text = font.innerHTML
        let pNode 
        if (font.parentNode){
            pNode = font.parentNode
            pNode.innerHTML = text
        }
        font.remove()    
    })
}

// fontkiller wasn't getting the job completely done.
fontReKiller = function(data){
    let bodyContents = data
    let cleanedBody = bodyContents.innerHTML
        .replace(/<font color="#000000">/,"")
        .replace(/<\/font>"/,"")
    data.innerHTML = cleanedBody

}

// takes an array of arrays as an object, which it assumes will be a collection of grouped
// HTML tags. 
// For each tag besides image tags, it removes the style and class information.
// For images, it preserves style information. 

let removeStyles = (data) => {
    if (data.length>0) {data.forEach(element => {
        element.forEach(e=> {
            if (e.tagName!=="IMG"){
                e.removeAttribute('class')
                e.removeAttribute('style')
            }
            else if (e.tagName === "IMG"){
                if (e.src.includes("banner")){
                    let imgStyle = e.getAttribute('style')
                    if (imgStyle==null){
                        e.setAttribute('style',"display: inline")
                        console.log(e.getAttribute('style'))
                    }
                    else {
                    e.setAttribute('style', `${imgStyle}`+"display: inline")
                }
                
            }
            
            }})
    })}
}