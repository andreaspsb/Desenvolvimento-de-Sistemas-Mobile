type DadosMovimento = {
    power: number | null;
    accuracy: number | null;
    pp: number | null;
    type: {
        name: string;
    };
    effect_entries: {
        short_effect: string;
        language: {
            name: string;
        };
    }[];
    effect_chance?: number | null;
    names?: {
        name: string;
        language: {
            name: string;
        };
    }[];
    flavor_text_entries?: {
        flavor_text: string;
        language: {
            name: string;
        };
    }[];
};

export async function buscarDetalhesMovimento(url: string) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error("Não foi possível buscar os detalhes do movimento.");
    }

    const dados: DadosMovimento = await resposta.json();

    const efeitoEmIngles = dados.effect_entries.find(
        (entrada) => entrada.language.name === "en"
    );

    const descricaoAlternativa = dados.flavor_text_entries?.find(
        (entrada) => entrada.language.name === "en"
    );

    const efeito =
        efeitoEmIngles?.short_effect ?? 
        descricaoAlternativa?.flavor_text.replace(/\s+/g, " ").trim() ?? 
        null;

    const efeitoComChance =
        efeito !== null && dados.effect_chance != null
            ? efeito.replace(/\$effect_chance/g, String(dados.effect_chance))
            : efeito;

    const nomeOficial = dados.names?.find(
        (entrada) => entrada.language.name === "en"
    )?.name;

    return {
        potencia: dados.power,
        precisao: dados.accuracy,
        pp: dados.pp,
        tipo: dados.type.name,
        efeito: efeitoComChance,
        ...(nomeOficial ? { nomeOficial } : {}),
    };
}