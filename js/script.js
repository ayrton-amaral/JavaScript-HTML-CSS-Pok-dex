// variavel global:
/* 
    document.querySelector para selecionar um elemento HTML com a classe CSS "pokemon_name" 
    e atribuir a referência desse elemento à variável pokemonName.
*/
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonName = document.querySelector('.pokemon_name');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

// JavaScript Arrow Function
// Arrow functions allow us to write shorter function syntax:
const fetchPokemon = async (pokemon) => {
    // o 'await' espera o fetch ser concluido antes de continuar a ler o codigo
    // para funcoes assincronas
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // a URL + a variavel de input como meu Endpoint

    if(APIresponse.status == 200) { 
        // salvar os dados json da API na minha variavel data
        const data = await APIresponse.json();
    
        return data;
    }
    // se não, não faz nada
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Searching...';
    pokemonNumber.innerHTML = '';

    // buscar dados de um pokemon depois de fetch/"buscado"/encontrado e armazenar 
    const data = await fetchPokemon(pokemon) // pokemon como parametro

    // se tiver algo no data, executa o codigo
    if(data) {
        pokemonImage.style.display = 'block';

        pokemonNumber.innerHTML = data.id;
        // se data.name for "Pikachu", então o conteúdo HTML do elemento referenciado por pokemonName será definido como "Pikachu".
        pokemonName.innerHTML = data.name;
    
        // botao para user selecionar as sprites
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        //pokemonImage.src = data['sprites']['versions']['generation-iv']['heartgold-soulsilver']['front_default'];
        //pokemonImage.src = data['sprites']['versions']['generation-vi']['x-y']['front_default'];
    
        input.value = '';

        searchPokemon = data.id;
    }
    else {
        pokemonImage.style.display = 'none';
        pokemonNumber.innerHTML = '';
        pokemonName.innerHTML = 'MissingNo.';
        input.value = '';
    }
}

// quando o formulario for enviado, executar uma funcao
// passando a funcao como parametro
form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);