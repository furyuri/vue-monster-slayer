function randomAttackGen(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;    
}

const app = Vue.createApp({
    data() {
        return {
            round: 0,
            special: false,
            monsterMaxHP: 150,
            monsterHP: 150,
            playerMaxHP: 100,
            playerHP: 100
        };
    },
    computed: {
        monsterBarStyles() {
            return {
                width: (this.monsterHP / this.monsterMaxHP * 100) + "%"
            }
        },
        playerBarStyles() {
            return {
                width: (this.playerHP / this.playerMaxHP * 100) + "%"
            }
        },
        specialAtk() {
            if (this.special < 1 && this.round % 3 === 0 && this.round != 0) {
                this.special = 1;
            }
            return !this.special == 1;
        }
    },
    methods: {
        attackMonster() {
            this.monsterHP -= randomAttackGen(7, 15);
            this.attackPlayer();
            this.round++;
        },
        specialAttackMonster() {
            this.monsterHP -= randomAttackGen(8, 20);
            this.attackPlayer();
            this.special = 0;
            this.round++;
        },        
        attackPlayer() {
            this.playerHP -= randomAttackGen(5, 12);
        }
    }
});
app.mount('#game');