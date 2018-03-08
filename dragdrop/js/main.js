class DOMHelper {
  static move(el,coords){
    el.style.top = (coords.y - (el.clientHeight / 2)) + "px";
    el.style.left = (coords.x - (el.clientWidth / 2)) + "px";
  }

  static isOver(el,pointerCoords){
   let elCoords = el.getBoundingClientRect();

   if(pointerCoords.x > elCoords.left && pointerCoords.x < (elCoords.left + elCoords.width)){
     if(pointerCoords.y > elCoords.top && pointerCoords.y < (elCoords.top + elCoords.height)){
       return true;
     }
   }

   return false;
 }


  static whereIs(el,pointerCoords){
    let elCoords = el.getBoundingClientRect();

    if(pointerCoords.x > elCoords.left && pointerCoords.x < (elCoords.left + elCoords.width)){
      if(pointerCoords.y > elCoords.top && pointerCoords.y < (elCoords.top + elCoords.height)){
        if(pointerCoords.y > elCoords.top + (elCoords.height / 2)) return 1;
        return 2;

      }
    }
    return -1;
  }
}

class DragList {
  constructor(selectorList, selectorItems="li") {
    this.list = document.querySelector(selectorList);
    this.items = this.list.querySelectorAll(selectorItems);
    this.finalPosition = -1; //Para saber si fue por arriba o por debajo
    this.finalElementHover = null;
    this.canvas = document.createElement("canvas");
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);

    this.buildFakeItem();
    this.bindEvents();
  }

  buildFakeItem(){
    this.fakeElement = document.createElement("div");
    this.fakeElement.style.background = "#eee";
    this.fakeElement.classList.add("card");
    // this.list.appendChild(this.fakeElement);
  }
  bindEvents(){
    this.items.forEach(item=>{
      item.addEventListener("dragstart", this.handleDragStart);
      item.addEventListener("drag", this.handleDrag);
      item.addEventListener("dragend", this.handleDragEnd);
    })
  }

  handleDragStart(ev){
    let el = ev.currentTarget;
    el.style.top = "";
    el.style.left = "";
    ev.dataTransfer.setDragImage(this.canvas, 1, 0);
    el.classList.add("fixed");
  }

  handleDrag(ev){
    let pointerCoords = {x:ev.clientX, y:ev.clientY};
    DOMHelper.move(ev.currentTarget, pointerCoords);
    if(DOMHelper.isOver(this.list, pointerCoords)){
      this.items.forEach(item=> this.compareElement(item, ev));
    }
    else {
      this.fakeElement.remove()
    }
  }

  compareElement(item, ev){
    let pointerCoords = {x:ev.clientX, y:ev.clientY};

    if(ev.currentTarget == item) return;
    let result = DOMHelper.whereIs(item, pointerCoords);

    if(result == -1) return;

    this.finalPosition = result;
    this.finalElementHover = item;

    if(result == 1)
      this.list.insertBefore(this.fakeElement, item.nextSibling)
    if(result == 2)
      this.list.insertBefore(this.fakeElement, item)
  }

  handleDragEnd(ev){
    // console.log(this.finalPosition);
    // console.log(this.finalElementHover);
    let el = ev.currentTarget;
    el.style.top = "";
    el.style.left = "";
    el.classList.remove("fixed")

    if(this.finalPosition == 1)
      this.list.insertBefore(el,this.finalElementHover.nextSibling);
    if(this.finalPosition == 2)
      this.list.insertBefore(el,this.finalElementHover);
  }

}
;(function(){
   new DragList("ul", "li");
})()
