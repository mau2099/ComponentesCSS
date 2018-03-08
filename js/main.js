class Index {
  constructor(selector, selectorItems, selectorContainer) {
    this.index = document.querySelector(selector);
    this.items = this.index.querySelectorAll(selectorItems);
    this.iframe = document.querySelector(selectorContainer)
    this.openiFrame = this.openiFrame.bind(this);
    this.bindEvents();
  }

  bindEvents(){
    this.items.forEach(item => {
      item.addEventListener("click", this.openiFrame);
    });
  }

  openiFrame(ev){
    ev.preventDefault();
    let item = ev.currentTarget;
    // let url = item.href.replace("http", "https");
    // console.log(url);
    console.log(item.href);
    this.iframe.src = item.href;
  }
}

;(function(){
  transformicons.add('.tcon');
  document.querySelector(".toggle-menu").addEventListener("click", open);

  function open(){
    document.querySelector(".main-container").classList.toggle("open");
  }

  new Index(".main-container", "a", "#content-show")
})()
