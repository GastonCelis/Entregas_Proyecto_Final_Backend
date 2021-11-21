const allProducts = () => {
    fetch("http://localhost:8080/api/productos")
    .then(response => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch(error => console.log(error))
}

allProducts()