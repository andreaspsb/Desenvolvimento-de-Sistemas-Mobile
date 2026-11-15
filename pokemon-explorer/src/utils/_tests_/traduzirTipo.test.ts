import { traduzirTipo } from "../traduzirTipo";

test("traduz os tipos conhecidos da PokéAPI", () => {
    const traducoes = [
        ["normal", "Normal"],
        ["fighting", "Lutador"],
        ["flying", "Voador"],
        ["poison", "Venenoso"],
        ["ground", "Terrestre"],
        ["rock", "Pedra"],
        ["bug", "Inseto"],
        ["ghost", "Fantasma"],
        ["steel", "Aço"],
        ["fire", "Fogo"],
        ["water", "Água"],
        ["grass", "Planta"],
        ["electric", "Elétrico"],
        ["psychic", "Psíquico"],
        ["ice", "Gelo"],
        ["dragon", "Dragão"],
        ["dark", "Sombrio"],
        ["fairy", "Fada"],
        ["stellar", "Estelar"],
        ["unknown", "Desconhecido"],
        ["shadow", "Sombra"],
    ];

    for (const [tipo, traducao] of traducoes) {
        expect(traduzirTipo(tipo)).toBe(traducao);
    }
});