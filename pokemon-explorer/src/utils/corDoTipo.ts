const cores = new Map<string, string>([
    ["normal", "#616161"],
    ["fighting", "#A7352C"],
    ["flying", "#545DB0"],
    ["poison", "#8B388E"],
    ["ground", "#856000"],
    ["rock", "#746317"],
    ["bug", "#547508"],
    ["ghost", "#624682"],
    ["steel", "#52636D"],
    ["fire", "#A13217"],
    ["water", "#175A91"],
    ["grass", "#31713B"],
    ["electric", "#996000"],
    ["psychic", "#A42F62"],
    ["ice", "#1A6874"],
    ["dragon", "#5142A0"],
    ["dark", "#594843"],
    ["fairy", "#9A3D72"],
    ["stellar", "#464EAB"],
    ["unknown", "#555F5B"],
    ["shadow", "#42365C"],
]);

export function corDoTipo(tipo: string): string {
    return cores.get(tipo) ?? "#555555";
}