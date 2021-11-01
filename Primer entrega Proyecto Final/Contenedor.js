const fs = require('fs');

class Contenedor{
    constructor(file){
        this.file = file;
    };

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.file, "");
        }
        catch(error) {
            console.error("Error:", error);
        }
    };

    async deleteById(id){
        try{
            const contenido = await fs.promises.readFile(this.file, "utf-8");
            const productos = JSON.parse(contenido);
            const productoEnId = productos.filter(element => element.id === parseInt(id));

            if (productoEnId == false){
                return false
            } else {
                const filtroPorId = productos.filter(element => element.id != parseInt(id));
                const productosStrings = JSON.stringify(filtroPorId, null, 2);
                await fs.promises.writeFile(this.file, productosStrings);
                return true
            }
        }
        catch(error) {
            console.error('Error:', error);
        }
    };

    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.file, "utf-8");
            const productos = JSON.parse(contenido);
            return productos;
        } 
        catch(error) {
            console.error('Error:', error);
        }
    };

    async getById(id){
        try{
            const contenido = await fs.promises.readFile(this.file, "utf-8");
            const productos = JSON.parse(contenido);

            if (productos.filter(element => element.id === parseInt(id)) == false){
                return false
            } else {
                return productos.filter(element => element.id === parseInt(id))
            }
        }
        catch (error) {
            console.error('Error:', error);
        };
    };

    async save(object) {
        try {
            let productos = [];
            const contenido = await fs.promises.readFile(this.file, "utf-8");

            if (contenido === '') {
                object.id = 1;
                object.timestamp = Date.now();
                productos.push(object);
            } else {
                const listaDeProducto = JSON.parse(contenido);
                object.id = listaDeProducto[listaDeProducto.length - 1].id + 1;
                object.timestamp = Date.now()
                listaDeProducto.push(object);
                productos = listaDeProducto;
            }

            const productosStrings = JSON.stringify(productos, null, 2);
            await fs.promises.writeFile(this.file, productosStrings);
            return object.id;
        } 
        catch (error) {
            console.error('Error:', error);
        };
    };

    async update(id, producto){
        try{
            const lista = await this.getAll();
            const elementoGuardado = lista.find((item) => item.id === parseInt(id));
            const indiceProductoGuardado = lista.findIndex((item) => item.id === parseInt(id))
            
            if(indiceProductoGuardado === -1){
                return false
            } else {
                const objetoEnId = elementoGuardado.producto
                objetoEnId.push(producto)

                if(objetoEnId[0].id === undefined){
                    objetoEnId[0].id = 1
                    objetoEnId[0].timestamp = Date.now()
                } else {
                    objetoEnId[objetoEnId.length - 1].id = objetoEnId.length
                    objetoEnId[objetoEnId.length - 1].timestamp = Date.now()
                }
    
                const productoActualizado = {
                    "producto": objetoEnId,
                    "id": elementoGuardado.id,
                    "timestamp": elementoGuardado.timestamp
                    }
                
                lista.splice(indiceProductoGuardado, 1, productoActualizado);

                const productosStrings = JSON.stringify(lista, null, 2);
                await fs.promises.writeFile(this.file, productosStrings);

                return productoActualizado;
            }
        }

        catch(error){
            console.error(`¡Error!: ${error}`);
        }
    }

    async replace(id, producto){
        try{
            const lista = await this.getAll();
            const elementoGuardado = lista.find((item) => item.id === parseInt(id));
            const indiceProductoGuardado = lista.findIndex((item) => item.id === parseInt(id))
            
            if(indiceProductoGuardado === -1 || producto == false){
                return false
            } else {
                if(elementoGuardado.producto[0].id === undefined){
                    elementoGuardado.producto[0].id = 1
                    elementoGuardado.producto[0].timestamp = Date.now()
                } else {
                    elementoGuardado.producto[elementoGuardado.producto.length - 1].id = elementoGuardado.producto.length
                    elementoGuardado.producto[elementoGuardado.producto.length - 1].timestamp = Date.now()
                }
    
                const productoActualizado = {
                    "producto": producto,
                    "id": elementoGuardado.id,
                    "timestamp": elementoGuardado.timestamp
                    }
                
                lista.splice(indiceProductoGuardado, 1, productoActualizado);

                const productosStrings = JSON.stringify(lista, null, 2);
                await fs.promises.writeFile(this.file, productosStrings);

                return productoActualizado;
            }
        }

        catch(error){
            console.error(`¡Error!: ${error}`);
        }
    }
};

module.exports = Contenedor;