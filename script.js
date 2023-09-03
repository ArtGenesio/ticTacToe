window.onload = function() {
    app.init()
}

class App {
    winningStyles = [
        [0,1,2],[3,4,5],[6,7,8],//wiersze wygrane
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]
    currentPlayer = "X"

    init() {
        document.querySelectorAll(".cell").forEach(
            cell => cell.addEventListener('click', this.cellClick)
        )

        document.getElementById("restartGame").addEventListener("click",()=> this.restartGame())
    }

    initGame() {
        this.currentPlayer = "X"
        document.querySelectorAll(".cell").forEach(el => {el.innerHTML = ""})
    }

    cellClick = (e) => {
        this.playerTurn(e.target)
    }

    playerTurn(el) {
        if(el.innerHTML == "X" || el.innerHTML == "O") return
        el.innerHTML = this.currentPlayer
        this.currentPlayer = this.currentPlayer == "X" ? "O" : "X"
        this.checkWinner()
    }

    checkWinner () {
        for(let i = 0;i<this.winningStyles.length;i++) {
            const style = this.winningStyles[i]
            const a = this.getCellValue(style[0])
            const b = this.getCellValue(style[1])
            const c = this.getCellValue(style[2])
            if(a == "" || b == "" || c == "") continue
            if(a==b && b==c) {
                this.setWinner(` - zwyciężył: ${a}!`)
                this.restartGame()
            }
        }
    }

    setWinner(str) {
        document.getElementById("winner").innerHTML = str
    }

    getCellValue(index) {
        return document.querySelector(`.cell[dataIndex='${index}']`).innerHTML
    }

    restartGame() {
        this.initGame()
    }
}

const app = new App()