/**
 * Poker Engine - Texas Hold'em Game Logic
 * Manages game state, betting rounds, and player actions
 */

class PokerEngine {
    constructor() {
        this.deck = [];
        this.communityCards = [];
        this.pot = 0;
        this.currentBet = 0;
        this.smallBlind = 10;
        this.bigBlind = 20;
        this.dealerPosition = 0;
        this.currentPlayerIndex = 0;
        this.gameStage = 'PRE_FLOP'; // PRE_FLOP, FLOP, TURN, RIVER, SHOWDOWN
        this.players = [];

        this.suits = ['♠', '♥', '♦', '♣'];
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.positions = ['UTG', 'UTG+1', 'MP', 'CO', 'BTN', 'SB', 'BB'];
    }

    /**
     * Initialize a new game with players
     */
    initializeGame(numPlayers = 6, startingStack = 1000) {
        this.players = [];

        // Create AI players
        for (let i = 0; i < numPlayers - 1; i++) {
            this.players.push({
                id: i,
                name: `Player ${i + 1}`,
                stack: startingStack,
                holeCards: [],
                bet: 0,
                folded: false,
                isAI: true,
                position: this.positions[i]
            });
        }

        // Add human player
        this.players.push({
            id: numPlayers - 1,
            name: 'You',
            stack: startingStack,
            holeCards: [],
            bet: 0,
            folded: false,
            isAI: false,
            position: this.positions[numPlayers - 1]
        });

        this.dealerPosition = 0;
    }

    /**
     * Start a new hand
     */
    startNewHand() {
        // Reset game state
        this.deck = this.createDeck();
        this.shuffleDeck();
        this.communityCards = [];
        this.pot = 0;
        this.currentBet = this.bigBlind;
        this.gameStage = 'PRE_FLOP';

        // Reset players
        this.players.forEach(player => {
            player.holeCards = [];
            player.bet = 0;
            player.folded = false;
        });

        // Post blinds
        this.postBlinds();

        // Deal hole cards
        this.dealHoleCards();

        // Set first player to act (after big blind)
        this.currentPlayerIndex = (this.dealerPosition + 3) % this.players.length;

        return {
            stage: this.gameStage,
            pot: this.pot,
            currentBet: this.currentBet,
            communityCards: this.communityCards
        };
    }

    /**
     * Create a standard 52-card deck
     */
    createDeck() {
        const deck = [];
        for (let suit of this.suits) {
            for (let rank of this.ranks) {
                deck.push({ rank, suit });
            }
        }
        return deck;
    }

    /**
     * Shuffle the deck using Fisher-Yates algorithm
     */
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    /**
     * Deal hole cards to all players
     */
    dealHoleCards() {
        this.players.forEach(player => {
            if (!player.folded) {
                player.holeCards = [this.deck.pop(), this.deck.pop()];
            }
        });
    }

    /**
     * Post small and big blinds
     */
    postBlinds() {
        const sbIndex = (this.dealerPosition + 1) % this.players.length;
        const bbIndex = (this.dealerPosition + 2) % this.players.length;

        this.players[sbIndex].bet = this.smallBlind;
        this.players[sbIndex].stack -= this.smallBlind;
        this.pot += this.smallBlind;

        this.players[bbIndex].bet = this.bigBlind;
        this.players[bbIndex].stack -= this.bigBlind;
        this.pot += this.bigBlind;
    }

    /**
     * Deal the flop (3 community cards)
     */
    dealFlop() {
        this.deck.pop(); // Burn card
        this.communityCards.push(this.deck.pop());
        this.communityCards.push(this.deck.pop());
        this.communityCards.push(this.deck.pop());
        this.gameStage = 'FLOP';
        this.currentBet = 0;
        this.resetPlayerBets();
    }

    /**
     * Deal the turn (4th community card)
     */
    dealTurn() {
        this.deck.pop(); // Burn card
        this.communityCards.push(this.deck.pop());
        this.gameStage = 'TURN';
        this.currentBet = 0;
        this.resetPlayerBets();
    }

    /**
     * Deal the river (5th community card)
     */
    dealRiver() {
        this.deck.pop(); // Burn card
        this.communityCards.push(this.deck.pop());
        this.gameStage = 'RIVER';
        this.currentBet = 0;
        this.resetPlayerBets();
    }

    /**
     * Reset all player bets for new betting round
     */
    resetPlayerBets() {
        this.players.forEach(player => {
            player.bet = 0;
        });
    }

    /**
     * Player action: Fold
     */
    fold(playerIndex) {
        this.players[playerIndex].folded = true;
        return this.moveToNextPlayer();
    }

    /**
     * Player action: Check
     */
    check(playerIndex) {
        if (this.currentBet > this.players[playerIndex].bet) {
            return { success: false, message: 'Cannot check, there is a bet to call' };
        }
        return this.moveToNextPlayer();
    }

    /**
     * Player action: Call
     */
    call(playerIndex) {
        const player = this.players[playerIndex];
        const callAmount = this.currentBet - player.bet;

        if (callAmount > player.stack) {
            // All-in
            this.pot += player.stack;
            player.bet += player.stack;
            player.stack = 0;
        } else {
            player.stack -= callAmount;
            player.bet += callAmount;
            this.pot += callAmount;
        }

        return this.moveToNextPlayer();
    }

    /**
     * Player action: Raise
     */
    raise(playerIndex, amount) {
        const player = this.players[playerIndex];
        const minRaise = this.currentBet * 2;

        if (amount < minRaise) {
            return { success: false, message: `Minimum raise is ${minRaise}` };
        }

        if (amount > player.stack) {
            return { success: false, message: 'Not enough chips' };
        }

        const totalBet = amount;
        const addToPot = totalBet - player.bet;

        player.stack -= addToPot;
        player.bet = totalBet;
        this.pot += addToPot;
        this.currentBet = totalBet;

        return this.moveToNextPlayer();
    }

    /**
     * Player action: All-In
     */
    allIn(playerIndex) {
        const player = this.players[playerIndex];
        this.pot += player.stack;
        player.bet += player.stack;

        if (player.bet > this.currentBet) {
            this.currentBet = player.bet;
        }

        player.stack = 0;
        return this.moveToNextPlayer();
    }

    /**
     * Move to next active player
     */
    moveToNextPlayer() {
        // Find next player who hasn't folded
        let nextPlayer = (this.currentPlayerIndex + 1) % this.players.length;
        let attempts = 0;

        while (this.players[nextPlayer].folded && attempts < this.players.length) {
            nextPlayer = (nextPlayer + 1) % this.players.length;
            attempts++;
        }

        // Check if betting round is complete
        if (this.isBettingRoundComplete()) {
            return this.advanceStage();
        }

        this.currentPlayerIndex = nextPlayer;

        return {
            success: true,
            nextPlayer: nextPlayer,
            stage: this.gameStage,
            pot: this.pot
        };
    }

    /**
     * Check if current betting round is complete
     */
    isBettingRoundComplete() {
        const activePlayers = this.players.filter(p => !p.folded);

        if (activePlayers.length === 1) {
            return true; // Only one player left
        }

        // Check if all active players have matched the current bet
        return activePlayers.every(p => p.bet === this.currentBet || p.stack === 0);
    }

    /**
     * Advance to next game stage
     */
    advanceStage() {
        const activePlayers = this.players.filter(p => !p.folded);

        if (activePlayers.length === 1) {
            return this.endHand(activePlayers[0]);
        }

        switch (this.gameStage) {
            case 'PRE_FLOP':
                this.dealFlop();
                break;
            case 'FLOP':
                this.dealTurn();
                break;
            case 'TURN':
                this.dealRiver();
                break;
            case 'RIVER':
                return this.showdown();
        }

        // Start new betting round from first active player after dealer
        this.currentPlayerIndex = (this.dealerPosition + 1) % this.players.length;
        while (this.players[this.currentPlayerIndex].folded) {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        }

        return {
            success: true,
            stage: this.gameStage,
            communityCards: this.communityCards,
            pot: this.pot
        };
    }

    /**
     * Showdown - determine winner
     */
    showdown() {
        const evaluator = new HandEvaluator();
        const activePlayers = this.players.filter(p => !p.folded);

        let bestHand = null;
        let winner = null;

        activePlayers.forEach(player => {
            const handStrength = evaluator.evaluateHandStrength(
                player.holeCards,
                this.communityCards
            );

            if (!bestHand || handStrength.handRank > bestHand.handRank) {
                bestHand = handStrength;
                winner = player;
            }
        });

        return this.endHand(winner, bestHand);
    }

    /**
     * End hand and award pot
     */
    endHand(winner, bestHand = null) {
        winner.stack += this.pot;

        return {
            success: true,
            stage: 'SHOWDOWN',
            winner: winner.name,
            winnerHand: bestHand ? bestHand.description : 'Everyone folded',
            pot: this.pot,
            communityCards: this.communityCards
        };
    }

    /**
     * Get current game state
     */
    getGameState() {
        return {
            stage: this.gameStage,
            pot: this.pot,
            currentBet: this.currentBet,
            communityCards: this.communityCards,
            players: this.players,
            currentPlayer: this.currentPlayerIndex,
            dealerPosition: this.dealerPosition
        };
    }

    /**
     * Get valid actions for current player
     */
    getValidActions(playerIndex) {
        const player = this.players[playerIndex];
        const actions = [];

        if (player.folded) {
            return actions;
        }

        // Can always fold (unless all-in)
        if (player.stack > 0) {
            actions.push('fold');
        }

        // Check if can check
        if (this.currentBet === player.bet) {
            actions.push('check');
        } else {
            // Must call
            actions.push('call');
        }

        // Can raise if has chips
        if (player.stack > this.currentBet - player.bet) {
            actions.push('raise');
        }

        // Can always go all-in
        if (player.stack > 0) {
            actions.push('all-in');
        }

        return actions;
    }

    /**
     * Calculate pot odds for current bet
     */
    calculatePotOdds(betToCall) {
        if (betToCall === 0) return { ratio: '-', percentage: 0 };

        const totalPot = this.pot + betToCall;
        const ratio = totalPot / betToCall;
        const percentage = (betToCall / totalPot * 100).toFixed(1);

        return {
            ratio: `${ratio.toFixed(1)}:1`,
            percentage: percentage,
            potSize: this.pot,
            betToCall: betToCall
        };
    }
}
