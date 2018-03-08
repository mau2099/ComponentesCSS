;(function(){
  transformicons.add('.tcon');

  document.querySelector(".toggle-menu").addEventListener("click", open);

  function open(){
    document.querySelector(".main-container").classList.toggle("open");
  }
})()
