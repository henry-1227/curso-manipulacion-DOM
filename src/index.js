/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.querySelector('#app');
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: "currency",
        currency: "USD",
    }).format(price)
    return newPrice;
}

//web api
//Conectamos al servidor
window
    .fetch(`${baseUrl}/api/avo`)
//procesar la respuesta y conventirla en JSON
    .then((respuesta) => respuesta.json())
//JSON -> Data ->Renderizar info browser
    .then((responseJson) => {
        const todosLosItems = [];
        responseJson.data.forEach(item => {
            //Crear imagen
            const imagen = document.createElement('img');
            imagen.src = `${baseUrl}${item.image}`;
            imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
            //Crear titulo
            const title = document.createElement('h2');
            title.textContent = item.name;
            title.className = "text-lg"

            //Crear precio
            const price = document.createElement('div');
            price.className = "text-gray-600"
            price.textContent = formatPrice(item.price);

            // Creamos un contenedor el título y el precio
            const priceAndTitle = document.createElement("div")
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price);

            // Metemos todo dentro de una tarjeta contenedora
            const card = document.createElement("div");
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
            card.append(imagen, priceAndTitle);

            //Metemos todo dentro del contenedor principal
            const container = document.createElement('div');
            container.className = "cardContainer";
            container.append(card);

            todosLosItems.push(container);
        });
        appNode.append(...todosLosItems);
    })
