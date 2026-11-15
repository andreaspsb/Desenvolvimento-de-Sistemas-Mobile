import { fireEvent, render, screen } from "@testing-library/react-native";
import { CartaoMovimento } from "../CartaoMovimento";
import { buscarDetalhesMovimento } from "../../servicos/buscarDetalhesMovimento";
import { StyleSheet } from "react-native";

jest.mock("../../servicos/buscarDetalhesMovimento");

test("mostra o tipo do movimento em português", async () => {
  jest.mocked(buscarDetalhesMovimento).mockResolvedValue({
    potencia: 40,
    precisao: 100,
    pp: 30,
    tipo: "electric",
    efeito: "Has a 10% chance to paralyze.",
  });

  await render(
    <CartaoMovimento
      nome="thunder-shock"
      url="https://pokeapi.co/api/v2/move/84/"
      nomePokemon="pikachu"
      urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
      aoPressionar={jest.fn()}
    />
  );

  expect(await screen.findByText("Elétrico")).toBeTruthy();
});

test("associa a imagem do Pokémon ao cartão de movimento", async () => {
  jest.mocked(buscarDetalhesMovimento).mockResolvedValue({
    potencia: 40,
    precisao: 100,
    pp: 30,
    tipo: "electric",
    efeito: "Has a 10% chance to paralyze.",
  });

  await render(
    <CartaoMovimento
      nome="thunder-shock"
      url="https://pokeapi.co/api/v2/move/84/"
      nomePokemon="pikachu"
      urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
      aoPressionar={jest.fn()}
    />
  );

  const imagem = screen.getByLabelText("Imagem de pikachu");

  expect(imagem.props.source).toEqual({
    uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  });
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
    <CartaoMovimento
      nome="thunder-shock"
      url="https://pokeapi.co/api/v2/move/84/"
      nomePokemon="pikachu"
      urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
      aoPressionar={jest.fn()}
    />
  );

  expect(await screen.findByText("Thunder Shock")).toBeTruthy();
});

test("informa quando a imagem do Pokémon não carrega", async () => {
  jest.mocked(buscarDetalhesMovimento).mockResolvedValue({
    potencia: 40,
    precisao: 100,
    pp: 30,
    tipo: "electric",
    efeito: "Has a 10% chance to paralyze.",
  });

  await render(
    <CartaoMovimento
      nome="thunder-shock"
      url="https://pokeapi.co/api/v2/move/84/"
      nomePokemon="pikachu"
      urlPokemon="https://pokeapi.co/api/v2/pokemon/25/"
      aoPressionar={jest.fn()}
    />
  );

  await fireEvent(screen.getByLabelText("Imagem de pikachu"), "error");

  expect(screen.getByText("Imagem indisponível")).toBeTruthy();
});

test("usa a cor correspondente ao tipo no cartão de movimento", async () => {
  jest.mocked(buscarDetalhesMovimento).mockResolvedValue({
    potencia: 40,
    precisao: 100,
    pp: 25,
    tipo: "water",
    efeito: null,
  });

  await render(
    <CartaoMovimento
      nome="water-gun"
      url="https://pokeapi.co/api/v2/move/55/"
      nomePokemon="squirtle"
      urlPokemon="https://pokeapi.co/api/v2/pokemon/7/"
      aoPressionar={jest.fn()}
    />
  );

  const textoTipo = await screen.findByText("Água");
  const estilo = StyleSheet.flatten(textoTipo.props.style);

  expect(estilo.color).toBe("#175A91");
});