import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { buscarPokemons } from "../servicos/buscarPokemons";
import { filtrarPokemon } from "../utils/filtrarPokemon";
import { CartaoPokemon } from "../componentes/CartaoPokemon";
import { estilos } from "./TelaLista.styles";
import { SafeAreaView } from "react-native-safe-area-context";

type Pokemon = {
    name: string;
    url: string;
};

type Propriedades = {
    aoSelecionarPokemon?: (pokemon: Pokemon) => void;
};

export function TelaLista({ aoSelecionarPokemon }: Propriedades) {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [erro, setErro] = useState(false);
    const [busca, setBusca] = useState("");
    const [carregando, setCarregando] = useState(true);

    const carregarPokemons = useCallback(async () => {
        setCarregando(true);
        setErro(false);

        try {
            const resultado = await buscarPokemons();
            setPokemons(resultado);
        } catch {
            setErro(true);
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        void carregarPokemons();
    }, [carregarPokemons]);

    const pokemonsFiltrados = filtrarPokemon(pokemons, busca);

    return (
        <SafeAreaView style={estilos.tela}>
            <Text style={estilos.marca}>POKÉMON EXPLORER</Text>
            <Text style={estilos.titulo}>Pokédex</Text>

            <View style={estilos.campoBusca}>
                <TextInput
                    accessibilityLabel="Buscar Pokémon"
                    style={estilos.busca}
                    placeholder="Buscar por nome ou número"
                    value={busca}
                    onChangeText={setBusca}
                />

                {busca.length > 0 && (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Limpar busca"
                        style={estilos.botaoLimpar}
                        onPress={() => setBusca("")}
                    >
                        <Text>×</Text>
                    </Pressable>
                )}
            </View>

            {carregando && <Text>Carregando Pokémon...</Text>}

            {erro && (
                <View>
                    <Text>Não foi possível carregar os Pokémon.</Text>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => void carregarPokemons()}
                    >
                        <Text>Tentar novamente</Text>
                    </Pressable>
                </View>
            )}

            {!carregando && busca.trim() !== "" && pokemonsFiltrados.length === 0 && !erro && (
                <View style={estilos.semResultados}>
                    <Text style={estilos.tituloSemResultados}>
                        Nenhum Pokémon encontrado
                    </Text>
                    <Text style={estilos.ajudaSemResultados}>
                        Tente outro nome ou número
                    </Text>
                </View>
            )}

            <FlatList
                data={pokemonsFiltrados}
                keyExtractor={(pokemon) => pokemon.url}
                renderItem={({ item: pokemon }) => (
                    <CartaoPokemon
                        nome={pokemon.name}
                        url={pokemon.url}
                        aoPressionar={() => aoSelecionarPokemon?.(pokemon)}
                    />
                )}
            />

        </SafeAreaView>
    );
}