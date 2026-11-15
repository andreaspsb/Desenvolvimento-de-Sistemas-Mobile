import { fireEvent, render, screen } from "@testing-library/react-native";
import App from "../../App";
import { buscarPokemons } from "../servicos/buscarPokemons";
import { buscarTiposPokemon } from "../servicos/buscarTiposPokemon";
import { buscarMovimentosPokemon } from "../servicos/buscarMovimentosPokemon";
import { buscarDetalhesMovimento } from "../servicos/buscarDetalhesMovimento";

jest.mock("../servicos/buscarPokemons");
jest.mock("../servicos/buscarTiposPokemon");
jest.mock("../servicos/buscarMovimentosPokemon");
jest.mock("../servicos/buscarDetalhesMovimento");

beforeEach(() => {
    jest.mocked(buscarMovimentosPokemon).mockResolvedValue([]);
    jest.mocked(buscarDetalhesMovimento).mockResolvedValue({
        potencia: 40,
        precisao: 100,
        pp: 30,
        tipo: "electric",
        efeito: "May paralyze the target.",
    });
});

test("mostra a tela de lista ao abrir o aplicativo", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([]);
    jest.mocked(buscarTiposPokemon).mockResolvedValue([]);

    await render(<App />);

    expect(screen.getByLabelText("Buscar Pokémon")).toBeTruthy();
});

test("abre os movimentos do Pokémon selecionado", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ]);
    jest.mocked(buscarTiposPokemon).mockResolvedValue([]);

    await render(<App />);

    const cartao = await screen.findByRole("button", {
        name: "Abrir movimentos de pikachu",
    });

    await fireEvent.press(cartao);

    expect(await screen.findByText("Movimentos")).toBeTruthy();
});

test("volta da tela de movimentos para a lista", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ]);
    jest.mocked(buscarTiposPokemon).mockResolvedValue([]);

    await render(<App />);

    const cartao = await screen.findByRole("button", {
        name: "Abrir movimentos de pikachu",
    });
    await fireEvent.press(cartao);

    const botaoVoltar = await screen.findByRole("button", {
        name: "Voltar à Pokédex",
    });
    await fireEvent.press(botaoVoltar);

    expect(await screen.findByLabelText("Buscar Pokémon")).toBeTruthy();
});

test("abre os detalhes do movimento selecionado", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ]);
    jest.mocked(buscarTiposPokemon).mockResolvedValue([]);
    jest.mocked(buscarMovimentosPokemon).mockResolvedValue([
        {
            name: "thunder-shock",
            url: "https://pokeapi.co/api/v2/move/84/",
        },
    ]);

    await render(<App />);

    await fireEvent.press(
        await screen.findByRole("button", {
            name: "Abrir movimentos de pikachu",
        })
    );

    await fireEvent.press(
        await screen.findByRole("button", {
            name: "Ver detalhes de thunder-shock",
        })
    );

    expect(await screen.findByText("DADOS DO MOVIMENTO")).toBeTruthy();
});

test("volta dos detalhes para os movimentos", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ]);
    jest.mocked(buscarTiposPokemon).mockResolvedValue([]);
    jest.mocked(buscarMovimentosPokemon).mockResolvedValue([
        {
            name: "thunder-shock",
            url: "https://pokeapi.co/api/v2/move/84/",
        },
    ]);

    await render(<App />);

    await fireEvent.press(
        await screen.findByRole("button", {
            name: "Abrir movimentos de pikachu",
        })
    );

    await fireEvent.press(
        await screen.findByRole("button", {
            name: "Ver detalhes de thunder-shock",
        })
    );

    await fireEvent.press(
        await screen.findByRole("button", {
            name: "Voltar para movimentos",
        })
    );

    expect(
        await screen.findByRole("button", {
            name: "Ver detalhes de thunder-shock",
        })
    ).toBeTruthy();
});

test("identifica o Pokémon na tela de detalhes", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ]);
    jest.mocked(buscarTiposPokemon).mockResolvedValue([]);
    jest.mocked(buscarMovimentosPokemon).mockResolvedValue([
        {
            name: "thunder-shock",
            url: "https://pokeapi.co/api/v2/move/84/",
        },
    ]);

    await render(<App />);

    await fireEvent.press(
        await screen.findByRole("button", {
            name: "Abrir movimentos de pikachu",
        })
    );

    await fireEvent.press(
        await screen.findByRole("button", {
            name: "Ver detalhes de thunder-shock",
        })
    );

    expect(await screen.findByText("Pikachu #025")).toBeTruthy();
});

test("preserva a busca ao voltar dos movimentos", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
        { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    ]);
    jest.mocked(buscarTiposPokemon).mockResolvedValue([]);

    await render(<App />);

    await screen.findByText("charmander");
    await fireEvent.changeText(screen.getByLabelText("Buscar Pokémon"), "pik");

    await fireEvent.press(
        await screen.findByRole("button", {
            name: "Abrir movimentos de pikachu",
        })
    );

    await fireEvent.press(
        await screen.findByRole("button", {
            name: "Voltar à Pokédex",
        })
    );

    expect(screen.getByLabelText("Buscar Pokémon").props.value).toBe("pik");
    expect(screen.queryByText("charmander")).toBeNull();
});