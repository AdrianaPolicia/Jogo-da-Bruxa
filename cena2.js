class cena2 extends Phaser.Scene {
    constructor() {
        super({ key: 'cena2' });
        // Variáveis declaradas como propriedades da classe
        this.score = 0;
        this.scoreText;
        this.platforms;
        this.player;
        this.stars;
        this.fogos;
        this.cursors;
        this.gameOver = false;
    }

    preload() {
        // Carregar assets do jogo
        this.load.image('background2', 'assets/background2.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('pocao', 'assets/pocao.png');
        this.load.image('fogo', 'assets/fogo.png');
        this.load.spritesheet('personagem', 'assets/spritesheetGrace.png', 
            { frameWidth: 64, frameHeight: 48 });
    }

    create() {
        // Exibir as imagens por ordem de camadas e estabelecer as coordenadas
        this.add.image(400, 355, 'background2').setScale(0.8);

        // Criar o grupo de plataformas
        this.platforms = this.physics.add.staticGroup();

        // Lista de configurações das plataformas
        const platformConfigs = [
        [450, 680, 3.5, 1100, 30, 0, 240],  // [x, y, escala, largura, altura, offsetX, offsetY]
        [600, 500, 1, 280, 40, 35, 70],
        [130, 340, 1, 280, 40, 40, 70],
        [750, 285, 1, 280, 40, 40, 70]
];

        // Criar e configurar as plataformas usando um loop for
        for (let i = 0; i < platformConfigs.length; i++) {
        const [x, y, scale, width, height, offsetX, offsetY] = platformConfigs[i];

        const platform = this.platforms.create(x, y, 'ground').setScale(1).refreshBody();

        platform.body.setSize(width, height);
        platform.body.setOffset(offsetX, offsetY);
}
  

        // Criação do personagem
        this.player = this.physics.add.sprite(100, 450, 'personagem');
        this.player.setScale(1.5);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(300);

        // Animações do personagem
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'personagem', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('personagem', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.platforms);

        // Criando as poções 
        this.pocoes = this.physics.add.group({
            key: 'pocao',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.pocoes.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setScale(0.08);
        });

        // Colisão das poções com as plataformas e coleta das poções
        this.physics.add.collider(this.pocoes, this.platforms);
        this.physics.add.overlap(this.player, this.pocoes, this.collectPocao, null, this);

        // Texto de pontuação
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' });

        // Criando a variável para os fogos
        this.fogos = this.physics.add.group();
        this.physics.add.collider(this.fogos, this.platforms);
        this.physics.add.overlap(this.player, this.fogos, this.hitFogo, null, this);

        // Capturando as teclas
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Movimento do jogador
        if (this.gameOver) return;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-530);
        }
    }

        //coletando a poção
        collectPocao(player, pocao) {
        pocao.disableBody(true, true);
        
        // Aumenta a pontuação em 1 quando a poção é coletada
        this.score += 1;
        this.scoreText.setText('score: ' + this.score);

        // Se todas as poções foram coletadas, recria as poções
        if (this.pocoes.countActive(true) === 0) {
            this.pocoes.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var fogo = this.fogos.create(x, 16, 'fogo');
            fogo.setScale ( 0.1)
            fogo.setBounce(1);
            fogo.setCollideWorldBounds(true);
            fogo.setVelocity(Phaser.Math.Between(-200, 200), 20);
            fogo.body.setSize(30, 30);
        }
    }

    hitFogo(player, fogo) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.gameOver = true;
        // mudando de cena
            this.scene.start('cena3');
        
    }
}
