import { fireEvent, render, screen } from "@testing-library/react-native";
import { CartaoPokemon } from "../CartaoPokemon";
import { buscarTiposPokemon } from "../../servicos/buscarTiposPokemon";
import { StyleSheet } from "react-native";

jest.mock("../../servicos/buscarTiposPokemon");

test("mostra o tipo recebido para o Pokémon", async () => {
    jest.mocked(buscarTiposPokemon).mockResolvedValue(["electric"]);

    await render(
        <CartaoPokemon
            nome="pikachu"
            url="https://pokeapi.co/api/v2/pokemon/25/"
        />
    );

    expect(await screen.findByText("Elétrico")).toBeTruthy();
});

test("mostra o tipo em português", async () => {
    jest.mocked(buscarTiposPokemon).mockResolvedValue(["electric"]);

    await render(
        <CartaoPokemon
            nome="pikachu"
            url="https://pokeapi.co/api/v2/pokemon/25/"
        />
    );

    expect(await screen.findByText("Elétrico")).toBeTruthy();
});

test("aciona a abertura dos movimentos ao tocar no cartão", async () => {
    jest.mocked(buscarTiposPokemon).mockResolvedValue([]);
    const aoPressionar = jest.fn();

    await render(
        <CartaoPokemon
            nome="pikachu"
            url="https://pokeapi.co/api/v2/pokemon/25/"
            aoPressionar={aoPressionar}
        />
    );

    await fireEvent.press(
        screen.getByRole("button", { name: "Abrir movimentos de pikachu" })
    );

    expect(aoPressionar).toHaveBeenCalledTimes(1);
});

test("informa quando a imagem do Pokémon não carrega", async () => {
    jest.mocked(buscarTiposPokemon).mockResolvedValue([]);

    await render(
        <CartaoPokemon
            nome="pikachu"
            url="https://pokeapi.co/api/v2/pokemon/25/"
        />
    );

    await fireEvent(screen.getByLabelText("Imagem de pikachu"), "error");

    expect(screen.getByText("Imagem indisponível")).toBeTruthy();
});

test("usa a cor correspondente ao tipo no cartão", async () => {
    jest.mocked(buscarTiposPokemon).mockResolvedValue(["fire"]);

    await render(
        <CartaoPokemon
            nome="charmander"
            url="https://pokeapi.co/api/v2/pokemon/4/"
        />
    );

    const textoTipo = await screen.findByText("Fogo");
    const estilo = StyleSheet.flatten(textoTipo.props.style);

    expect(estilo.color).toBe("#A13217");
});