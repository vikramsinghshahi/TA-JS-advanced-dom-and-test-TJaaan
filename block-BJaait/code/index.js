let add = document.querySelector(".add");

function dragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  };

function addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', dragStart, false);
    // el.addEventListener('dragenter', dragEnter, false);
    // el.addEventListener('dragover', dragOver, false);
    // el.addEventListener('dragleave', dragLeave, false);
    // el.addEventListener('drop', dragDrop, false);
    // el.addEventListener('dragend', dragEnd, false);
  }

function addNewItem(){

    let newItem = document.querySelector(".input").value;
    
   if(newItem !== ""){
    document.querySelector(".input").value = "";
    let ul = document.querySelector("ul");

    let li = document.createElement("li");
    let  attr = document.createAttribute('draggable');
    li.className = 'draggable';
    attr.value = 'true';
    li.setAttributeNode(attr);

    li.innerText = newItem;

    ul.append(li);

    addEventsDragAndDrop(li);
   }

   
}

add.addEventListener("click" ,addNewItem);