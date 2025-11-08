/**
 * AI Player Logic
 * Implements basic poker strategy for AI opponents
 */

class AIPlayer {
    constructor(difficulty = 'beginner') {
        this.difficulty = difficulty; // beginner, intermediate, advanced
        this.evaluator = new HandEvaluator();

        // AI personality traits
        this.aggression = this.getAggressionLevel();
        this.tightness = this.getTightnessLevel();
    }

    getAggressionLevel() {
        switch (this.difficulty) {
            case 'beginner':
                return 0.3; // Passive
            case 'intermediate':
                return 0.6; // Balanced
            case 'advanced':
                return 0.8; // Aggressive
            default:
                return 0.5;
        }
    }

    getTightnessLevel() {
        switch (this.difficulty) {
            case 'beginner':
                return 0.3; // Loose (plays many hands)
            case 'intermediate':
                return 0.6; // Selective
            case 'advanced':
                return 0.8; // Tight
            default:
                return 0.5;
        }
    }

    /**
     * Decide AI action based on game state
     */
    makeDecision(player, gameState, validActions) {
        const { stage, communityCards, currentBet, pot } = gameState;
        const handStrength = this.evaluator.evaluateHandStrength(
            player.holeCards,
            communityCards
        );

        // Pre-flop decision
        if (stage === 'PRE_FLOP') {
            return this.makePreFlopDecision(player, handStrength, currentBet, pot, validActions);
        }

        // Post-flop decision
        return this.makePostFlopDecision(player, handStrength, currentBet, pot, validActions, stage);
    }

    /**
     * Pre-flop decision logic
     */
    makePreFlopDecision(player, handStrength, currentBet, pot, validActions) {
        const strengthThreshold = 50 + (this.tightness * 20);
        const callAmount = currentBet - player.bet;
        const potOdds = pot > 0 ? callAmount / (pot + callAmount) : 0;

        // Very strong hand (80+) - Usually raise or call
        if (handStrength.strength >= 80) {
            if (validActions.includes('raise') && Math.random() < this.aggression) {
                const raiseAmount = currentBet * 2 + Math.floor(Math.random() * pot * 0.3);
                return { action: 'raise', amount: raiseAmount };
            }
            if (validActions.includes('call')) {
                return { action: 'call' };
            }
            if (validActions.includes('check')) {
                return { action: 'check' };
            }
        }

        // Strong hand (60-80) - Usually call, sometimes raise
        if (handStrength.strength >= 60) {
            if (validActions.includes('raise') && Math.random() < this.aggression * 0.5) {
                const raiseAmount = currentBet * 2;
                return { action: 'raise', amount: raiseAmount };
            }
            if (validActions.includes('call')) {
                return { action: 'call' };
            }
            if (validActions.includes('check')) {
                return { action: 'check' };
            }
        }

        // Medium hand (40-60) - Call if odds are good
        if (handStrength.strength >= 40) {
            if (validActions.includes('check')) {
                return { action: 'check' };
            }
            if (validActions.includes('call') && potOdds < 0.3) {
                return { action: 'call' };
            }
        }

        // Weak hand - Usually fold unless can check
        if (validActions.includes('check')) {
            return { action: 'check' };
        }

        // Bluff occasionally (based on aggression)
        if (Math.random() < this.aggression * 0.2 && validActions.includes('raise')) {
            const raiseAmount = currentBet * 2;
            return { action: 'raise', amount: raiseAmount };
        }

        return { action: 'fold' };
    }

    /**
     * Post-flop decision logic
     */
    makePostFlopDecision(player, handStrength, currentBet, pot, validActions, stage) {
        const callAmount = currentBet - player.bet;
        const potOdds = pot > 0 ? callAmount / (pot + callAmount) : 0;
        const equityNeeded = potOdds;

        // Very strong hand (75+) - Bet or raise
        if (handStrength.strength >= 75) {
            if (validActions.includes('raise') && Math.random() < this.aggression * 0.8) {
                const raiseAmount = Math.floor(pot * (0.5 + Math.random() * 0.5));
                return { action: 'raise', amount: currentBet + raiseAmount };
            }
            if (validActions.includes('call')) {
                return { action: 'call' };
            }
            if (validActions.includes('check')) {
                // Slow play sometimes
                if (Math.random() < 0.3) {
                    return { action: 'check' };
                }
            }
        }

        // Good hand (55-75) - Value bet or call
        if (handStrength.strength >= 55) {
            if (validActions.includes('raise') && currentBet === 0 && Math.random() < this.aggression) {
                const raiseAmount = Math.floor(pot * 0.5);
                return { action: 'raise', amount: raiseAmount };
            }
            if (validActions.includes('call') && potOdds < 0.4) {
                return { action: 'call' };
            }
            if (validActions.includes('check')) {
                return { action: 'check' };
            }
        }

        // Medium hand (35-55) - Careful play
        if (handStrength.strength >= 35) {
            if (validActions.includes('check')) {
                return { action: 'check' };
            }
            // Call if pot odds are very good
            if (validActions.includes('call') && potOdds < 0.25) {
                return { action: 'call' };
            }
        }

        // Weak hand - Usually check or fold
        if (validActions.includes('check')) {
            return { action: 'check' };
        }

        // Bluff on river occasionally
        if (stage === 'RIVER' && Math.random() < this.aggression * 0.15 && validActions.includes('raise')) {
            const raiseAmount = Math.floor(pot * 0.6);
            return { action: 'raise', amount: raiseAmount };
        }

        return { action: 'fold' };
    }

    /**
     * Simple hand range check for position
     */
    shouldPlayPreFlop(holeCards, position) {
        const handStrength = this.evaluator.evaluatePreFlop(holeCards);

        // Tight ranges
        const positionThresholds = {
            'UTG': 70,
            'UTG+1': 65,
            'MP': 60,
            'CO': 50,
            'BTN': 40,
            'SB': 45,
            'BB': 35
        };

        const threshold = positionThresholds[position] || 50;
        return handStrength.strength >= threshold;
    }
}
