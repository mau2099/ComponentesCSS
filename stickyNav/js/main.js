;(function(){
  let sticky = false;
  let nav = document.querySelector(".sticky-nav");
  let heroImage = document.querySelector(".hero-image");

  window.addEventListener("scroll", function(ev){
    // let coords = nav.getBoundingClientRect();
    // let coordsHeader = heroImage.getBoundingClientRect();
    if(window.scrollY > heroImage.offsetHeight){
      nav.classList.add("fixed");
    }
    else {
      nav.classList.remove("fixed");
    }
  });
})()
