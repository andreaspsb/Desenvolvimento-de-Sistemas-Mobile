import { fireEvent, render, screen } from "@testing-library/react-native";
import { TelaMovimentos } from "../TelaMovimentos";
import { buscarMovimentosPokemon } from "../../servicos/buscarMovimentosPokemon";
import { buscarDetalhesMovimento } from "../../servicos/buscarDetalhesMovimento";

jest.mock("../../servicos/buscarMovimentosPokemon");
jest.mock("../../servicos/buscarDetalhesMovimento");

beforeEach(() => {
    jest.mocked(buscarDetalhesMovimento).mockResolvedValue({
        potencia: 40,
        precisao: 100,
        pp: 30,
        tipo: "electric",
        efeito: "Has a 10% chance to paralyze.",
    });
});

test("mostra os movimentos do Pokémon selecionado", async () => {
    jest.mocked(buscarMovimentosPokemon).mockResolvedValue([
        {
            name: "thunder-shock",
            url: "https://pokeapi.co/api/v2/move/84/",
        },
    ]);

    await render(
        <TelaMovimentos
            nomePokemon="pikachu"
            urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
            aoVoltar={jest.fn()}
        />
    );

    expect(await screen.findByText("thunder-shock")).toBeTruthy();
});

test("informa enquanto os movimentos estão carregando", async () => {
    jest.mocked(buscarMovimentosPokemon).mockReturnValue(
        new Promise(() => { })
    );

    await render(
        <TelaMovimentos
            nomePokemon="pikachu"
            urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
            aoVoltar={jest.fn()}
        />
    );

    expect(screen.getByText("Carregando movimentos...")).toBeTruthy();
});

test("informa qual movimento foi selecionado", async () => {
    const movimento = {
        name: "thunder-shock",
        url: "https://pokeapi.co/api/v2/move/84/",
    };
    jest.mocked(buscarMovimentosPokemon).mockResolvedValue([movimento]);
    const aoSelecionarMovimento = jest.fn();

    await render(
        <TelaMovimentos
            nomePokemon="pikachu"
            urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
            aoVoltar={jest.fn()}
            aoSelecionarMovimento={aoSelecionarMovimento}
        />
    );

    const item = await screen.findByRole("button", {
        name: "Ver detalhes de thunder-shock",
    });

    await fireEvent.press(item);

    expect(aoSelecionarMovimento).toHaveBeenCalledWith(movimento);
});

test("mostra o nome e o número do Pokémon", async () => {
    jest.mocked(buscarMovimentosPokemon).mockResolvedValue([]);

    await render(
        <TelaMovimentos
            nomePokemon="pikachu"
            urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
            aoVoltar={jest.fn()}
        />
    );

    expect(screen.getByText("Pikachu #025")).toBeTruthy();
});