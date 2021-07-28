export default () => {

  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id","forgot-password")

  const pageNotFound = `
   <div class=" container-center" >
   
      <h1 class="h1 ">Página não encontrada</h1> 
      <a class="" id="back">Retornar para o site</a>   
      
    </div>
  `
  //<button class="back-to-login-fp">← Voltar</button>
  sectionElement.innerHTML= pageNotFound 

  const backToSite = sectionElement.querySelector("#back") 
  backToSite.addEventListener("click", (e) => {
    e.preventDefault()
    window.history.pushState(null, null, "/home")
    const popStateEvent = new PopStateEvent("popstate", {state:{}})
    dispatchEvent(popStateEvent)
  })
  return sectionElement
}
