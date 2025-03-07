class cena3 extends Phaser.Scene {
    constructor() {
        super({ key: 'cena3' });
    }

preload() {
    //carrega os assets para a tela de game over
    this.load.image ('gameover', 'assets/gameover.png')
    this.load.image ('botaoinicio', 'assets/botaoinicio.png')
}

create() {
    // Obter as dimensões da tela
    const screenWidth = this.sys.game.config.width;
    const screenHeight = this.sys.game.config.height;

    // Adicionar imagem de fundo 
    const gameover = this.add.image(screenWidth / 2, screenHeight / 2, 'gameover');

    // Adicionar botão de início e centralizar
    const botaoinicio = this.add.image(screenWidth / 2, screenHeight / 1.1, 'botaoinicio').setInteractive();
        botaoinicio.setScale (0.4);
    
    // Configurar evento de clique no botão
    botaoinicio.on('pointerdown', () => {
        this.scene.start('cena1'); // Iniciar a primeira cena
    });
}
}