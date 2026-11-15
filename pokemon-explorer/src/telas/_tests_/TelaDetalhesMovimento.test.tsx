import { render, screen } from "@testing-library/react-native";
import { TelaDetalhesMovimento } from "../TelaDetalhesMovimento";
import { buscarDetalhesMovimento } from "../../servicos/buscarDetalhesMovimento";
import { StyleSheet } from "react-native";

jest.mock("../../servicos/buscarDetalhesMovimento");

test("mostra a potência recebida para o movimento", async () => {
    jest.mocked(buscarDetalhesMovimento).mockResolvedValue({
        potencia: 40,
        precisao: 100,
        pp: 30,
        tipo: "electric",
        efeito: "May paralyze the target.",
    });

    await render(
        <TelaDetalhesMovimento
            nomeMovimento="thunder-shock"
            urlMovimento="https://pokeapi.co/api/v2/move/84/"
            nomePokemon="pikachu"
            urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
            aoVoltar={jest.fn()}
        />
    );

    expect(await screen.findByText("Potência: 40")).toBeTruthy();
});

test("mostra a precisão e o PP do movimento", async () => {
    jest.mocked(buscarDetalhesMovimento).mockResolvedValue({
        potencia: 40,
        precisao: 100,
        pp: 30,
        tipo: "electric",
        efeito: "May paralyze the target.",
    });

    await render(
        <TelaDetalhesMovimento
            nomeMovimento="thunder-shock"
            urlMovimento="https://pokeapi.co/api/v2/move/84/"
            nomePokemon="pikachu"
            urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
            aoVoltar={jest.fn()}
        />
    );

    expect(await screen.findByText("Precisão: 100%")).toBeTruthy();
    expect(screen.getByText("PP: 30")).toBeTruthy();
});

test("mostra o tipo do movimento em português", async () => {
    jest.mocked(buscarDetalhesMovimento).mockResolvedValue({
        potencia: 40,
        precisao: 100,
        pp: 30,
        tipo: "electric",
        efeito: "May paralyze the target.",
    });

    await render(
        <TelaDetalhesMovimento
            nomeMovimento="thunder-shock"
            urlMovimento="https://pokeapi.co/api/v2/move/84/"
            nomePokemon="pikachu"
            urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
            aoVoltar={jest.fn()}
        />
    );

    expect(await screen.findByText("Elétrico")).toBeTruthy();
});

test("mostra o efeito recebido da API", async () => {
    jest.mocked(buscarDetalhesMovimento).mockResolvedValue({
        potencia: 40,
        precisao: 100,
        pp: 30,
        tipo: "electric",
        efeito: "Has a 10% chance to paralyze.",
    });

    await render(
        <TelaDetalhesMovimento
            nomeMovimento="thunder-shock"
            urlMovimento="https://pokeapi.co/api/v2/move/84/"
            nomePokemon="pikachu"
            urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
            aoVoltar={jest.fn()}
        />
    );

    expect(
        await screen.findByText("Has a 10% chance to paralyze.")
    ).toBeTruthy();
});

test("informa enquanto os detalhes estão carregando", async () => {
    jest.mocked(buscarDetalhesMovimento).mockReturnValue(
        new Promise(() => { })
    );

    await render(
        <TelaDetalhesMovimento
            nomeMovimento="thunder-shock"
            urlMovimento="https://pokeapi.co/api/v2/move/84/"
            nomePokemon="pikachu"
            urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
            aoVoltar={jest.fn()}
        />
    );

    expect(screen.getByText("Carregando detalhes...")).toBeTruthy();
});

test("mostra o nome oficial do movimento", async () => {
    jest.mocked(buscarDetalhesMovimento).mockResolvedValue({
        potencia: 40,
        precisao: 100,
        pp: 30,
        tipo: "electric",
        efeito: "Has a 10% chance to paralyze.",
        nomeOficial: "Thunder Shock",
    });

    await render(
        <TelaDetalhesMovimento
            nomeMovimento="thunder-shock"
            urlMovimento="https://pokeapi.co/api/v2/move/84/"
            nomePokemon="pikachu"
            urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
            aoVoltar={jest.fn()}
        />
    );

    expect(await screen.findByText("Thunder Shock")).toBeTruthy();
});

test("informa quando não consegue carregar os detalhes", async () => {
    jest.mocked(buscarDetalhesMovimento).mockRejectedValue(
        new Error("Falha na conexão")
    );

    await render(
        <TelaDetalhesMovimento
            nomeMovimento="thunder-shock"
            urlMovimento="https://pokeapi.co/api/v2/move/84/"
            nomePokemon="pikachu"
            urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
            aoVoltar={jest.fn()}
        />
    );

    expect(
        await screen.findByText("Não foi possível carregar os detalhes.")
    ).toBeTruthy();
});

test("informa quando potência e precisão não estão disponíveis", async () => {
    jest.mocked(buscarDetalhesMovimento).mockResolvedValue({
        potencia: null,
        precisao: null,
        pp: 20,
        tipo: "normal",
        efeito: null,
    });

    await render(
        <TelaDetalhesMovimento
            nomeMovimento="growl"
            urlMovimento="https://pokeapi.co/api/v2/move/45/"
            nomePokemon="pikachu"
            urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
            aoVoltar={jest.fn()}
        />
    );

    expect(await screen.findByText("Potência: Não informada")).toBeTruthy();
    expect(screen.getByText("Precisão: Não informada")).toBeTruthy();
});

test("usa a cor correspondente ao tipo nos detalhes", async () => {
    jest.mocked(buscarDetalhesMovimento).mockResolvedValue({
        potencia: 40,
        precisao: 100,
        pp: 25,
        tipo: "water",
        efeito: null,
    });

    await render(
        <TelaDetalhesMovimento
            nomeMovimento="water-gun"
            urlMovimento="https://pokeapi.co/api/v2/move/55/"
            nomePokemon="squirtle"
            urlPokemon="https://pokeapi.co/api/v2/pokemon/7/"
            aoVoltar={jest.fn()}
        />
    );

    const textoTipo = await screen.findByText("Água");
    const estilo = StyleSheet.flatten(textoTipo.props.style);

    expect(estilo.color).toBe("#175A91");
});