class ContainerMemory{
    constructor(products){
        this.products = products
    }

    create(item){
        this.products.push({
            id: item.id, 
            timestamp: item.timestamp, 
            name: item.name,
            description: item.description,
            code: item.code,
            price: item.price,
            stock: item.stock,
            photo: item.photo
        })
    }
    
    readAll(){
        return this.products
    }
    
    readById(id){
        return this.products.filter(product => product.id === id)
    }
    
    update(id, item){
        const product = this.products.filter(product => product.id === id)
        product.push(item)
    }
    
    deleteAll(){
        this.products = []
    }

    deleteById(id){
        this.products.map(product => {if(product.id === id){
            product = []
        }})
    }
}

module.exports = ContainerMemory