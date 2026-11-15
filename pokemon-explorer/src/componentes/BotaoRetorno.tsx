import { Pressable, Text } from "react-native";
import { estilos } from "./BotaoRetorno.styles";

type Propriedades = {
    texto: string;
    aoPressionar: () => void;
};

export function BotaoRetorno({ texto, aoPressionar }: Propriedades) {
    return (
        <Pressable style={estilos.botao}
            accessibilityRole="button"
            accessibilityLabel={texto}
            onPress={aoPressionar}
        >
            <Text style={estilos.texto}>← {texto}</Text>
        </Pressable>
    );
}