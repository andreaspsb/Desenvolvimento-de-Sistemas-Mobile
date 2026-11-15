import { buscarPokemons } from "../buscarPokemons";

test("retorna os Pokémon recebidos da API", async () => {
    const respostaDaApi = {
        results: [
            { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
        ],
    };

    const simulacaoFetch = jest.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => respostaDaApi,
    } as Response);

    try {
        const resultado = await buscarPokemons();

        expect(resultado).toEqual(respostaDaApi.results);
    } finally {
        simulacaoFetch.mockRestore();
    }
});

test("informa erro quando a API não responde com sucesso", async () => {
    const simulacaoFetch = jest.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: false,
    } as Response);

    try {
        await expect(buscarPokemons()).rejects.toThrow(
            "Não foi possível buscar os Pokémon."
        );
    } finally {
        simulacaoFetch.mockRestore();
    }
});

test("reúne os Pokémon de duas páginas da API", async () => {
    const primeiraPagina = {
        results: [{ name: "bulbasaur", url: "url-do-bulbasaur" }],
        next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    };

    const segundaPagina = {
        results: [{ name: "pikachu", url: "url-do-pikachu" }],
        next: null,
    };

    const simulacaoFetch = jest
        .spyOn(globalThis, "fetch")
        .mockResolvedValueOnce({
            ok: true,
            json: async () => primeiraPagina,
        } as Response)
        .mockResolvedValueOnce({
            ok: true,
            json: async () => segundaPagina,
        } as Response);

    try {
        const resultado = await buscarPokemons();

        expect(resultado).toEqual([
            { name: "bulbasaur", url: "url-do-bulbasaur" },
            { name: "pikachu", url: "url-do-pikachu" },
        ]);
    } finally {
        simulacaoFetch.mockRestore();
    }
});

test("solicita 100 Pokémon na primeira página", async () => {
    const simulacaoFetch = jest.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({ results: [], next: null }),
    } as Response);

    try {
        await buscarPokemons();

        expect(simulacaoFetch).toHaveBeenCalledWith(
            "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
    } finally {
        simulacaoFetch.mockRestore();
    }
});