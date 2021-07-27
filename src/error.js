export const errorInput = (text, element ) => {
  element.style.border = "1px solid red"
  element.style.color = "red"
  element.value = text
  element.addEventListener("focus", function () {
    this.value = "";  
    element.style.border = "none"
    element.style.color = "rgb(70, 60, 75)"
  });

}

export const errorPassword = (text, element) => {
  element.style.border = "1px solid red"
  element.style.color = "red"
  element.type="text"
  element.value = text
  element.addEventListener("focus", function () {
    this.value = "";  
    element.type="password"
    element.style.border = "none"
    element.style.color = "rgb(70, 60, 75)"
  })

}