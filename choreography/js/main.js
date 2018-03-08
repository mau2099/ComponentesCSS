class Dim {
  static getWidth(el){
    let style = el.currentStyle = window.getComputedStyle(el);
    return el.offsetWidth + parseFloat(style.marginRight) + parseFloat(style.marginLeft)
  }
}

class Choreography {
  constructor(selectorContainer, selector) {
    this.container = document.querySelector(selectorContainer);
    this.elements = this.container.querySelectorAll(selector);
    this.elements.forEach(el => el.style.opacity = 0)
    this.setDelay();
  }

  setDelay(){
    // let itemsPerRow = Math.floor(this.container.clientWidth / this.elements[0].clientWidth)
    let itemWidth = Dim.getWidth(this.elements[0]);
    let itemsPerRow = Math.floor(this.container.clientWidth / itemWidth);
    // console.log(itemsPerRow);
    for (var i = 0; i < this.elements.length; i+= itemsPerRow) {
      for (var j = i; j < (i + itemsPerRow); j++) {
        let index = i+(j-i);
        let yPosition = j-i;
        let xPosition = parseInt(i / itemsPerRow);
        let positionSum = xPosition + yPosition;
        // this.elements[index].innerHTML = "["+ xPosition + "," + yPosition+"]";
        this.elements[index].style.animationDelay = (positionSum * 50) + "ms";
      }
    }
    // console.log("ingresa clase zoomIn");
    this.elements.forEach(el => el.classList.add("zoomIn"))
  }
}
;(function(){
  new Choreography(".container", ".card")
})()
