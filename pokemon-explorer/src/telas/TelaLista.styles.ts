import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: "#F5F2EA",
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    marca: {
        color: "#88847C",
        fontSize: 12,
        marginBottom: 16,
    },
    titulo: {
        color: "#1C1C1C",
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 24,
    },
    busca: {
        height: 52,
        backgroundColor: "#FFFFFF",
        borderColor: "#E6DED2",
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 32,
        fontSize: 14,
        paddingRight: 48,
    },
    campoBusca: {
        position: "relative",
        marginBottom: 24,
    },
    botaoLimpar: {
        position: "absolute",
        right: 0,
        width: 48,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
    },
    semResultados: {
        alignItems: "center",
        paddingVertical: 48,
    },
    tituloSemResultados: {
        color: "#1C1C1C",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },
    ajudaSemResultados: {
        color: "#88847C",
        fontSize: 14,
        marginTop: 12,
        textAlign: "center",
    },
});