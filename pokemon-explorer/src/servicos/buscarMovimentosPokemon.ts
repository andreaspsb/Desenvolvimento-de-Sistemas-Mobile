type Movimento = {
    name: string;
    url: string;
};

type DadosPokemon = {
    moves: {
        move: Movimento;
    }[];
};

export async function buscarMovimentosPokemon(
    url: string
): Promise<Movimento[]> {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error("Não foi possível buscar os movimentos do Pokémon.");
    }

    const dados: DadosPokemon = await resposta.json();

    return dados.moves.map((item) => item.move);
}