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

        this.storage.push(new Book('ES', 'Stephen King', 894, true));
        this.storage.push(new Book('Der Anschlag', 'Stephen King', 894, true));
        this.storage.push(new Book('Harry Potter', 'Rowling', 894, true));
    }

    this.update = function() {

       this.storage.forEach(el => {
           console.log(el.titel, el.author)
           
       })
    }

}

const libary = new Libary();
libary.createBook();
console.log(libary.storage)
libary.update();



