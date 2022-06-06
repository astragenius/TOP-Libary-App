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
        
        const titel = document.getElementById('bookTitel').value.trim();
        const author = document.getElementById('bookAuthor').value.trim();
        const page = document.getElementById('bookPages').value;
        const checkbox = document.getElementById('readStatus').value;
        
        this.storage.push(new Book(titel, author, page, checkbox));
        console.log(this.storage);
        
    }

    this.update = function() {

      const bookList = document.getElementById('bookList');   
      let data = "";

      for(let i = 0; i < this.storage.length; i++) {



            data += `<tr data-id=${this.storage[i].id} class="libary__book">`;
            data += `<td>${this.storage[i].titel}</td>`;
            data += `<td>${this.storage[i].author}</td>`;
            data += `<td>${this.storage[i].page}</td>`;
            data += `<td><button class="btn btn--status" onClick="libary.changeRead(this)">${this.storage[i].read}</button></td>`;
            data += `<td class="libary__btn"><button onClick="libary.edit(this)" class="btn btn--edit">Edit</button></td>`;
            data += `<td class="libary__btn"><button onClick="libary.delete(this)" class="btn btn--delete">Delete</button></td>`;
            data += `</tr>`;       
            
      }

      bookList.innerHTML = data;
      
    }

    this.delete = function(e) {
        let data = Number(e.parentNode.parentNode.dataset.id);
        console.log(data)
        let index = this.storage.findIndex(index => index.id === data)
        this.storage.splice(index, 1);
        this.update();
        
    }

    
    this.edit = function(e) {
        let data = Number(e.parentNode.parentNode.dataset.id);
        let index = this.storage.findIndex(index => index.id === data);
        
        
        this.storage[index].titel = prompt('Bitte geben sie einen neuen titel ein');
        this.update();
    }

    this.changeRead =  function(e) {
       
        let data = Number(e.parentNode.parentNode.dataset.id);
        let readStatus = e.textContent;
        console.log(e.textContent)
        let index = this.storage.findIndex(index => index.id === data);
        if(readStatus === 'not Read') {
            
            this.storage[index]['read'] = 'read';
        } else {
            this.storage[index]['read'] = 'not Read';
           
        }

        this.update();
        
    }

    

}

const libary = new Libary();
const create = document.getElementById('create');

create.addEventListener('click', () => {libary.createBook(); libary.update()})
