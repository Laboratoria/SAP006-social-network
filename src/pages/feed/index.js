import { } from '../../lib/index.js'

export default () => {

    const sectionElement = document.createElement("section")
    sectionElement.setAttribute("id","feed")
    sectionElement.setAttribute("class","form-container")

    const feedTemplate = `<h1>BEM VINDO <3</h1>`

    sectionElement.innerHTML = feedTemplate


// botao curtir

// botao comentar

//botao criar review

//botao logOut

    return sectionElement

}


