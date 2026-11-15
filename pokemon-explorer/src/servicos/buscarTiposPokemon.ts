type DadosTiposPokemon = {
    types: {
        type: {
            name: string;
        };
    }[];
};

export async function buscarTiposPokemon(url: string): Promise<string[]> {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error("Não foi possível buscar os tipos do Pokémon.");
    }

    const dados: DadosTiposPokemon = await resposta.json();

    return dados.types.map((item) => item.type.name);
}