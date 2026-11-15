import { filtrarPokemon } from "../filtrarPokemon";

test("retorna os Pokémon cujo nome corresponde à busca", () => {
    const pokemons = [
        { name: "pikachu" },
        { name: "charmander" },
    ];

    const resultado = filtrarPokemon(pokemons, "pik");

    expect(resultado).toEqual([{ name: "pikachu" }]);
});

test("encontra Pokémon sem diferenciar maiúsculas de minúsculas", () => {
    const pokemons = [{ name: "pikachu" }];

    const resultado = filtrarPokemon(pokemons, "PIK");

    expect(resultado).toEqual([{ name: "pikachu" }]);
});

test("ignora espaços no início e no fim da busca", () => {
    const pokemons = [{ name: "pikachu" }];

    const resultado = filtrarPokemon(pokemons, " pik ");

    expect(resultado).toEqual([{ name: "pikachu" }]);
});

test("encontra um Pokémon pelo número", () => {
    const pokemons = [
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
        { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    ];

    const resultado = filtrarPokemon(pokemons, "25");

    expect(resultado).toEqual([
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ]);
});

test("encontra um Pokémon pelo número com zeros à esquerda", () => {
    const pokemons = [
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ];

    const resultado = filtrarPokemon(pokemons, "025");

    expect(resultado).toEqual([
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ]);
});

test("encontra um Pokémon pelo número com cerquilha", () => {
    const pokemons = [
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ];

    const resultado = filtrarPokemon(pokemons, "#025");

    expect(resultado).toEqual([
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ]);
});