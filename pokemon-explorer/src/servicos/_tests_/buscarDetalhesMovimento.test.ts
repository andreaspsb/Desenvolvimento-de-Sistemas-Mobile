import { buscarDetalhesMovimento } from "../buscarDetalhesMovimento";

test("retorna os dados e o efeito do movimento", async () => {
    const simulacaoFetch = jest.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
            power: 40,
            accuracy: 100,
            pp: 30,
            type: { name: "electric" },
            effect_entries: [
                {
                    short_effect: "May paralyze the target.",
                    language: { name: "en" },
                },
            ],
        }),
    } as Response);

    try {
        const detalhes = await buscarDetalhesMovimento(
            "https://pokeapi.co/api/v2/move/84/"
        );

        expect(detalhes).toEqual({
            potencia: 40,
            precisao: 100,
            pp: 30,
            tipo: "electric",
            efeito: "May paralyze the target.",
        });
    } finally {
        simulacaoFetch.mockRestore();
    }
});

test("preenche a chance na descrição do efeito", async () => {
    const simulacaoFetch = jest.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
            power: 40,
            accuracy: 100,
            pp: 30,
            type: { name: "electric" },
            effect_chance: 10,
            effect_entries: [
                {
                    short_effect: "Has a $effect_chance% chance to paralyze.",
                    language: { name: "en" },
                },
            ],
        }),
    } as Response);

    try {
        const detalhes = await buscarDetalhesMovimento(
            "https://pokeapi.co/api/v2/move/84/"
        );

        expect(detalhes.efeito).toBe("Has a 10% chance to paralyze.");
    } finally {
        simulacaoFetch.mockRestore();
    }
});

test("retorna o nome oficial do movimento em inglês", async () => {
    const simulacaoFetch = jest.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
            power: 40,
            accuracy: 100,
            pp: 30,
            type: { name: "electric" },
            effect_entries: [],
            names: [
                {
                    name: "Thunder Shock",
                    language: { name: "en" },
                },
            ],
        }),
    } as Response);

    try {
        const detalhes = await buscarDetalhesMovimento(
            "https://pokeapi.co/api/v2/move/84/"
        );

        expect(detalhes.nomeOficial).toBe("Thunder Shock");
    } finally {
        simulacaoFetch.mockRestore();
    }
});

test("usa uma descrição alternativa quando não há efeito", async () => {
    const simulacaoFetch = jest.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
            power: null,
            accuracy: null,
            pp: 20,
            type: { name: "normal" },
            effect_entries: [],
            flavor_text_entries: [
                {
                    flavor_text: "A move description.",
                    language: { name: "en" },
                },
            ],
        }),
    } as Response);

    try {
        const detalhes = await buscarDetalhesMovimento(
            "https://pokeapi.co/api/v2/move/1/"
        );

        expect(detalhes.efeito).toBe("A move description.");
    } finally {
        simulacaoFetch.mockRestore();
    }
});