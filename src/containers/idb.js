import idb from 'idb'

export default class IDB {
    constructor(props) {
        this.state = {}

        this.dbPromise = idb.open('myDB', 1, updateDB => {
            const co = updateDB.createObjectStore('book-pages', {
                keyPath: 'id',
                autoIncrement: false
            })
            const co1 = updateDB.createObjectStore('books-info', {
                keyPath: 'id',
                autoIncrement: false
            })
            co.createIndex('content', 'content', { unique: false })
            co.createIndex('encrypted', 'encrypted', { unique: false })

            co1.createIndex('cover', 'cover', { unique: false })
            co1.createIndex('author', 'author', { unique: false })
            co1.createIndex('name', 'name', { unique: false })
            co1.createIndex('page_count', 'page_count', { unique: false})
            co1.createIndex('last_opened_page', 'last_opened_page', { unique: false })
            co1.createIndex('last_opened_page_id', 'last_opened_page_id', { unique: false })
            // store.map((item, index) => co.add(itemf))
            // return co
        })

        this.get = this.get.bind(this)
        this.add = this.add.bind(this)
        this.put = this.put.bind(this)
        this.delete = this.delete.bind(this)
        this.clear = this.clear.bind(this)
        this.getAll = this.getAll.bind(this)
    }

    get(key, table) {
        return this.dbPromise
          .then(db =>
                db
                .transaction(table)
                // .objectStore("tabs").index("email").get(key)).then(val =>  this.setState({ name: val.name}));
                .objectStore(table).get(key)
            )
          .then(val => {
              return val
        })
    }

    add(val, table) {
        return this.dbPromise.then(db => {
          const tx = db.transaction(table, 'readwrite')
          tx.objectStore(table).add(val)
          tx.objectStore(table).getAll()
          // .then(val => this.setState({data: val}));
          return tx.complete
        })
    }

    put(val) {
        return this.dbPromise.then(db => {
          const tx = db.transaction('book-pages', 'readwrite')
          tx.objectStore('book-pages').put(val)
          tx.objectStore('book-pages').getAll()
          // .then(val => this.setState({data: val}));
          return tx.complete
        })
    }

    delete(key) {
        return this.dbPromise.then(db => {
          const tx = db.transaction('book-pages', 'readwrite')
          tx.objectStore('book-pages').delete(key)
          tx.objectStore('book-pages').getAll()
            
          return tx.complete
        })
    }
    
    clear() {
        return this.dbPromise.then(db => {
            const tx = db.transaction('book-pages', 'readwrite')
            tx.objectStore('book-pages').clear()
            return tx.complete
        })
    }
    
    getAll() {
        return this.dbPromise.then(db => {
            return db
            .transaction('book-pages')
            .objectStore('book-pages')
            .getAll()
        })
        // .then(val => this.setState({ data: val }));
    }

}