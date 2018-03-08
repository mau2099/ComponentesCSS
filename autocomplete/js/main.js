class Search{
  static get(url){
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.send();

    return new Promise((resolve, reject) =>{
      xhr.onreadystatechange = ()=>{
          if(xhr.readyState == 4){
            if(xhr.status == 200)
              return resolve(JSON.parse(xhr.responseText));
            return reject(xhr.status);
          }
      }
    });
  }
}
class AutoComplete {
  constructor(selectorInput, url) {
    this.search = this.search.bind(this);
    this.input = document.querySelector(selectorInput);
    this.url = url;
    this.value = "";
    this.interval = null;
    this.buildDatalist();
    this.bindEvents();
  }

  bindEvents(){
    this.input.addEventListener("keyup", ()=>{
      if(!(this.input.value != "" && this.input.value != this.value && this.input.value.length > 2)) return;
      if(this.interval) window.clearInterval(this.interval);
      this.value = this.input.value;
      this.interval = window.setTimeout(this.search, 500);
    });
  }

  buildDatalist(){
    this.datalist = document.createElement("datalist");
    this.datalist.id = "datalist-" + new Date().getTime();
    document.querySelector("body").appendChild(this.datalist);
    this.input.setAttribute("list", this.datalist.id);
  }

  search(){
    Search.get(this.url+this.value).then(data=>this.build(data));
  }

  build(response){
    response.items.forEach(item=>{
      let optionEl = document.createElement("option");
      optionEl.value = item.volumeInfo.title;
      optionEl.title = item.volumeInfo.description;
      this.datalist.appendChild(optionEl);
    });
  }
}

;(function(){
  const googleBooksApi = "https://www.googleapis.com/books/v1/volumes?q="
  // Search.get(googleBooksApi+"harry").then(data=>{console.log(data);})
  let autocomplete = new AutoComplete("#input-books", googleBooksApi);
  // autocomplete.search();
})()
