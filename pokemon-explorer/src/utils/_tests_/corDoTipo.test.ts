import { corDoTipo } from "../corDoTipo";

test("retorna cores diferentes para os tipos elétrico e fogo", () => {
    expect(corDoTipo("electric")).toBe("#996000");
    expect(corDoTipo("fire")).toBe("#A13217");
});

test("retorna uma cor própria para cada tipo conhecido", () => {
    const tipos = [
        "normal", "fighting", "flying", "poison", "ground", "rock",
        "bug", "ghost", "steel", "fire", "water", "grass",
        "electric", "psychic", "ice", "dragon", "dark", "fairy",
        "stellar", "unknown", "shadow",
    ];

    const cores = tipos.map(corDoTipo);

    expect(new Set(cores).size).toBe(tipos.length);
    expect(cores).not.toContain("#555555");
});