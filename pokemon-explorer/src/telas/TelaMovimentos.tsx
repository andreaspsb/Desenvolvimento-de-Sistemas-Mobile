import { FlatList, Text, View } from "react-native";
import { BotaoRetorno } from "../componentes/BotaoRetorno";
import { useState, useEffect } from "react";
import { buscarMovimentosPokemon } from "../servicos/buscarMovimentosPokemon";
import { estilos } from "./TelaMovimentos.styles";
import { formatarIdentificacaoPokemon } from "../utils/formatarIdentificacaoPokemon";
import { CartaoMovimento } from "../componentes/CartaoMovimento";
import { SafeAreaView } from "react-native-safe-area-context";

type Movimento = {
    name: string;
    url: string;
};

type Propriedades = {
    nomePokemon: string;
    urlPokemon: string;
    aoVoltar: () => void;
    aoSelecionarMovimento?: (movimento: Movimento) => void;
};

export function TelaMovimentos({ nomePokemon, urlPokemon, aoVoltar, aoSelecionarMovimento }: Propriedades) {

    const [movimentos, setMovimentos] = useState<Movimento[]>([]);
    const [erro, setErro] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarMovimentos() {
            try {
                const resultado = await buscarMovimentosPokemon(urlPokemon);
                setMovimentos(resultado);
            } catch {
                setErro(true);
            } finally {
                setCarregando(false);
            }
        }

        carregarMovimentos();
    }, [urlPokemon]);

    return (
        <SafeAreaView style={estilos.tela}>
            <Text style={estilos.marca}>POKÉMON EXPLORER</Text>
            <Text style={estilos.titulo}>Movimentos</Text>
            <Text style={estilos.pokemon}>
                {formatarIdentificacaoPokemon(nomePokemon, urlPokemon)}
            </Text>

            {carregando && <Text>Carregando movimentos...</Text>}
            {erro && <Text>Não foi possível carregar os movimentos.</Text>}

            <FlatList style={estilos.lista}
                data={movimentos}
                keyExtractor={(movimento) => movimento.url}
                renderItem={({ item }) => (
                    <CartaoMovimento
                        nome={item.name}
                        url={item.url}
                        nomePokemon={nomePokemon}
                        urlPokemon={urlPokemon}
                        aoPressionar={() => aoSelecionarMovimento?.(item)}
                    />
                )}
            />

            <BotaoRetorno texto="Voltar à Pokédex" aoPressionar={aoVoltar} />
        </SafeAreaView>
    );
}