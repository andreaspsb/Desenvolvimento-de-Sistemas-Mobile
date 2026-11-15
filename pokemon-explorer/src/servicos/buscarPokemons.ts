type PokemonDaApi = {
    name: string;
    url: string;
};

type PaginaDePokemons = {
    results: PokemonDaApi[];
    next: string | null;
};

export async function buscarPokemons(): Promise<PokemonDaApi[]> {
    const pokemons: PokemonDaApi[] = [];

    let proximaPagina: string | null = "https://pokeapi.co/api/v2/pokemon?limit=100";

    while (proximaPagina) {
        const resposta: Response = await fetch(proximaPagina);

        if (!resposta.ok) {
            throw new Error("Não foi possível buscar os Pokémon.");
        }

        const dados: PaginaDePokemons = await resposta.json();
        pokemons.push(...dados.results);
        proximaPagina = dados.next ?? null;
    }

    return pokemons;
}