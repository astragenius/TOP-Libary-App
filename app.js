function Book(titel, author, page, read) {
    this.titel = titel
    this.author = author
    this.page = page
    this.read = read

    this.id = Math.floor(Math.random() * 1000)


}




function Libary() {
    
    this.storage = [];

    this.loadStorage = function() {

        if(window.localStorage.length > 0) {

            this.storage = JSON.parse(window.localStorage.getItem('bookStorage'));
            console.log('LocalStorage exist')
            console.log(this.storage)
            this.update();
        }else {

            window.localStorage.setItem('bookStorage', JSON.stringify(this.storage));
            console.log('localStore is been created')
        }
    }

    this.setToLocalStorage = function(data) {

        this.storage.push(data);
        console.log(this.storage);
        window.localStorage.setItem('bookStorage', JSON.stringify(this.storage));
    }

    this.removeFromLocalStorage = function() {
        window.localStorage.setItem('bookStorage', JSON.stringify(this.storage))
    }
    
    
    this.createBook = function() {
        
        const titel = document.getElementById('bookTitel').value.trim();
        const author = document.getElementById('bookAuthor').value.trim();
        const page = document.getElementById('bookPages').value;
        const checkbox = document.getElementById('readStatus').value;
        let book = new Book(titel, author, page, checkbox);
        this.setToLocalStorage(book);

        
        
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
        this.removeFromLocalStorage();
        this.update();
        
    }

    
    this.edit = function(e) {
        let data = Number(e.parentNode.parentNode.dataset.id);
        let index = this.storage.findIndex(index => index.id === data);
        
        
        this.storage[index].titel = prompt('Please enter new book titel', this.storage[index].titel);
        this.storage[index].author = prompt('Please enter new Author name', this.storage[index].author);
        this.storage[index].page = Number(prompt('Please enter new Page number', this.storage[index].page));
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
libary.loadStorage();

