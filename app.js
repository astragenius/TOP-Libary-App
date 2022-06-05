function Book(titel, author, page, read) {
    this.titel = titel
    this.author = author
    this.page = page
    this.read = read

    this.id = Math.floor(Math.random() * 1000)


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
            if(this.storage[i].read === true) {

                data += `<input type="checkbox" checked onChange="libary.changeRead(this)">`
            }else {
                data += `<input type="checkbox" onClick="libary.changeRead(this)">`
            }
            data += `<button onclick="libary.edit(this)">EDIT</button>` 
            data += `<button onclick="libary.delete(this)"> DELETE</button>`
            data += '</li>'; 
            
      }

      bookList.innerHTML = data;
      
    }

    this.delete = function(e) {
        let data = Number(e.parentNode.dataset.id);
        let index = this.storage.findIndex(index => index.id === data)
        this.storage.splice(index, 1);
        this.update();
        
    }

    
    this.edit = function(e) {
        let data = Number(e.parentNode.dataset.id);
        let index = this.storage.findIndex(index => index.id === data);
        this.storage[index].titel = prompt('Bitte geben sie einen neuen titel ein');
        this.update();
    }

    this.changeRead =  function(e) {
       
        let data = Number(e.parentNode.dataset.id);
        let readStatus = e.checked;
        
        let index = this.storage.findIndex(index => index.id === data);
        if(readStatus === false) {
            
            this.storage[index]['read'] = false;
        } else {
            this.storage[index]['read'] = true;
           
        }
        
    }

    

}

const libary = new Libary();
const create = document.getElementById('create');

create.addEventListener('click', () => {libary.createBook(); libary.update()})
