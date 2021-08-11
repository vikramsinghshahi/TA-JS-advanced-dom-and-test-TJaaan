let form = document.querySelector("form");

let ul = document.querySelector("ul");

let cardsData = JSON.parse(localStorage.getItem("cards")) || [];





function handleEdit(event , info ,id, label){
    let elm = event.target;
    let input = document.createElement("input");
    input.value = info;

    input.addEventListener("keyup", (e)=>{
          if( e.keyCode === 13){
            let updateValue = e.target.value;
            cardsData[id][label] = updateValue;
            localStorage.setItem("cards", JSON.stringify(cardsData));
            createUI()
          }
          
    })

    input.addEventListener("blur", (e)=>{
        
          let updateValue = e.target.value;
          cardsData[id][label] = updateValue;
          localStorage.setItem("cards", JSON.stringify(cardsData));
          createUI()
        
  })

    let parent = event.target.parentElement;

    parent.replaceChild(input, elm);

    console.log(parent);
}


function handleSubmit(event){
    event.preventDefault();
    
   let title = event.target.elements.title.value;
   let category = event.target.elements.category.value;

   cardsData.push({title, category});
   localStorage.setItem("cards", JSON.stringify(cardsData));

   createUI(cardsData , ul);


}

form.addEventListener("submit", handleSubmit)


function createUI(data= cardsData, root = ul){
    root.innerHTML ="";

    let fragment = new DocumentFragment()
    data.forEach((cardInfo , index) =>{
        let li = document.createElement("li");

        let p = document.createElement("p");
        p.addEventListener("dblclick", (event)=>{
            handleEdit(event , cardInfo.title, index, "title")
        });


        let h2 = document.createElement("h2");

        h2.addEventListener("dblclick", (event)=>{
            handleEdit(event , cardInfo.category, index ,"category")
        });


        p.innerText = cardInfo.title;

        h2.innerText = cardInfo.category;

        li.append(p, h2);

        console.log(li);

        fragment.appendChild(li);
    

    })

    root.append(fragment);


}

createUI(cardsData ,ul);