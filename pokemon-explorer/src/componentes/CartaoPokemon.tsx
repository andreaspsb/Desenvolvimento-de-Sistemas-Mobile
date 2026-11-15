import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { buscarTiposPokemon } from "../servicos/buscarTiposPokemon";
import { traduzirTipo } from "../utils/traduzirTipo";
import { estilos } from "./CartaoPokemon.styles";
import { ImagemPokemon } from "./ImagemPokemon";
import { corDoTipo } from "../utils/corDoTipo";

type Propriedades = {
    nome: string;
    url: string;
    aoPressionar?: () => void;
};

export function CartaoPokemon({ nome, url, aoPressionar }: Propriedades) {
    const [tipos, setTipos] = useState<string[]>([]);
    const [erro, setErro] = useState(false);

    useEffect(() => {
        async function carregarTipos() {
            try {
                const resultado = await buscarTiposPokemon(url);
                setTipos(resultado);
            } catch {
                setErro(true);
            }
        }

        carregarTipos();
    }, [url]);

    const numero = url.match(/\/(\d+)\/?$/)?.[1];

    return (
        <Pressable
            style={estilos.cartao}
            onPress={aoPressionar}
            accessibilityRole="button"
            accessibilityLabel={`Abrir movimentos de ${nome}`}>

            <View style={estilos.informacoes}>
                {numero && <Text style={estilos.numero}>#{numero.padStart(3, "0")}</Text>}

                <Text style={estilos.nome}>{nome}</Text>

                <View style={estilos.tipos}>
                    {tipos.map((tipo) => (
                        <Text key={tipo} style={[estilos.tipo, { color: corDoTipo(tipo) }]}>
                            {traduzirTipo(tipo)}
                        </Text>
                    ))}
                </View>

                {erro && <Text>Tipo indisponível</Text>}

            </View>

            {numero && (
                <ImagemPokemon
                    nome={nome}
                    numero={numero}
                    style={estilos.imagem}
                />
            )}

        </Pressable>
    );
}