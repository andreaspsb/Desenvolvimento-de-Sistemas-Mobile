type Pokemon = {
    name: string;
    url?: string;
};

export function filtrarPokemon<T extends Pokemon>(pokemons: T[], busca: string): T[] {
    const buscaNormalizada = busca.trim().toLowerCase();
    const buscaNumerica = buscaNormalizada.replace(/^#/, "");

    return pokemons.filter((pokemon) => {
        const nomeCorresponde = pokemon.name.toLowerCase().includes(buscaNormalizada);

        const numero = pokemon.url?.match(/\/(\d+)\/?$/)?.[1];
        const numeroCorresponde = numero !== undefined &&
            /^\d+$/.test(buscaNumerica) &&
            Number(numero) === Number(buscaNumerica);

        return nomeCorresponde || numeroCorresponde;
    });
}