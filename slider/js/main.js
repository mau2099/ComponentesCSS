class IndexForSiblings{
  static get(el){
    let children = el.parentNode.children;
    for(var i = 0; i < children.length; i++){
      let child = children[i]
      if(child == el)
        return i;
    }
  }
}
class Slider{
  constructor(selector, movimiento = true){
    this.move = this.move.bind(this);
    this.movedByButton = this.movedByButton.bind(this);
    this.slider = document.querySelector(selector);
    this.interval = null;
    this.contador = 0;
    this.timer = 3000;
    this.movimiento = movimiento;
    this.itemsCount = this.slider.querySelectorAll(".container > *").length;
    this.start(); //Inicio de todo
    this.buildControls();
    this.bindEvents();
  }

  start(){
    if(this.movimiento)
      this.interval = window.setInterval(this.move, this.timer);
  }

  move(){

    this.contador++;
    if(this.contador >= this.itemsCount)
      this.contador=0;
    this.moveTo(this.contador);
  }

  moveTo(index){
    let left = index * 100;
    this.resetIndicator();
    this.slider.querySelector(".controls li:nth-child("+(index+1)+")").classList.add("active")
    this.slider.querySelector(".container").style.left = "-" +left + "%";
  }

  movedByButton(ev){
    let index = IndexForSiblings.get(ev.currentTarget);
    this.contador = index;
    this.moveTo(index);
    this.restarInterval();
  }

  buildControls(){
    for (var i = 0; i < this.itemsCount; i++) {
      let control = document.createElement("li");
      if(i == 0)
        control.classList.add("active");
      this.slider.querySelector(".controls ul").appendChild(control);
    }
  }

  bindEvents(){
    this.slider.querySelectorAll(".controls li")
      .forEach(item=> item.addEventListener("click", this.movedByButton));
  }

  resetIndicator(){
    this.slider.querySelectorAll(".controls li.active")
      .forEach(item=> item.classList.remove("active"));
  }
  restarInterval(){
    if(this.interval)
      window.clearInterval(this.interval);
    this.start();
  }
}

;(function(){
  new Slider(".slider");
  //new Slider(".slider", false);
})()
