
export default () =>{

  window.history.pushState("profile", null, "profile") 


  const sectionElement = document.createElement("section")
  const createProfileTemplate = `
  <h2 id="user-name"></h2>
  <img id="user-image"/>
  `
sectionElement.innerHTML= createProfileTemplate

return sectionElement
}