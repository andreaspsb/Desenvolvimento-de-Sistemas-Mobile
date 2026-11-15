const traducoes = new Map<string, string>([
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
]);

export function traduzirTipo(tipo: string): string {
    return traducoes.get(tipo) ?? tipo;
}