function Book(titel, author, page, read) {
    this.titel = titel
    this.author = author
    this.page = page
    this.read = read


    this.setRead = function() {
        
        this.read = true;
    }

    this.setNoRead = function() {
        this.read = false;
    }

    this.Edit = function() {
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
        
    }

    this.update = function() {

      const bookList = document.getElementById('bookList');   
      let data = "";

      for(let i = 0; i < this.storage.length; i++) {

            data += '<li>';
            data += `Der Titel des Buches ist ${this.storage[i].titel}`;
            data += '</li>'; 
            
      }

      bookList.innerHTML = data;
      
    }

}

const libary = new Libary();
const create = document.getElementById('create');

create.addEventListener('click', () => {libary.createBook(); libary.update()})

