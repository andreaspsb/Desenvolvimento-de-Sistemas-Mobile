import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { buscarDetalhesMovimento } from "../servicos/buscarDetalhesMovimento";
import { traduzirTipo } from "../utils/traduzirTipo";
import { estilos } from "./CartaoMovimento.styles";
import { ImagemPokemon } from "./ImagemPokemon";
import { corDoTipo } from "../utils/corDoTipo";

type Propriedades = {
    nome: string;
    url: string;
    nomePokemon: string;
    urlPokemon: string;
    aoPressionar: () => void;
};

export function CartaoMovimento({
    nome,
    url,
    nomePokemon,
    urlPokemon,
    aoPressionar,
}: Propriedades) {
    const [tipo, setTipo] = useState<string | null>(null);
    const [erro, setErro] = useState(false);
    const [nomeOficial, setNomeOficial] = useState<string | null>(null);

    useEffect(() => {
        async function carregarTipo() {
            try {
                const detalhes = await buscarDetalhesMovimento(url);
                setNomeOficial(detalhes.nomeOficial ?? null);
                setTipo(detalhes.tipo);
            } catch {
                setErro(true);
            }
        }

        carregarTipo();
    }, [url]);

    const numeroPokemon = urlPokemon.match(/\/(\d+)\/?$/)?.[1];

    return (
        <Pressable style={estilos.cartao}
            accessibilityRole="button"
            accessibilityLabel={`Ver detalhes de ${nome}`}
            onPress={aoPressionar}
        >
            <View style={estilos.informacoes}>
                <Text style={estilos.nome}>{nomeOficial ?? nome}</Text>
                {tipo && <Text style={[estilos.tipo, { color: corDoTipo(tipo) }]}>{traduzirTipo(tipo)}</Text>}
                {erro && <Text>Tipo indisponível</Text>}
            </View>

            {numeroPokemon && (
                <ImagemPokemon
                    nome={nomePokemon}
                    numero={numeroPokemon}
                    style={estilos.imagem}
                />
            )}
        </Pressable>
    );
}