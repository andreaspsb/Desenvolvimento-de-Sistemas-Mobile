import { ScrollView, Text, View } from "react-native";
import { BotaoRetorno } from "../componentes/BotaoRetorno";
import { buscarDetalhesMovimento } from "../servicos/buscarDetalhesMovimento";
import { useEffect, useState } from "react";
import { traduzirTipo } from "../utils/traduzirTipo";
import { formatarIdentificacaoPokemon } from "../utils/formatarIdentificacaoPokemon";
import { estilos } from "./TelaDetalhesMovimento.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { corDoTipo } from "../utils/corDoTipo";

type Propriedades = {
    nomeMovimento: string;
    urlMovimento: string;
    aoVoltar: () => void;
    nomePokemon: string;
    urlPokemon: string;
};

type Detalhes = Awaited<ReturnType<typeof buscarDetalhesMovimento>>;

export function TelaDetalhesMovimento({
    nomeMovimento,
    urlMovimento,
    nomePokemon,
    urlPokemon,
    aoVoltar,
}: Propriedades) {

    const [detalhes, setDetalhes] = useState<Detalhes | null>(null);
    const [erro, setErro] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarDetalhes() {
            try {
                const resultado = await buscarDetalhesMovimento(urlMovimento);
                setDetalhes(resultado);
            } catch {
                setErro(true);
            } finally {
                setCarregando(false);
            }
        }

        carregarDetalhes();
    }, [urlMovimento]);

    return (
        <SafeAreaView style={estilos.tela}>
            <Text style={estilos.marca}>POKÉMON EXPLORER</Text>
            <Text style={estilos.titulo}>
                {detalhes?.nomeOficial ?? nomeMovimento}
            </Text>
            <Text style={estilos.pokemon}>
                {formatarIdentificacaoPokemon(nomePokemon, urlPokemon)}
            </Text>

            <ScrollView style={estilos.conteudo}>
                {carregando && <Text>Carregando detalhes...</Text>}
                {erro && <Text>Não foi possível carregar os detalhes.</Text>}

                {detalhes && (
                    <>
                        <Text style={[estilos.tipo, { color: corDoTipo(detalhes.tipo) }]}>
                            {traduzirTipo(detalhes.tipo)}
                        </Text>

                        <View style={estilos.painel}>
                            <Text style={estilos.tituloPainel}>DADOS DO MOVIMENTO</Text>
                            <Text style={estilos.dado}>
                                Potência: {detalhes.potencia ?? "Não informada"}
                            </Text>
                            <Text style={estilos.dado}>
                                Precisão: {detalhes.precisao === null
                                    ? "Não informada"
                                    : `${detalhes.precisao}%`}
                            </Text>
                            <Text style={estilos.dado}>
                                PP: {detalhes.pp ?? "Não informado"}
                            </Text>
                        </View>

                        <View style={estilos.painel}>
                            <Text style={estilos.tituloPainel}>Efeito (em inglês):</Text>
                            <Text style={estilos.dado}>
                                {detalhes.efeito ?? "Descrição indisponível"}
                            </Text>
                        </View>
                    </>
                )}
            </ScrollView>

            <BotaoRetorno
                texto="Voltar para movimentos"
                aoPressionar={aoVoltar}
            />
        </SafeAreaView>
    );
}