class ViewPort{
  static visible(el){

    let coords = el.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight; //tamaño de la pantalla
    return (coords.top < windowHeight && (coords.top * -1) < el.clientHeight);
  }
}

class PlayOnViewPort {
  constructor(selector) {
    this.video = document.querySelector(selector);
    this.evaluate = this.evaluate.bind(this);
    this.bindEvents();
  }

  bindEvents(){
    window.addEventListener("scroll", this.evaluate);
  }

  evaluate(){
    if(ViewPort.visible(this.video)){
      this.video.play();
    }
    else {
      this.video.pause();
    }
  }
}

;(function(){
  new PlayOnViewPort("#videoDemo");
})()
