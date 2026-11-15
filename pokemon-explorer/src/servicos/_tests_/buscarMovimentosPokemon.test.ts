import { buscarMovimentosPokemon } from "../buscarMovimentosPokemon";

test("retorna os movimentos recebidos da API", async () => {
    const simulacaoFetch = jest.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
            moves: [
                {
                    move: {
                        name: "thunder-shock",
                        url: "https://pokeapi.co/api/v2/move/84/",
                    },
                },
            ],
        }),
    } as Response);

    try {
        const movimentos = await buscarMovimentosPokemon(
            "https://pokeapi.co/api/v2/pokemon/25/"
        );

        expect(movimentos).toEqual([
            {
                name: "thunder-shock",
                url: "https://pokeapi.co/api/v2/move/84/",
            },
        ]);
    } finally {
        simulacaoFetch.mockRestore();
    }
});