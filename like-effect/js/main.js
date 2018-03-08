const likeHeart =  `
                    <svg width="5em" height="5em" viewBox="0 0 280 280"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">

                    <defs>
                    <style type="text/css"><![CDATA[
                    .heart {fill:red;stroke:black;stroke-width:0.5px;}
                    .vline {stroke:red;}

                    .show {display:initial;}
                    .hide {display:none;}

                    .h1 {display:initial;}
                    .h2 {display:none;}
                    ]]>
                    </style>

                    <symbol id="Heart" viewBox="0 0 280 270">
                    <path d="M140,58L140,267" class="vline" />
                    <path d="M140,58c30,-60,110,-60,130,0c30,100,-110,150,-130,210M140,58c-30,-60,-110,-60,-130,0c-30,100,110,150,130,210" />
                    </symbol>
                    </defs>

                    <g transform="translate(0,0) scale(1)" class="heart">
                    <g class="h1">
                    <animate attributeName="class" values="show;hide;" dur="1s" repeatCount="indefinite" />
                    <use x="0" y="0" width="280" height="270" xlink:href="#Heart" />
                    </g>
                    <g class="h2" >
                    <animate attributeName="class" values="hide;show;" dur="1s" repeatCount="indefinite" />
                    <use x="0" y="0" width="280" height="270" xlink:href="#Heart" />
                    </g>
                    </g>
                    </svg>
                    `

const likeHeart2 =  `
                    <svg width="70" height="60" viewBox="0 0 70 60" class="heart"> <path d="M0 10 L10 10 L10 0 L30 0 L30 10 L40 10 L40 0 L60 0 L60 10 L70 10 L70 30 L60 30 L60 40 L50 40 L50 50 L40 50 L40 60 L30 60 L30 50 L20 50 L20 40 L10 40 L10 30 L0 30 Z" fill="#EC613C" fill-rule="evenodd" /> </svg>
                    `
class LikeMe {
  constructor(selector) {
    this.el = document.querySelector(selector);
    this.el.style.position = "relative";
    this.bindEvents();
  }

  bindEvents(){
    this.el.addEventListener("dblclick", (ev)=> {
      this.buildHeart();
      this.el.innerHTML = "";
      this.el.appendChild(this.heart);
    });
  }

  buildHeart(){
    this.heart = document.createElement("div");
    this.heart.style.position = "absolute";
    // this.heart.style.backgroundColor = "black";
    this.heart.style.top = "40%"
    this.heart.style.left = "40%"
    this.heart.innerHTML = likeHeart2;
  }
}
;(function(){
  new LikeMe(".card");
})()
