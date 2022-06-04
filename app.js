function Book(titel, author, page, read) {
    this.titel = titel
    this.author = author
    this.page = page
    this.read = read

    this.id = Math.floor(Math.random() * 100)


}

Book.prototype = {
    
    setRead: function() {
        
        this.read = true;
    },
    
    setNoRead: function() {
        this.read = false;
    },
    
    Edit: function() {
        this.titel = prompt('Geben sie einen Neuen titel an: ');
    }

}




function Libary() {
    
    this.storage = [];
    
    
    this.createBook = function() {
        
        const titel = document.getElementById('titel').value.trim();
        const author = document.getElementById('author').value.trim();
        const page = document.getElementById('pageNumber').value;
        const checkbox = document.getElementById('read').checked;
        
        this.storage.push(new Book(titel, author, page, checkbox));
        console.log(this.storage)
        
    }

    this.update = function() {

      const bookList = document.getElementById('bookList');   
      let data = "";

      for(let i = 0; i < this.storage.length; i++) {

            data += `<li data-id = ${this.storage[i].id}>`;
            data += `${this.storage[i].titel}`;
            data += `<button onclick="libary.delete(this)"> DELETE</button>`
            data += '</li>'; 
            
      }

      bookList.innerHTML = data;
      
    }

    this.delete = function(e) {
        console.log(e.previousSibling.data);
        let data = e.previousSibling.data;
        let index = this.storage.findIndex(index => index.titel === data)
        this.storage.splice(index, 1);
        console.log(index)
        this.update();
        
    }

    

}

const libary = new Libary();
const create = document.getElementById('create');

create.addEventListener('click', () => {libary.createBook(); libary.update()})

