module.exports = {
    token: "Token do cliente do Discord",
    prefix: "Prefixo para executar os comandos",
    owners: [],
    lavalink_nodes: [
        {
            id: "Node", // Indentificação do node
            host: "localhost", // Host do node (String)
            password: "youshallnotpass", // Senha de acesso do node (String)
            port: 2333, // Porta de acesso ao node (Number)
            options: {
                followRedirects: false // Se vai seguir o fluxo de redirecionamento
            }
        }
    ] //Nodes
};