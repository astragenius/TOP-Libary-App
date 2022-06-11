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
            this.update();
        }else {

            window.localStorage.setItem('bookStorage', JSON.stringify(this.storage));
            console.log('localStore is been created')
        }
    }

    this.clearAll = function() {
        window.localStorage.removeItem('bookStorage');
        while(this.storage.length > 0) {

            this.storage.pop();
        }
       
    }

    // New Book object pushed to the localStorage
    this.setToLocalStorage = function(data) {

        this.storage.push(data);
        this.updateStorage();
    }

    this.updateStorage = function() {
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
        let index = this.storage.findIndex(index => index.id === data)
        this.storage.splice(index, 1);
        this.updateStorage();
        this.update();
        
    }

    
    this.edit = function(e) {
        let data = Number(e.parentNode.parentNode.dataset.id);
        let index = this.storage.findIndex(index => index.id === data);
        
        
        this.storage[index].titel = prompt('Please enter new book titel', this.storage[index].titel);
        this.storage[index].author = prompt('Please enter new Author name', this.storage[index].author);
        this.storage[index].page = Number(prompt('Please enter new Page number', this.storage[index].page));
        this.updateStorage();
        this.update();
    }

    this.changeRead =  function(e) {
       
        let data = Number(e.parentNode.parentNode.dataset.id);
        let readStatus = e.textContent;
        let index = this.storage.findIndex(index => index.id === data);
        if(readStatus === 'not Read') {
            
            this.storage[index]['read'] = 'read';
        } else {
            this.storage[index]['read'] = 'not Read';
           
        }
        this.updateStorage();
        this.update();
        
    }

    

}

const libary = new Libary();
window.onload = function() {
    
    
    const create = document.getElementById('create');
    const clear = document.getElementById('clear');
    clear.addEventListener('click', () => {libary.clearAll(); libary.update()})
    create.addEventListener('click', () => {libary.createBook(); libary.update()})
    libary.loadStorage();

}









