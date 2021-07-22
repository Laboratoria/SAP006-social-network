
  


 function singlepage () {
    function getContent(fragmentId, callback){

        const pages = {
          home: "This is the Home page. Welcome to my site.",
          about: "This page will describe what my site is about",
          contact: "Contact me on this page if you have any questions"
        };
      
        callback(pages[fragmentId]);
        
      }
      
      
      
      function loadContent(){
      
        const contentDiv = document.getElementById("app"),
            fragmentId = location.hash.substr(1);
      
        getContent(fragmentId, function (content) {
          contentDiv.innerHTML = content;
        });
      
      }
      
      if(!location.hash) {
        location.hash = "#home";
      }
      
      loadContent();
      
      window.addEventListener("hashchange", loadContent)
    

 };