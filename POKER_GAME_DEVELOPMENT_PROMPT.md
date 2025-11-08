# Texas Hold'em Poker Trainer - Development Specification

## Project Overview
Develop an interactive Texas Hold'em poker training application designed for beginners, featuring real-time coaching, strategic hints, and professional poker terminology to accelerate learning and proper gameplay understanding.

## Core Gameplay Requirements

### 1. Game Variant
- **Primary Focus**: No-Limit Texas Hold'em (NLHE)
- **Table Size**: 6-max (6 players) initially, expandable to full ring (9 players)
- **Betting Structure**: No-Limit with adjustable blinds

### 2. Game Flow & Betting Rounds

#### Pre-Flop
- Automated dealing of hole cards (pocket cards)
- Clear indication of:
  - Button position (dealer button)
  - Small blind (SB)
  - Big blind (BB)
  - Under the gun (UTG) and relative positions
- Action sequence: UTG to button, proper betting order

#### Post-Flop Streets
- **Flop**: Three community cards
- **Turn**: Fourth community card (4th street)
- **River**: Fifth community card (5th street)
- Betting action: SB to button for each street

### 3. Player Actions & Terminology

#### Standard Actions
- **Fold**: Discard hand and forfeit current pot
- **Check**: Pass action without betting (when no bet is pending)
- **Call**: Match the current bet amount
- **Bet**: Initiate action with chips (when no bet exists)
- **Raise**: Increase the current bet
  - Minimum raise: 2x the previous bet/raise
  - Display pot odds when facing a bet
- **All-In**: Commit entire remaining stack

#### Advanced Actions (Phase 2)
- **3-Bet**: Re-raise after an initial raise
- **4-Bet**: Re-raise after a 3-bet
- **Squeeze**: 3-bet after a raise and call(s)
- **Check-Raise**: Check, then raise after opponent bets

## Beginner Assistance Features

### 1. Real-Time Hand Strength Indicator
- **Display**: Visual meter showing hand strength (Weak/Marginal/Strong/Very Strong)
- **Categories**:
  - Made Hands: Pair, Two Pair, Set/Trips, Straight, Flush, Full House, Quads, Straight Flush
  - Drawing Hands: Flush Draw (FD), Open-Ended Straight Draw (OESD), Gutshot, Combo Draws
  - High Cards: Overcards, Ace-high, etc.

### 2. Position-Based Guidance
- **Visual Indicators**:
  - Early Position (EP): UTG, UTG+1 - Tight ranges recommended
  - Middle Position (MP): MP1, MP2 - Moderate ranges
  - Late Position (LP): Cutoff (CO), Button (BTN) - Wide ranges
  - Blinds: SB, BB - Defensive/steal awareness

- **Position Coaching**:
  - "You're in early position - play premium hands only"
  - "Button position - you can widen your range here"
  - "You're out of position post-flop - proceed cautiously"

### 3. Action Recommendations

#### Pre-Flop Hints
- Starting hand charts based on position
- Examples:
  - "Premium pair (AA, KK, QQ) - Strong raise recommended"
  - "Suited connectors (e.g., 9♠8♠) - Consider calling from late position"
  - "Weak holdings (e.g., 7♣2♦) - Fold from early position"

#### Post-Flop Guidance
- **Board Texture Analysis**:
  - Dry board: "K♠ 7♥ 2♦ - Static, unlikely to draw out"
  - Wet board: "J♠ 10♠ 8♥ - Dynamic, many drawing possibilities"
  - Monotone: "Three cards same suit - flush possibilities"
  - Paired board: "Q♠ Q♦ 5♣ - Full house potential"

- **Situational Hints**:
  - "You flopped top pair, good kicker - value bet recommended"
  - "You have a flush draw (9 outs) - continuation likely profitable"
  - "Board paired the turn - opponent may have improved to trips"

### 4. Pot Odds & Equity Calculator
- **Real-Time Display**:
  - Current pot size
  - Bet to call
  - Pot odds (e.g., "3:1 - Need 25% equity to call profitably")
  - Estimated hand equity vs. likely opponent ranges

- **Educational Tooltips**:
  - "You're getting 2:1 pot odds, but your flush draw has ~36% equity - marginally profitable call"
  - "Implied odds factor: If you hit, you may win more on later streets"

### 5. Range Visualization (Optional Advanced Feature)
- Display estimated opponent hand ranges based on:
  - Position they raised from
  - Betting patterns
  - Board texture
- Color-coded grid showing likely holdings

## Educational Overlays

### 1. Terminology Tooltips
- Hover/tap any term for instant definition:
  - "Showdown: Final revelation of hands to determine winner"
  - "Nuts: The absolute best possible hand given board cards"
  - "Draw: A hand needing improvement to win"
  - "Value Bet: Betting with expectation opponent calls with worse"
  - "Bluff: Betting without a strong hand to induce folds"

### 2. Mistake Recognition
- Gentle warnings for suboptimal plays:
  - "Folding top pair here is usually too tight - consider the pot odds"
  - "Calling without proper odds - you need 30% equity but likely have ~20%"
  - "3-betting light from early position is risky against unknown opponents"

### 3. Post-Hand Review
- **Summary After Each Hand**:
  - Key decision points highlighted
  - Evaluation: "Good fold - opponent had you dominated with AK vs your AJ"
  - Alternative lines: "You could have check-raised the turn to charge flush draws"
  - Win/Loss tracking with reasoning

### 4. Practice Scenarios
- **Situation Trainer Mode**:
  - "You're on the button with A♠K♠, facing a UTG raise - what's your play?"
  - "You flopped middle pair on a wet board and face a large bet - analyze your options"
  - Explain correct play with professional reasoning

## AI Opponent Intelligence

### 1. Adaptive Difficulty Levels
- **Beginner Bots**: Predictable, passive, basic mistakes
- **Intermediate Bots**: Positionally aware, mixed aggression
- **Advanced Bots**: GTO-influenced, balanced ranges, exploitative adjustments

### 2. Opponent Tendencies Display
- **Stats Tracking (HUD-style)**:
  - VPIP: Voluntarily Put $ In Pot (%)
  - PFR: Pre-Flop Raise (%)
  - 3-Bet %
  - Aggression Factor
  - Showdown tendencies

- **Player Type Labels**:
  - "Tight-Aggressive (TAG)" - Solid, selective player
  - "Loose-Passive (Calling Station)" - Calls too much, rarely raises
  - "Loose-Aggressive (LAG)" - Wide ranges, high aggression
  - "Tight-Passive (Rock/Nit)" - Very selective, passive betting

## User Interface Requirements

### 1. Clear Visual Hierarchy
- **Card Display**: Large, readable cards with suits clearly visible
- **Pot Counter**: Prominent display of current pot size in big blinds (bb)
- **Stack Sizes**: Each player's chip count visible
- **Action History**: Scrollable log of all actions current hand

### 2. Interactive Controls
- **Slider for Bet Sizing**:
  - Quick buttons: Min, 1/3 Pot, 1/2 Pot, 2/3 Pot, Pot, 2x Pot, All-In
  - Custom amount entry
  - Display as both chips and big blinds

- **Action Buttons**:
  - Context-sensitive (only show valid actions)
  - Keyboard shortcuts (F=Fold, C=Call/Check, R=Raise, etc.)

### 3. Professional Aesthetics
- **Poker Table**: Traditional felt green or customizable
- **Chip Stacks**: Realistic chip visualization
- **Animations**:
  - Card dealing
  - Chip movements to pot
  - Winner chip collection
- **Sound Effects** (optional): Card shuffling, chip sounds, dealer announcements

## Learning Progression System

### 1. Achievement Milestones
- "First Winning Session"
- "Won with a Bluff"
- "Correctly Folded Top Pair"
- "Made a Straight/Flush/Full House"
- "Went All-In and Won"

### 2. Skill Tracking
- **Statistics Dashboard**:
  - Hands played
  - Win rate (bb/100 hands)
  - Best hands played
  - Most improved areas

### 3. Lesson Modules (Integrated Tutorials)
- Starting hand selection by position
- Understanding pot odds and equity
- Reading board textures
- Bet sizing fundamentals
- Bluffing frequency and spots
- Bankroll management basics

## Technical Specifications

### 1. Game State Management
- Robust state machine for all betting rounds
- Hand history logging for review
- Undo/replay capability in training mode

### 2. Hand Evaluator
- Accurate 7-card evaluation (5 community + 2 hole cards)
- Tie-breaking with kickers
- Side pot calculation for all-in scenarios

### 3. Multiplayer Considerations (Future)
- Real-time multiplayer support
- Spectator mode
- Chat with poker etiquette filters

### 4. Platform Targets
- Web-based (HTML5/Canvas) for accessibility
- Mobile-responsive design
- Optional native apps (iOS/Android)

## Glossary Implementation

### Essential Terms to Include
- **Ante**: Forced bet from all players before cards dealt
- **Backdoor**: Needing both turn and river to complete hand
- **Bad Beat**: Losing with a very strong hand to unlikely draw
- **Broadway**: Ace-high straight (A-K-Q-J-10)
- **Continuation Bet (C-bet)**: Betting flop after raising pre-flop
- **Donk Bet**: Leading into pre-flop aggressor
- **Equity**: Percentage chance of winning the hand
- **Expected Value (EV)**: Average profit/loss of a decision
- **GTO (Game Theory Optimal)**: Unexploitable strategy
- **ICM (Independent Chip Model)**: Tournament equity calculation
- **Kicker**: Side card determining winner of same-rank hands
- **Limp**: Calling big blind pre-flop without raising
- **Muck**: Fold without showing cards
- **Outs**: Cards that improve your hand to likely winner
- **Overbet**: Betting more than pot size
- **Rainbow**: Board with multiple different suits
- **Runner-Runner**: Hitting backdoor draw (turn and river)
- **Semi-Bluff**: Betting/raising with a draw
- **Slowplay**: Checking/calling with strong hand to trap
- **Tilt**: Emotional, suboptimal play after bad beats
- **Value Town**: Extracting maximum value from weaker hands
- **Wheel**: Lowest straight (A-2-3-4-5)

## Success Metrics

### For Beginners
- Reduce decision time while maintaining quality
- Increase profitable action frequency
- Demonstrate understanding of position importance
- Apply pot odds correctly 70%+ of the time
- Graduate to intermediate difficulty bots within 20 sessions

## Development Phases

### Phase 1 (MVP)
- Core Texas Hold'em engine
- Single-player vs. 5 AI opponents
- Basic hint system (hand strength + position advice)
- Starting hand recommendations
- Post-hand review

### Phase 2 (Enhanced Learning)
- Pot odds calculator and equity display
- Board texture analysis
- Mistake detection and feedback
- Comprehensive glossary with tooltips
- Practice scenario trainer

### Phase 3 (Advanced Features)
- Range visualization
- HUD-style statistics
- Adaptive AI opponents
- Achievement/progression system
- Hand history database

### Phase 4 (Social/Competitive)
- Multiplayer support
- Leaderboards
- Tournament mode
- Advanced GTO training modules
- Mobile applications

## Professional Terminology Standards

All in-game text, hints, and coaching should use authentic poker terminology as used in:
- High-stakes cash games
- World Series of Poker (WSOP) coverage
- Professional training sites (e.g., PokerStars School, Upswing Poker)
- Tournament commentary

**Avoid**: Casual/colloquial terms unless educating about slang
**Prefer**: Industry-standard terms with clear explanations

---

## Example In-Game Coaching Dialogue

**Scenario**: Player in cutoff with K♠Q♠, facing UTG raise

```
🎯 POSITION: Cutoff (Late Position - Advantageous)
🃏 HAND: K♠Q♠ (Suited Broadway Cards - Premium Drawing Hand)
💰 POT: 3.5bb | TO CALL: 2.5bb (Getting 1.4:1 pot odds)

⚠️ SITUATION: Facing an early position raise (UTG typically represents strength)

💡 HINT: K♠Q♠ is a strong hand, but dominated by AA, KK, AK which UTG often holds.

RECOMMENDED ACTION:
✓ 3-BET (Re-raise to 8-10bb) - Apply pressure, build pot with equity
✓ CALL - See flop in position with playable hand
✗ FOLD - Too tight, hand has good equity even against strong range

📊 YOUR EQUITY vs. UTG Range: ~42%
🎓 CONCEPT: You have position advantage post-flop - you act last every street,
    allowing you to see opponent's action before making decisions.
```

---

This comprehensive specification provides the foundation for a professional-grade poker training application that respects the game's complexity while making it accessible to newcomers.