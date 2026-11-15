import { buscarTiposPokemon } from "../buscarTiposPokemon";

test("retorna os tipos recebidos da API", async () => {
    const simulacaoFetch = jest.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
            types: [
                { type: { name: "electric" } },
            ],
        }),
    } as Response);

    try {
        const tipos = await buscarTiposPokemon(
            "https://pokeapi.co/api/v2/pokemon/25/"
        );

        expect(tipos).toEqual(["electric"]);
    } finally {
        simulacaoFetch.mockRestore();
    }
});