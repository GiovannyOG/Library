//Configuração do Bundle
//Comum tanto pra DEV quanto PROD
module.exports = {
    entry: {
        main: './src/index.js' //Nosso arquivo de entrada.
    },
    module: {
        rules: [
            {
                test: /\.html$/, //Captura todos os arquivos .html
                use: ['html-loader'] //Gerar o arquivo html, 
                                     //com styles e srcipt
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                use: {
                    loader: "file-loader", //Gera os assets
                    options: {
                        name: "[name].[hash].[ext]", //nome que vai salvar
                        outputPath: "imgs" //na pasta imgs

                    }
                }
            }
        ]
    }

}
