import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
    cartao: {
        minHeight: 104,
        backgroundColor: "#FFFFFF",
        borderColor: "#E6DED2",
        borderWidth: 1,
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        flexDirection: "row",
        alignItems: "center",
    },
    informacoes: {
        flex: 1,
    },
    numero: {
        color: "#88847C",
        fontSize: 12,
        fontWeight: "600",
    },
    nome: {
        color: "#1C1C1C",
        fontSize: 20,
        fontWeight: "700",
        textTransform: "capitalize",
        marginTop: 4,
    },
    tipo: {
        color: "#996000",
        fontSize: 12,
        marginTop: 6,
    },
    imagem: {
        width: 64,
        height: 64,
    },
    tipos: {
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: 8,
    },
});