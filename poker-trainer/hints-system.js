/**
 * Hints System - Professional Poker Coaching
 * Provides real-time hints and recommendations based on game state
 */

class HintsSystem {
    constructor() {
        this.evaluator = new HandEvaluator();

        this.positionAdvice = {
            'UTG': 'Early Position - Play tight! Only open with premium hands (top 10-15%). You\'ll be out of position post-flop.',
            'UTG+1': 'Early Position - Play tight. Stick to strong hands. Acting early requires caution.',
            'MP': 'Middle Position - Moderate ranges. You can open ~20% of hands, including suited connectors.',
            'CO': 'Cutoff (Late Position) - Great position! You can widen your range to ~30% of hands. Steal blinds actively.',
            'BTN': 'Button (Dealer Position) - THE BEST POSITION! You act last post-flop. Play wide (35-40% range). Steal blinds aggressively.',
            'SB': 'Small Blind - Difficult position (out of position post-flop). Defend against steals but be selective.',
            'BB': 'Big Blind - You close the action pre-flop. Defend wider against late position raises (pot odds). Out of position post-flop.'
        };
    }

    /**
     * Generate comprehensive hint for current situation
     */
    generateHint(player, gameState) {
        const { stage, communityCards, currentBet, pot, players } = gameState;
        const handStrength = this.evaluator.evaluateHandStrength(
            player.holeCards,
            communityCards
        );

        let hint = {
            position: this.getPositionHint(player.position),
            hand: this.getHandHint(player.holeCards, handStrength, stage),
            situation: this.getSituationHint(player, gameState, handStrength),
            recommendation: this.getActionRecommendation(player, gameState, handStrength),
            potOdds: this.getPotOddsHint(player, gameState),
            concept: this.getPokerConcept(stage, handStrength, gameState)
        };

        return hint;
    }

    /**
     * Position-specific advice
     */
    getPositionHint(position) {
        return {
            title: `Position: ${position}`,
            text: this.positionAdvice[position] || 'Unknown position'
        };
    }

    /**
     * Hand-specific hint
     */
    getHandHint(holeCards, handStrength, stage) {
        if (!holeCards || holeCards.length !== 2) {
            return { title: 'Hand:', text: 'No cards dealt yet' };
        }

        const [card1, card2] = holeCards;
        const cardDisplay = `${card1.rank}${card1.suit} ${card2.rank}${card2.suit}`;

        let handType = '';
        if (card1.rank === card2.rank) {
            handType = ` (Pocket Pair)`;
        } else if (card1.suit === card2.suit) {
            handType = ` (Suited)`;
        }

        return {
            title: `Hand: ${cardDisplay}${handType}`,
            text: handStrength.description,
            strength: handStrength.strength
        };
    }

    /**
     * Situational awareness hint
     */
    getSituationHint(player, gameState, handStrength) {
        const { stage, currentBet, pot, communityCards } = gameState;
        const callAmount = currentBet - player.bet;

        let text = '';

        // Board texture analysis (post-flop)
        if (communityCards.length >= 3) {
            const boardTexture = this.analyzeBoardTexture(communityCards);
            text += `\n\n📊 <strong>Board: ${this.formatCards(communityCards)}</strong>\n`;
            text += `${boardTexture}`;
        }

        // Current action
        if (callAmount > 0) {
            text += `\n\n⚠️ <strong>Facing bet:</strong> ${callAmount} chips to call into ${pot} pot.`;
        } else {
            text += `\n\n✓ <strong>No bet</strong> - You can check for free.`;
        }

        return {
            title: `Situation: ${stage}`,
            text: text
        };
    }

    /**
     * Action recommendation
     */
    getActionRecommendation(player, gameState, handStrength) {
        const { stage, currentBet, pot } = gameState;
        const callAmount = currentBet - player.bet;
        const potOdds = callAmount > 0 ? (callAmount / (pot + callAmount) * 100).toFixed(1) : 0;

        let recommendation = '';
        let actions = [];

        // Very strong hand (75+)
        if (handStrength.strength >= 75) {
            recommendation = '💪 <strong>STRONG HAND</strong> - You should be aggressive!';
            if (callAmount === 0) {
                actions.push('✓ <strong>BET/RAISE</strong> for value - make opponents pay');
                actions.push('~ <strong>CHECK</strong> - only if slowplaying (trap)');
            } else {
                actions.push('✓ <strong>RAISE</strong> - Build the pot with your strong hand');
                actions.push('✓ <strong>CALL</strong> - Keep opponents in the pot');
                actions.push('✗ <strong>FOLD</strong> - Never fold a strong hand here');
            }
        }
        // Good hand (55-75)
        else if (handStrength.strength >= 55) {
            recommendation = '👍 <strong>GOOD HAND</strong> - Proceed with confidence';
            if (callAmount === 0) {
                actions.push('✓ <strong>BET</strong> (~½ pot) - Build pot, protect hand');
                actions.push('~ <strong>CHECK</strong> - Pot control acceptable');
            } else {
                actions.push('✓ <strong>CALL</strong> - Your hand has good equity');
                if (potOdds < 25) {
                    actions.push('~ <strong>RAISE</strong> - Can raise for value/protection');
                }
            }
        }
        // Medium hand (35-55)
        else if (handStrength.strength >= 35) {
            recommendation = '⚖️ <strong>MARGINAL HAND</strong> - Proceed cautiously';
            if (callAmount === 0) {
                actions.push('✓ <strong>CHECK</strong> - See next card for free');
                actions.push('~ <strong>BET</strong> (small) - Probe bet to gather info');
            } else {
                actions.push(`~ <strong>CALL</strong> - Only if pot odds justify (need ${potOdds}% equity)`);
                actions.push('✓ <strong>FOLD</strong> - Consider folding to large bets');
            }
        }
        // Weak hand (< 35)
        else {
            recommendation = '⚠️ <strong>WEAK HAND</strong> - Be very careful';
            if (callAmount === 0) {
                actions.push('✓ <strong>CHECK</strong> - Try to see next card free');
                actions.push('~ <strong>BLUFF</strong> - Only if table conditions favor it');
            } else {
                actions.push('✓ <strong>FOLD</strong> - Recommended unless pot odds exceptional');
                actions.push('✗ <strong>CALL</strong> - Likely unprofitable');
            }
        }

        return {
            title: 'Recommended Action',
            text: recommendation + '\n\n' + actions.join('\n')
        };
    }

    /**
     * Pot odds hint
     */
    getPotOddsHint(player, gameState) {
        const { currentBet, pot } = gameState;
        const callAmount = currentBet - player.bet;

        if (callAmount === 0) {
            return {
                title: 'Pot Odds',
                text: 'No bet to call - you can check for free!'
            };
        }

        const totalPot = pot + callAmount;
        const oddsRatio = (totalPot / callAmount).toFixed(1);
        const equityNeeded = (callAmount / totalPot * 100).toFixed(1);

        let text = `You need to call <strong>${callAmount} chips</strong> to win <strong>${totalPot} chips</strong>.\n\n`;
        text += `📊 <strong>Pot Odds:</strong> ${oddsRatio}:1\n`;
        text += `📈 <strong>Equity Needed:</strong> ${equityNeeded}%\n\n`;

        text += `<em>If your hand has ${equityNeeded}% or better chance of winning, calling is mathematically profitable.</em>`;

        return {
            title: 'Pot Odds Calculator',
            text: text
        };
    }

    /**
     * Educational poker concept
     */
    getPokerConcept(stage, handStrength, gameState) {
        const concepts = [
            {
                title: 'Position Advantage',
                text: 'Acting last (having position) is powerful because you see opponents\' actions before making your decision. Late position = more information = better decisions.'
            },
            {
                title: 'Pot Odds vs Equity',
                text: 'Compare pot odds (price to call) with your hand equity (% chance to win). If equity > pot odds percentage, calling is profitable long-term.'
            },
            {
                title: 'Aggressive Play',
                text: 'Poker rewards aggression. Betting/raising gives you TWO ways to win: (1) Make opponents fold (2) Show down best hand. Calling only gives you one way.'
            },
            {
                title: 'Hand Reading',
                text: 'Consider opponent ranges based on position and actions. UTG raise usually means strength. Button raise could be wider range (stealing).'
            },
            {
                title: 'Value vs Bluff',
                text: 'Value bet when you expect opponent to call with worse hands. Bluff when opponent will fold better hands. Balanced strategy keeps opponents guessing.'
            }
        ];

        // Return random concept
        return concepts[Math.floor(Math.random() * concepts.length)];
    }

    /**
     * Analyze board texture
     */
    analyzeBoardTexture(communityCards) {
        if (communityCards.length < 3) return '';

        let analysis = '';

        // Check for flush draws
        const suits = {};
        communityCards.forEach(card => {
            suits[card.suit] = (suits[card.suit] || 0) + 1;
        });

        const maxSuitCount = Math.max(...Object.values(suits));
        if (maxSuitCount >= 3) {
            const flushSuit = Object.keys(suits).find(suit => suits[suit] === maxSuitCount);
            analysis += `<strong>🌊 Wet Board:</strong> ${maxSuitCount} cards of ${flushSuit} suit - flush draws possible!\n`;
        }

        // Check for straight possibilities
        const ranks = communityCards.map(c => this.evaluator.rankValues[c.rank]).sort((a, b) => b - a);
        const gap = Math.abs(ranks[0] - ranks[ranks.length - 1]);

        if (gap <= 4 && communityCards.length >= 3) {
            analysis += `<strong>📊 Connected Board:</strong> Straight draws likely (cards span ${gap} ranks).\n`;
        }

        // Check for pairs on board
        const rankCounts = {};
        communityCards.forEach(card => {
            rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
        });

        const pairs = Object.keys(rankCounts).filter(rank => rankCounts[rank] >= 2);
        if (pairs.length > 0) {
            analysis += `<strong>⚠️ Paired Board:</strong> Board has pair(s) - full house possibilities!\n`;
        }

        // Dry board
        if (maxSuitCount <= 2 && gap > 4 && pairs.length === 0) {
            analysis += `<strong>🏜️ Dry Board:</strong> Static board - unlikely to draw out. Made hands favored.\n`;
        }

        return analysis || 'Neutral board texture.';
    }

    /**
     * Format cards for display
     */
    formatCards(cards) {
        return cards.map(c => `${c.rank}${c.suit}`).join(' ');
    }

    /**
     * Get mistake warning (if player makes suboptimal play)
     */
    getMistakeWarning(action, player, gameState, handStrength) {
        const { currentBet, pot } = gameState;
        const callAmount = currentBet - player.bet;

        let warnings = [];

        // Folding strong hand
        if (action === 'fold' && handStrength.strength >= 70) {
            warnings.push('⚠️ Folding a strong hand is usually too tight - consider your pot odds');
        }

        // Calling without odds
        if (action === 'call' && callAmount > 0) {
            const equityNeeded = callAmount / (pot + callAmount) * 100;
            if (handStrength.strength < equityNeeded) {
                warnings.push(`⚠️ Calling without proper odds - you need ${equityNeeded.toFixed(1)}% equity but likely have ${handStrength.strength}%`);
            }
        }

        // Not betting strong hand
        if (action === 'check' && handStrength.strength >= 75 && gameState.stage !== 'PRE_FLOP') {
            warnings.push('💡 Missing value - consider betting your strong hand for value');
        }

        return warnings;
    }
}
