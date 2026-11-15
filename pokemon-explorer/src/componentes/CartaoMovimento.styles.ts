import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
    cartao: {
        minHeight: 92,
        backgroundColor: "#FFFFFF",
        borderColor: "#E6DED2",
        borderWidth: 1,
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    informacoes: {
        flex: 1,
    },
    imagem: {
        width: 64,
        height: 64,
    },
    nome: {
        color: "#1C1C1C",
        fontSize: 18,
        fontWeight: "700",
    },
    tipo: {
        color: "#996000",
        fontSize: 12,
        marginTop: 6,
    },
});