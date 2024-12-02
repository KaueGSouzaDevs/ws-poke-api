document.addEventListener('DOMContentLoaded', function() {

    const container = document.querySelector('.card-content');
    const spritesContainer = document.querySelector('.card-images');

    document.getElementById('searchButton').addEventListener('click', function() {
        document.querySelector('.additional-card').classList.add('hidden');
        

        container.innerHTML = '';
        spritesContainer.innerHTML = '';

        if (document.getElementById('searchInput').value) {

            fetch(`https://pokeapi.co/api/v2/pokemon/${document.getElementById('searchInput').value.toLowerCase()}`)
            .then(response => {
                if (!response.ok) {
                    document.querySelector('.additional-card').classList.remove('hidden');
                    container.innerHTML = `
                    <h5 class="text-center">
                        Pokemon não encontrado
                    </h5>
                    `;
                    throw new Error('Pokemon não encontrado');
                };
                return response.json();
            })
            .then(data => {
                document.querySelector('.additional-card').classList.remove('hidden');
                container.innerHTML = `
                <div class="card-image">
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                </div>

                <div class="card-info">
                    <h3>${data.name.toUpperCase()}</h3>
                    <p>Altura: ${data.height}</p>
                    <p>Peso: ${data.weight}</p>
                </div>
                `

                const spritesUrls = [
                    data.sprites.front_default,
                    data.sprites.back_default,
                    data.sprites.front_shiny,
                    data.sprites.back_shiny
                ];
    
                spritesUrls.forEach(url => {
                    const imgElement = document.createElement('img');
                    imgElement.src = url;
                    spritesContainer.appendChild(imgElement);
                });
            });
        };
    });


});