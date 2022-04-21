function randomAttackGen(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;    
}

const app = Vue.createApp({
    data() {
        return {
            round: 0,
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
            return !(this.round % 3 === 0);
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
            this.round++;
        },        
        attackPlayer() {
            this.playerHP -= randomAttackGen(5, 12);
        }
    }
});
app.mount('#game');