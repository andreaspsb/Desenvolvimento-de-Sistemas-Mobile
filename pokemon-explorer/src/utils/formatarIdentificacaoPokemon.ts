export function formatarIdentificacaoPokemon(
    nome: string,
    url: string
): string {
    const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1);
    const numero = url.match(/\/(\d+)\/?$/)?.[1];

    return numero
        ? `${nomeFormatado} #${numero.padStart(3, "0")}`
        : nomeFormatado;
}