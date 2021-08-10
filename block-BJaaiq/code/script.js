let root = document.querySelector("ul");

max = 5;
index =0;




function addQuotes(){
for (let i =0; i< max ; i++ ){
  let li = document.createElement("li");
  let blockquote = document.createElement("blockquote");
  let cite = document.createElement("cite");
 
  

  blockquote.innerText = quotes[index].quoteText;
  cite.innerText = quotes[index].quoteAuthor;

  li.append(blockquote, cite);

  root.append(li);

  index++;
 }
}

addQuotes();


document.addEventListener('scroll', () => {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight >= (scrollHeight- 1) && index < quotes.length){
        addQuotes();
        console.log(scrollTop);
    }
})

