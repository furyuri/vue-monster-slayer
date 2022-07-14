function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;    
}

const app = Vue.createApp({
    data() {
        return {
            round: 0,
            special: false,
            limit_break: 0,
            monsterMaxHP: 150,
            monsterHP: 150,
            playerMaxHP: 100,
            playerHP: 100,
            winner: null,
            active_game: true,
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
            // used to disable the "SPECIAL ATTACK" button
            if (this.limit_break % 3 === 0 && this.limit_break != 0) {
                this.special = true;
            }
            // if user doesn't have special available, then send 'true' value to 'disabled' attribute.
            return !this.special == true;
        },
        activeGame() {
            if (this.winner) {
                return !this.active_game == false;
            }
        }
    },
    watch: {
        playerHP(value) {
            if (value <= 0 && this.monsterHP <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.playerHP = 0; // Set to zero as negative CSS percentages don't work
                this.winner = 'monster';
            }
        },
        monsterHP(value) {
            if (value <=0 && this.playerHP <= 0) {
                this.winner = 'draw';
            } else if (value <=0) {
                this.monsterHP = 0; // Set to zero as negative CSS percentages don't work
                this.winner = 'player';
            } 
        },
        winner(value) {
            if (this.winner) {
                this.special = false;
            }
        }
    },
    methods: {
        attackMonster() {
            this.monsterHP -= getRandomNum(7, 15);         
            this.attackPlayer();
            this.round++;
            this.limit_break++;
        },
        specialAttackMonster() {
            this.monsterHP -= getRandomNum(8, 20);
            this.attackPlayer();
            this.special = 0;
            this.limit_break = 0;
        },        
        attackPlayer() {
            this.playerHP -= getRandomNum(5, 12);     
        },
        healPlayer() {
            const healValue = getRandomNum(8, 20);
            if (this.playerHP + healValue > 100) {
                this.playerHP = 100;
            } else {
                this.playerHP += healValue;
            }
            this.attackPlayer();
            this.round++;         
        }
    }
});
app.mount('#game');