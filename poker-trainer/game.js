/**
 * Main Game Controller
 * Connects UI with game engine, handles user interactions
 */

class PokerGame {
    constructor() {
        this.engine = new PokerEngine();
        this.hintsSystem = new HintsSystem();
        this.aiPlayers = {};

        this.engine.initializeGame(6, 1000);

        // Create AI players with different difficulties
        this.engine.players.forEach((player, index) => {
            if (player.isAI) {
                const difficulty = index < 2 ? 'beginner' : index < 4 ? 'intermediate' : 'advanced';
                this.aiPlayers[player.id] = new AIPlayer(difficulty);
            }
        });

        this.initializeUI();
        this.startNewHand();
    }

    initializeUI() {
        // Action buttons
        document.getElementById('btnFold').addEventListener('click', () => this.playerAction('fold'));
        document.getElementById('btnCheck').addEventListener('click', () => this.playerAction('check'));
        document.getElementById('btnCall').addEventListener('click', () => this.playerAction('call'));
        document.getElementById('btnRaise').addEventListener('click', () => this.showBetSizing());
        document.getElementById('btnAllIn').addEventListener('click', () => this.playerAction('all-in'));

        // Bet sizing
        document.getElementById('btnConfirmBet').addEventListener('click', () => this.confirmRaise());

        const betSlider = document.getElementById('betSlider');
        betSlider.addEventListener('input', (e) => this.updateBetAmount(e.target.value));

        // Sizing buttons
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.quickSizeSelect(e.target.dataset.size));
        });

        // Game controls
        document.getElementById('btnNewHand').addEventListener('click', () => this.startNewHand());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    startNewHand() {
        this.engine.startNewHand();
        this.updateUI();
        this.logAction('New hand started. Blinds posted.');

        // If AI player is first to act, process AI actions
        setTimeout(() => this.processAIActions(), 1000);
    }

    playerAction(action) {
        const playerIndex = this.engine.players.length - 1; // Human player is last
        const player = this.engine.players[playerIndex];

        let result;

        switch (action) {
            case 'fold':
                result = this.engine.fold(playerIndex);
                this.logAction(`You folded.`);
                break;
            case 'check':
                result = this.engine.check(playerIndex);
                if (!result.success) {
                    this.showError(result.message);
                    return;
                }
                this.logAction(`You checked.`);
                break;
            case 'call':
                result = this.engine.call(playerIndex);
                this.logAction(`You called ${this.engine.currentBet - player.bet}.`);
                break;
            case 'all-in':
                result = this.engine.allIn(playerIndex);
                this.logAction(`You went ALL-IN for ${player.stack}!`);
                break;
        }

        this.updateUI();

        if (result && result.success) {
            // Check for hand end or stage advancement
            if (result.stage === 'SHOWDOWN') {
                this.handleShowdown(result);
            } else {
                setTimeout(() => this.processAIActions(), 800);
            }
        }
    }

    showBetSizing() {
        document.getElementById('betSizing').style.display = 'block';
        const pot = this.engine.pot;
        const currentBet = this.engine.currentBet;

        // Set slider max to player stack
        const player = this.engine.players[this.engine.players.length - 1];
        const betSlider = document.getElementById('betSlider');
        betSlider.max = player.stack;
        betSlider.value = Math.min(currentBet * 2, player.stack);
        this.updateBetAmount(betSlider.value);
    }

    updateBetAmount(amount) {
        document.getElementById('betAmount').textContent = amount;
        const bb = Math.floor(amount / this.engine.bigBlind);
        document.getElementById('betBB').textContent = `(${bb} BB)`;
    }

    quickSizeSelect(size) {
        const pot = this.engine.pot;
        const currentBet = this.engine.currentBet;
        let amount;

        if (size === 'min') {
            amount = currentBet * 2;
        } else {
            amount = currentBet + Math.floor(pot * parseFloat(size));
        }

        const player = this.engine.players[this.engine.players.length - 1];
        amount = Math.min(amount, player.stack);

        const betSlider = document.getElementById('betSlider');
        betSlider.value = amount;
        this.updateBetAmount(amount);

        // Highlight selected button
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    confirmRaise() {
        const amount = parseInt(document.getElementById('betSlider').value);
        const playerIndex = this.engine.players.length - 1;

        const result = this.engine.raise(playerIndex, amount);

        if (!result.success) {
            this.showError(result.message);
            return;
        }

        this.logAction(`You raised to ${amount}.`);
        document.getElementById('betSizing').style.display = 'none';
        this.updateUI();

        setTimeout(() => this.processAIActions(), 800);
    }

    processAIActions() {
        const currentPlayer = this.engine.players[this.engine.currentPlayerIndex];

        if (!currentPlayer || currentPlayer.folded || !currentPlayer.isAI) {
            return;
        }

        const validActions = this.engine.getValidActions(this.engine.currentPlayerIndex);
        const gameState = this.engine.getGameState();

        const aiPlayer = this.aiPlayers[currentPlayer.id];
        const decision = aiPlayer.makeDecision(currentPlayer, gameState, validActions);

        // Execute AI decision
        let result;
        switch (decision.action) {
            case 'fold':
                result = this.engine.fold(this.engine.currentPlayerIndex);
                this.logAction(`${currentPlayer.name} folds.`);
                break;
            case 'check':
                result = this.engine.check(this.engine.currentPlayerIndex);
                this.logAction(`${currentPlayer.name} checks.`);
                break;
            case 'call':
                result = this.engine.call(this.engine.currentPlayerIndex);
                this.logAction(`${currentPlayer.name} calls ${this.engine.currentBet - currentPlayer.bet}.`);
                break;
            case 'raise':
                result = this.engine.raise(this.engine.currentPlayerIndex, decision.amount);
                this.logAction(`${currentPlayer.name} raises to ${decision.amount}.`);
                break;
            case 'all-in':
                result = this.engine.allIn(this.engine.currentPlayerIndex);
                this.logAction(`${currentPlayer.name} goes ALL-IN!`);
                break;
        }

        this.updateUI();

        if (result.success) {
            if (result.stage === 'SHOWDOWN') {
                this.handleShowdown(result);
            } else if (result.stage !== gameState.stage) {
                // Stage changed (flop, turn, river)
                this.logAction(`--- ${result.stage} ---`);
                setTimeout(() => this.processAIActions(), 1200);
            } else {
                // Next player's turn
                setTimeout(() => this.processAIActions(), 800);
            }
        }
    }

    handleShowdown(result) {
        this.logAction(`${result.winner} wins ${result.pot} chips with ${result.winnerHand}!`);

        // Show all remaining players' cards
        setTimeout(() => {
            alert(`${result.winner} wins!\n\n${result.winnerHand}\n\nPot: ${result.pot} chips`);
        }, 1000);
    }

    updateUI() {
        const gameState = this.engine.getGameState();
        const player = this.engine.players[this.engine.players.length - 1];

        // Update pot
        document.getElementById('potAmount').textContent = gameState.pot;
        document.getElementById('potBB').textContent = `(${Math.floor(gameState.pot / this.engine.bigBlind)} BB)`;

        // Update community cards
        this.updateCommunityCards(gameState.communityCards);

        // Update player info
        document.getElementById('playerStack').textContent = `${player.stack} chips`;
        document.getElementById('playerPosition').textContent = player.position;

        // Update player cards
        this.updatePlayerCards(player.holeCards);

        // Update opponents
        this.updateOpponents();

        // Update action buttons
        this.updateActionButtons();

        // Update hints
        this.updateHints(player, gameState);

        // Update pot odds calculator
        this.updatePotOdds(player, gameState);
    }

    updateCommunityCards(cards) {
        const container = document.getElementById('communityCards');
        container.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';

            if (cards[i]) {
                const suit = cards[i].suit;
                const suitClass = (suit === '♥' || suit === '♦') ? 'hearts' : 'spades';
                cardDiv.innerHTML = `${cards[i].rank}<span class="suit ${suitClass}">${suit}</span>`;
            } else {
                cardDiv.classList.add('card-back');
                cardDiv.textContent = '?';
            }

            container.appendChild(cardDiv);
        }
    }

    updatePlayerCards(cards) {
        const container = document.getElementById('playerCards');
        container.innerHTML = '';

        cards.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            const suit = card.suit;
            const suitClass = (suit === '♥' || suit === '♦') ? 'hearts' : 'spades';
            cardDiv.innerHTML = `${card.rank}<span class="suit ${suitClass}">${suit}</span>`;
            container.appendChild(cardDiv);
        });
    }

    updateOpponents() {
        const container = document.getElementById('opponents');
        container.innerHTML = '';

        const opponents = this.engine.players.slice(0, -1); // All except human player

        opponents.forEach(opponent => {
            const oppDiv = document.createElement('div');
            oppDiv.className = 'opponent';

            oppDiv.innerHTML = `
                <div class="opponent-name">${opponent.name} <span class="position-badge">${opponent.position}</span></div>
                <div class="opponent-stack">${opponent.stack} chips</div>
                <div class="opponent-cards">
                    <div class="card card-back">?</div>
                    <div class="card card-back">?</div>
                </div>
                ${opponent.folded ? '<div style="color: #f44336;">FOLDED</div>' : ''}
            `;

            container.appendChild(oppDiv);
        });
    }

    updateActionButtons() {
        const playerIndex = this.engine.players.length - 1;
        const validActions = this.engine.getValidActions(playerIndex);
        const player = this.engine.players[playerIndex];
        const callAmount = this.engine.currentBet - player.bet;

        // Enable/disable buttons
        document.getElementById('btnFold').disabled = !validActions.includes('fold');
        document.getElementById('btnCheck').style.display = validActions.includes('check') ? 'flex' : 'none';
        document.getElementById('btnCall').style.display = validActions.includes('call') ? 'flex' : 'none';
        document.getElementById('btnRaise').disabled = !validActions.includes('raise');
        document.getElementById('btnAllIn').disabled = !validActions.includes('all-in');

        // Update call amount
        if (validActions.includes('call')) {
            document.getElementById('callAmount').textContent = callAmount;
        }
    }

    updateHints(player, gameState) {
        const hints = this.hintsSystem.generateHint(player, gameState);
        const hintContent = document.getElementById('hintContent');

        let html = '';

        // Position
        html += `<p><strong>${hints.position.title}:</strong> ${hints.position.text}</p>`;

        // Hand
        html += `<p><strong>${hints.hand.title}:</strong> ${hints.hand.description}</p>`;

        // Hand strength meter
        const strength = hints.hand.strength || 0;
        document.getElementById('strengthBar').style.width = `${strength}%`;
        document.getElementById('strengthText').textContent = `${strength}% - ${hints.hand.strength >= 70 ? 'Strong' : hints.hand.strength >= 50 ? 'Good' : hints.hand.strength >= 35 ? 'Marginal' : 'Weak'}`;

        // Situation
        html += `<p><strong>${hints.situation.title}:</strong> ${hints.situation.text}</p>`;

        // Recommendation
        html += `<p>${hints.recommendation.text}</p>`;

        // Concept
        html += `<p><br><strong>💡 Poker Concept: ${hints.concept.title}</strong><br><em>${hints.concept.text}</em></p>`;

        hintContent.innerHTML = html;
    }

    updatePotOdds(player, gameState) {
        const callAmount = gameState.currentBet - player.bet;
        const potOdds = this.engine.calculatePotOdds(callAmount);

        document.getElementById('oddsCalcPot').textContent = `${potOdds.potSize} chips`;
        document.getElementById('oddsCalcBet').textContent = `${potOdds.betToCall} chips`;
        document.getElementById('oddsCalcRatio').textContent = potOdds.ratio;
        document.getElementById('oddsCalcEquity').textContent = `${potOdds.percentage}%`;
    }

    logAction(message) {
        const log = document.getElementById('historyLog');
        const item = document.createElement('div');
        item.className = 'history-item';
        item.textContent = message;
        log.appendChild(item);
        log.scrollTop = log.scrollHeight;
    }

    showError(message) {
        alert(message);
    }

    handleKeyboard(e) {
        const key = e.key.toLowerCase();

        if (document.getElementById('betSizing').style.display === 'block') {
            return; // Don't handle shortcuts when bet sizing is open
        }

        switch (key) {
            case 'f':
                if (!document.getElementById('btnFold').disabled) {
                    this.playerAction('fold');
                }
                break;
            case 'c':
                if (document.getElementById('btnCheck').style.display !== 'none') {
                    this.playerAction('check');
                } else if (document.getElementById('btnCall').style.display !== 'none') {
                    this.playerAction('call');
                }
                break;
            case 'r':
                if (!document.getElementById('btnRaise').disabled) {
                    this.showBetSizing();
                }
                break;
            case 'a':
                if (!document.getElementById('btnAllIn').disabled) {
                    this.playerAction('all-in');
                }
                break;
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.pokerGame = new PokerGame();
    console.log('🎮 Texas Hold\'em Poker Trainer loaded!');
    console.log('Use keyboard shortcuts: F=Fold, C=Call/Check, R=Raise, A=All-In');
});
