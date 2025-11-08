/**
 * Hand Evaluator - Texas Hold'em Hand Ranking System
 * Evaluates 7 cards (5 community + 2 hole cards) and returns best 5-card hand
 */

class HandEvaluator {
    constructor() {
        this.handRankings = {
            ROYAL_FLUSH: 10,
            STRAIGHT_FLUSH: 9,
            FOUR_OF_A_KIND: 8,
            FULL_HOUSE: 7,
            FLUSH: 6,
            STRAIGHT: 5,
            THREE_OF_A_KIND: 4,
            TWO_PAIR: 3,
            PAIR: 2,
            HIGH_CARD: 1
        };

        this.handNames = {
            10: 'Royal Flush',
            9: 'Straight Flush',
            8: 'Four of a Kind',
            7: 'Full House',
            6: 'Flush',
            5: 'Straight',
            4: 'Three of a Kind',
            3: 'Two Pair',
            2: 'Pair',
            1: 'High Card'
        };

        this.rankValues = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
            '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
        };
    }

    /**
     * Evaluate hand strength from 0-100
     * @param {Array} holeCards - Player's 2 cards
     * @param {Array} communityCards - 0-5 community cards
     * @returns {Object} { strength: 0-100, description: string, handRank: number }
     */
    evaluateHandStrength(holeCards, communityCards = []) {
        const allCards = [...holeCards, ...communityCards];

        if (communityCards.length === 0) {
            // Pre-flop evaluation
            return this.evaluatePreFlop(holeCards);
        }

        const handResult = this.getBestHand(allCards);
        const strength = this.calculateStrength(handResult, communityCards.length);

        return {
            strength: strength,
            description: handResult.description,
            handRank: handResult.rank,
            handName: this.handNames[handResult.rank]
        };
    }

    /**
     * Pre-flop hand evaluation
     */
    evaluatePreFlop(holeCards) {
        if (holeCards.length !== 2) {
            return { strength: 0, description: 'No cards', handRank: 0, handName: 'None' };
        }

        const [card1, card2] = holeCards;
        const rank1 = this.rankValues[card1.rank];
        const rank2 = this.rankValues[card2.rank];
        const suited = card1.suit === card2.suit;
        const pair = rank1 === rank2;

        let strength = 0;
        let description = '';

        // Pocket Pairs
        if (pair) {
            if (rank1 >= 14) { // AA
                strength = 95;
                description = 'Pocket Aces (AA) - Premium pair, strongest starting hand';
            } else if (rank1 >= 13) { // KK
                strength = 92;
                description = 'Pocket Kings (KK) - Premium pair';
            } else if (rank1 >= 12) { // QQ
                strength = 88;
                description = 'Pocket Queens (QQ) - Premium pair';
            } else if (rank1 >= 11) { // JJ
                strength = 82;
                description = 'Pocket Jacks (JJ) - Strong pair';
            } else if (rank1 >= 10) { // TT
                strength = 75;
                description = 'Pocket Tens (TT) - Good pair';
            } else if (rank1 >= 7) { // 77-99
                strength = 65;
                description = `Pocket ${card1.rank}s - Medium pair, good for set mining`;
            } else {
                strength = 50;
                description = `Pocket ${card1.rank}s - Small pair`;
            }
        }
        // High Cards
        else {
            const highRank = Math.max(rank1, rank2);
            const lowRank = Math.min(rank1, rank2);
            const gap = highRank - lowRank;

            // AK
            if (highRank === 14 && lowRank === 13) {
                strength = suited ? 90 : 85;
                description = suited ? 'A♠K♠ (Big Slick Suited) - Premium drawing hand' : 'AK (Big Slick) - Premium high cards';
            }
            // AQ, AJ
            else if (highRank === 14 && lowRank >= 11) {
                strength = suited ? 78 : 72;
                description = suited ? `A${card2.rank} suited - Strong drawing hand` : `A${card2.rank} - Strong high cards`;
            }
            // Broadway (high cards 10+)
            else if (highRank >= 11 && lowRank >= 10) {
                strength = suited ? 70 : 62;
                description = suited ? `${card1.rank}${card2.rank} suited - Broadway cards` : `${card1.rank}${card2.rank} - High cards`;
            }
            // Suited Connectors
            else if (suited && gap === 1) {
                strength = 60;
                description = `${card1.rank}${card2.rank} suited - Suited connectors, good drawing potential`;
            }
            // Ace with low kicker
            else if (highRank === 14) {
                strength = suited ? 55 : 45;
                description = suited ? `A${card2.rank} suited - Ace with weak kicker` : `A${card2.rank} - Ace with weak kicker, be cautious`;
            }
            // Connected cards
            else if (gap === 1 && lowRank >= 5) {
                strength = suited ? 52 : 42;
                description = `${card1.rank}${card2.rank} - Connectors`;
            }
            // Weak hands
            else {
                strength = suited ? 35 : 25;
                description = `${card1.rank}${card2.rank} - Weak holding, fold from early position`;
            }
        }

        return {
            strength: strength,
            description: description,
            handRank: pair ? this.handRankings.PAIR : this.handRankings.HIGH_CARD,
            handName: pair ? 'Pair' : 'High Card'
        };
    }

    /**
     * Get best 5-card hand from available cards
     */
    getBestHand(cards) {
        if (cards.length < 5) {
            return { rank: 0, description: 'Not enough cards', cards: [] };
        }

        // Check for all hand types in descending order
        let result;

        result = this.checkRoyalFlush(cards);
        if (result) return result;

        result = this.checkStraightFlush(cards);
        if (result) return result;

        result = this.checkFourOfAKind(cards);
        if (result) return result;

        result = this.checkFullHouse(cards);
        if (result) return result;

        result = this.checkFlush(cards);
        if (result) return result;

        result = this.checkStraight(cards);
        if (result) return result;

        result = this.checkThreeOfAKind(cards);
        if (result) return result;

        result = this.checkTwoPair(cards);
        if (result) return result;

        result = this.checkPair(cards);
        if (result) return result;

        return this.checkHighCard(cards);
    }

    /**
     * Calculate final strength percentage based on hand rank and board
     */
    calculateStrength(handResult, boardSize) {
        const baseStrength = {
            10: 100,  // Royal Flush
            9: 95,    // Straight Flush
            8: 90,    // Quads
            7: 85,    // Full House
            6: 75,    // Flush
            5: 70,    // Straight
            4: 60,    // Trips
            3: 50,    // Two Pair
            2: 35,    // Pair
            1: 20     // High Card
        };

        return baseStrength[handResult.rank] || 0;
    }

    // Hand checking methods
    checkRoyalFlush(cards) {
        const flushSuit = this.getFlushSuit(cards);
        if (!flushSuit) return null;

        const flushCards = cards.filter(c => c.suit === flushSuit);
        const ranks = flushCards.map(c => this.rankValues[c.rank]);
        const royalRanks = [10, 11, 12, 13, 14];

        if (royalRanks.every(rank => ranks.includes(rank))) {
            return {
                rank: this.handRankings.ROYAL_FLUSH,
                description: '🏆 Royal Flush - The nuts! (A-K-Q-J-10 suited)',
                cards: flushCards.filter(c => royalRanks.includes(this.rankValues[c.rank]))
            };
        }
        return null;
    }

    checkStraightFlush(cards) {
        const flushSuit = this.getFlushSuit(cards);
        if (!flushSuit) return null;

        const flushCards = cards.filter(c => c.suit === flushSuit);
        const straight = this.findStraight(flushCards);

        if (straight) {
            return {
                rank: this.handRankings.STRAIGHT_FLUSH,
                description: `Straight Flush (${straight.high} high)`,
                cards: straight.cards
            };
        }
        return null;
    }

    checkFourOfAKind(cards) {
        const rankCounts = this.getRankCounts(cards);

        for (let rank in rankCounts) {
            if (rankCounts[rank] === 4) {
                return {
                    rank: this.handRankings.FOUR_OF_A_KIND,
                    description: `Four of a Kind (Quad ${rank}s)`,
                    cards: cards.filter(c => c.rank === rank)
                };
            }
        }
        return null;
    }

    checkFullHouse(cards) {
        const rankCounts = this.getRankCounts(cards);
        let trips = null;
        let pair = null;

        for (let rank in rankCounts) {
            if (rankCounts[rank] === 3 && !trips) trips = rank;
            else if (rankCounts[rank] === 2 && !pair) pair = rank;
        }

        if (trips && pair) {
            return {
                rank: this.handRankings.FULL_HOUSE,
                description: `Full House (${trips}s full of ${pair}s)`,
                cards: []
            };
        }
        return null;
    }

    checkFlush(cards) {
        const flushSuit = this.getFlushSuit(cards);
        if (flushSuit) {
            const flushCards = cards.filter(c => c.suit === flushSuit);
            return {
                rank: this.handRankings.FLUSH,
                description: `Flush (${flushSuit} suit)`,
                cards: flushCards.slice(0, 5)
            };
        }
        return null;
    }

    checkStraight(cards) {
        const straight = this.findStraight(cards);
        if (straight) {
            return {
                rank: this.handRankings.STRAIGHT,
                description: `Straight (${straight.high} high)`,
                cards: straight.cards
            };
        }
        return null;
    }

    checkThreeOfAKind(cards) {
        const rankCounts = this.getRankCounts(cards);

        for (let rank in rankCounts) {
            if (rankCounts[rank] === 3) {
                return {
                    rank: this.handRankings.THREE_OF_A_KIND,
                    description: `Three of a Kind (Trip ${rank}s)`,
                    cards: cards.filter(c => c.rank === rank)
                };
            }
        }
        return null;
    }

    checkTwoPair(cards) {
        const rankCounts = this.getRankCounts(cards);
        const pairs = [];

        for (let rank in rankCounts) {
            if (rankCounts[rank] === 2) pairs.push(rank);
        }

        if (pairs.length >= 2) {
            return {
                rank: this.handRankings.TWO_PAIR,
                description: `Two Pair (${pairs[0]}s and ${pairs[1]}s)`,
                cards: []
            };
        }
        return null;
    }

    checkPair(cards) {
        const rankCounts = this.getRankCounts(cards);

        for (let rank in rankCounts) {
            if (rankCounts[rank] === 2) {
                return {
                    rank: this.handRankings.PAIR,
                    description: `Pair of ${rank}s`,
                    cards: cards.filter(c => c.rank === rank)
                };
            }
        }
        return null;
    }

    checkHighCard(cards) {
        const sorted = cards.sort((a, b) =>
            this.rankValues[b.rank] - this.rankValues[a.rank]
        );

        return {
            rank: this.handRankings.HIGH_CARD,
            description: `High Card (${sorted[0].rank} high)`,
            cards: [sorted[0]]
        };
    }

    // Helper methods
    getRankCounts(cards) {
        const counts = {};
        cards.forEach(card => {
            counts[card.rank] = (counts[card.rank] || 0) + 1;
        });
        return counts;
    }

    getFlushSuit(cards) {
        const suitCounts = {};
        cards.forEach(card => {
            suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
        });

        for (let suit in suitCounts) {
            if (suitCounts[suit] >= 5) return suit;
        }
        return null;
    }

    findStraight(cards) {
        const uniqueRanks = [...new Set(cards.map(c => this.rankValues[c.rank]))].sort((a, b) => b - a);

        // Check for wheel (A-2-3-4-5)
        if (uniqueRanks.includes(14) && uniqueRanks.includes(2) &&
            uniqueRanks.includes(3) && uniqueRanks.includes(4) && uniqueRanks.includes(5)) {
            return { high: '5', cards: [] };
        }

        // Check for regular straights
        for (let i = 0; i <= uniqueRanks.length - 5; i++) {
            if (uniqueRanks[i] - uniqueRanks[i + 4] === 4) {
                return { high: uniqueRanks[i], cards: [] };
            }
        }

        return null;
    }

    /**
     * Count outs (cards that improve your hand)
     */
    countOuts(holeCards, communityCards) {
        // Simplified outs calculation
        // TODO: Implement full outs counting logic
        return { outs: 0, description: 'Calculating outs...' };
    }
}
