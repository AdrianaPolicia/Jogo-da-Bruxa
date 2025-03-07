class cena1 extends Phaser.Scene {
    constructor() {
        super({ key: 'cena1' });
    }

    preload() {
        // Carregar assets para a tela de início
        this.load.image('inicio3', 'assets/inicio3.png');
        this.load.image('jogar3', 'assets/jogar3.png');
        this.load.image( 'teclas', 'assets/teclas.png');
    }

    create() {

        // Obter as dimensões da tela
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        // Adicionar imagem de fundo 
        const background = this.add.image(screenWidth / 2, screenHeight / 2, 'inicio3');
        background.setDisplaySize(screenWidth, screenHeight); // Redimensionar para cobrir a tela

        // Adicionar botão de início e centralizar
        const startButton = this.add.image(screenWidth / 2, screenHeight / 1.1, 'jogar3').setInteractive();
        startButton.setScale (0.2);

        // Adicionar as teclas para indicar como jogar
        const teclas = this.add.image(screenWidth / 1.2, screenHeight / 1.1, 'teclas');
        teclas.setScale ( 0.2);


        // Configurar evento de clique no botão
        startButton.on('pointerdown', () => {
            this.scene.start('cena2'); // Iniciar a segunda cena
        });
    }
}