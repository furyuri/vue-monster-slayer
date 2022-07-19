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
            logMessages: [],
        };
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHP < 0) {
                return {
                    width: "0%"
                }
            }
            return {
                width: (this.monsterHP / this.monsterMaxHP * 100) + "%"
            }
        },
        playerBarStyles() {
            if (this.playerHP < 0) {
                return {
                    width: "0%"
                }
            }            
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
    },
    watch: {
        playerHP(value) {
            if (value <= 0 && this.monsterHP <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHP(value) {
            if (value <=0 && this.playerHP <= 0) {
                this.winner = 'draw';
            } else if (value <=0) {
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
        startGame() {
            this.playerHP = this.playerMaxHP;
            this.monsterHP = this.monsterMaxHP;
            this.round = 0;
            this.winner = null;
            this.logMessages = [];
        },
        attackMonster() {
            const attackValue = getRandomNum(7, 15);
            this.monsterHP -= attackValue;
            this.addLogMessage('player', 'attacks', attackValue);    
            this.attackPlayer();
            this.round++;
            this.limit_break++;
        },
        specialAttackMonster() {
            const attackValue = getRandomNum(8, 20);
            this.monsterHP -= attackValue;
            this.addLogMessage('player', 'attacks', attackValue);
            this.attackPlayer();
            this.special = 0;
            this.limit_break = 0;
        },        
        attackPlayer() {
            const attackValue = getRandomNum(5, 12)
            this.playerHP -= attackValue;
            this.addLogMessage('monster', 'attacks', attackValue);    
        },
        healPlayer() {
            const healValue = getRandomNum(8, 20);
            if (this.playerHP + healValue > 100) {
                this.playerHP = 100;
            } else {
                this.playerHP += healValue;
            }
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
            this.round++;         
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, action, value) {
            this.logMessages.unshift({
                who: who,
                action: action,
                value: value
            });
        }
    }
});
app.mount('#game');