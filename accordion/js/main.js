class Accordion {
  constructor(selector, multiple = true) {
    this.accordion = document.querySelector(selector);
    this.multiple = multiple;
    this.bindEvents();
  }

  bindEvents(){
    this.accordion.querySelectorAll(".item header").forEach(itemHeader => {
      itemHeader.addEventListener("click", ()=>{
        let item = itemHeader.parentNode;
        this.validateMultiple(item);
        item.classList.toggle("active");
      });
    });
  }

  validateMultiple(currentItem){
    if(this.multiple) return;

    this.accordion.querySelectorAll(".item").forEach(item => {
      if(currentItem == item) return;
      item.classList.remove("active");
    });
  }
}

;(function(){
  new Accordion(".accordion", false);
})()
