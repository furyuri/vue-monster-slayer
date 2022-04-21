const app = Vue.createApp({
    data() {
        return {
            monsterMaxHP: 150,
            monsterHP: 150,
            playerHP: 100
        };
    },
    computed: {
        monsterBarStyles() {
            return {
                width: (this.monsterHP / this.monsterMaxHP * 100) + "%"
            }
        }
    },
    methods: {
        attackMonster() {
            this.monsterHP -= 5;
        }
    }
});
app.mount('#game');