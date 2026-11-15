import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import type { ImageStyle, StyleProp } from "react-native";
import { estilos } from "./ImagemPokemon.styles";

type Propriedades = {
    nome: string;
    numero: string;
    style?: StyleProp<ImageStyle>;
};

export function ImagemPokemon({ nome, numero, style }: Propriedades) {
    const [indisponivel, setIndisponivel] = useState(false);

    useEffect(() => {
        setIndisponivel(false);
    }, [numero]);

    if (indisponivel) {
        return (
            <View style={estilos.indisponivel}>
                <Text style={estilos.mensagem}>Imagem indisponível</Text>
            </View>
        );
    }

    return (
        <Image
            accessibilityLabel={`Imagem de ${nome}`}
            source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numero}.png`,
            }}
            style={style}
            onError={() => setIndisponivel(true)}
        />
    );
}