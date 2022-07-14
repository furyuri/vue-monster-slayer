function randomAttackGen(min, max) {
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
            // used to disable the "SPECIAL ATTACK" button
            if (this.limit_break % 3 === 0 && this.limit_break != 0) {
                this.special = true;
            }
            // if user doesn't have special available, then send 'true' value to 'disabled' attribute.
            return !this.special == true;
        }
    },
    methods: {
        attackMonster() {
            this.monsterHP -= randomAttackGen(7, 15);
            if (this.monsterHP < 0 ) {
                this.monsterHP = 0;
            }            
            this.attackPlayer();
            this.round++;
            this.limit_break++;
        },
        specialAttackMonster() {
            this.monsterHP -= randomAttackGen(8, 20);
            this.attackPlayer();
            this.special = 0;
            this.limit_break = 0;
        },        
        attackPlayer() {
            this.playerHP -= randomAttackGen(5, 12);
            if (this.playerHP < 0 ) {
                this.playerHP = 0;
            }            
        }
    }
});
app.mount('#game');