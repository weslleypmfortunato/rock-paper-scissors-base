/**
 * 1. Dois jogadores jogam ao mesmo tempo
 * 2. Um jogador é uma pessoa e o outro é a CPU
 * 3. Pedra vence Tesoura
 * 4. Papel vence Pedra
 * 5. Tesoura vence Papel 
 * 6. A escolha de cada jogador deve ser armazenada
 * 7. Se os dois jogadores escolherem o mesmo item, dá empate
 * 8. A pontuação total de cada jogador deve ser armazenada
 * 9. Vence o melhor de n rounds
 */

class RockPaperScissors {
    constructor(rounds) {
        this.maxRounds = rounds
        this.playerPoints = 0
        this.cpuPoints = 0
        this.playerChoice = ''//rock, paper, scissors
        this.cpuChoice = '' //rock, paper, scissors
        this.roundWinner = null //player ou cpu
        this.roundsPlayed = 0
        this.gameWinner = '' //player ou cpu
        this.gameOver = false
        this.choices = ['rock', 'paper', 'scissors']
    }

    getCpuChoice() {
        const randomNumber = Math.floor(Math.random() * this.choices.length)

        return this.choices[randomNumber]
    }

    play(playerChoice) {
        if(!this.gameOver) {
            this.playerChoice = playerChoice
            this.cpuChoice = this.getCpuChoice()
            this.checkRoundWinner()
            this.roundsPlayed++
        }
    
        return this
    }

    checkRoundWinner() {
        if(this.playerChoice !== this.cpuChoice) {
            if(
                (this.playerChoice === 'rock' && this.cpuChoice === 'scissors') ||
                (this.playerChoice === 'paper' && this.cpuChoice === 'rock') ||
                (this.playerChoice === 'scissors' && this.cpuChoice === 'paper')
            ) {
                this.roundWinner = 'player'
                this.playerPoints++
            } else {
                this.roundWinner = 'cpu'
                this.cpuPoints++
            }
        } else {
            this.roundWinner = null
        }
    }

    checkGameOver() {
        if(this.roundsPlayed === this.maxRounds) {
            this.gameOver = true

            if(this.playerPoints > this.cpuPoints) {
                this.gameWinner = 'player'
            } else if (this.playerPoints < this.cpuPoints) {
                this.gameWinner = 'cpu'
            }
        }

        return this.gameOver
    }

    reset() {
        this.playerPoints = 0
        this.cpuPoints = 0
        this.playerChoice = ''//rock, paper, scissors
        this.cpuChoice = '' //rock, paper, scissors
        this.roundWinner = null //player ou cpu
        this.roundsPlayed = 0
        this.gameWinner = '' //player ou cpu
        this.gameOver = false
    }
}