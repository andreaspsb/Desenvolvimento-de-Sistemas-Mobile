import { fireEvent, render, screen } from "@testing-library/react-native";
import { TelaLista } from "../TelaLista";
import { buscarPokemons } from "../../servicos/buscarPokemons";
import { buscarTiposPokemon } from "../../servicos/buscarTiposPokemon";

jest.mock("../../servicos/buscarPokemons");
jest.mock("../../servicos/buscarTiposPokemon");

beforeEach(() => {
    jest.mocked(buscarPokemons).mockResolvedValue([]);
    jest.mocked(buscarTiposPokemon).mockResolvedValue([]);
});

test("apresenta o campo de busca de Pokémon", async () => {
    await render(<TelaLista />);

    expect(screen.getByLabelText("Buscar Pokémon")).toBeTruthy();
});

test("mostra os Pokémon carregados", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ]);

    await render(<TelaLista />);

    expect(await screen.findByText("pikachu")).toBeTruthy();
});

test("informa quando não consegue carregar os Pokémon", async () => {
    jest.mocked(buscarPokemons).mockRejectedValue(
        new Error("Falha na conexão")
    );

    await render(<TelaLista />);

    expect(
        await screen.findByText("Não foi possível carregar os Pokémon.")
    ).toBeTruthy();
});

test("filtra os Pokémon pelo texto digitado", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([
        { name: "pikachu", url: "url-do-pikachu" },
        { name: "charmander", url: "url-do-charmander" },
    ]);

    await render(<TelaLista />);

    await screen.findByText("charmander");
    await fireEvent.changeText(screen.getByLabelText("Buscar Pokémon"), "pik");

    expect(screen.getByText("pikachu")).toBeTruthy();
    expect(screen.queryByText("charmander")).toBeNull();
});

test("informa quando a busca não encontra Pokémon", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([
        { name: "pikachu", url: "url-do-pikachu" },
    ]);

    await render(<TelaLista />);

    await screen.findByText("pikachu");
    await fireEvent.changeText(
        screen.getByLabelText("Buscar Pokémon"),
        "xyz123"
    );

    expect(screen.getByText("Nenhum Pokémon encontrado")).toBeTruthy();
});

test("informa enquanto os Pokémon estão sendo carregados", async () => {
    jest.mocked(buscarPokemons).mockReturnValue(
        new Promise(() => { })
    );

    await render(<TelaLista />);

    expect(screen.getByText("Carregando Pokémon...")).toBeTruthy();
});

test("mostra o título da Pokédex", async () => {
    await render(<TelaLista />);

    expect(screen.getByText("Pokédex")).toBeTruthy();
});

test("mostra o número do Pokémon com três dígitos", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ]);

    await render(<TelaLista />);

    expect(await screen.findByText("#025")).toBeTruthy();
});

test("associa a imagem ao Pokémon", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ]);

    await render(<TelaLista />);

    const imagem = await screen.findByLabelText("Imagem de pikachu");

    expect(imagem.props.source).toEqual({
        uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    });
});

test("mostra o tipo do Pokémon na lista", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    ]);
    jest.mocked(buscarTiposPokemon).mockResolvedValue(["electric"]);

    await render(<TelaLista />);

    expect(await screen.findByText("Elétrico")).toBeTruthy();
});

test("permite tentar carregar os Pokémon novamente", async () => {
    jest.mocked(buscarPokemons)
        .mockRejectedValueOnce(new Error("Falha na conexão"))
        .mockResolvedValueOnce([
            { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
        ]);

    await render(<TelaLista />);

    const botao = await screen.findByRole("button", {
        name: "Tentar novamente",
    });

    await fireEvent.press(botao);

    expect(await screen.findByText("pikachu")).toBeTruthy();
});

test("limpa a busca e volta a mostrar a lista", async () => {
    jest.mocked(buscarPokemons).mockResolvedValue([
        { name: "pikachu", url: "url-do-pikachu" },
        { name: "charmander", url: "url-do-charmander" },
    ]);

    await render(<TelaLista />);

    await screen.findByText("charmander");
    await fireEvent.changeText(screen.getByLabelText("Buscar Pokémon"), "pik");

    const limpar = screen.getByRole("button", { name: "Limpar busca" });
    await fireEvent.press(limpar);

    expect(screen.getByText("charmander")).toBeTruthy();
    expect(screen.getByLabelText("Buscar Pokémon").props.value).toBe("");
});