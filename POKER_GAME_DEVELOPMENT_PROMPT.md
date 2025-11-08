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

---

## Advanced Training Features

### 1. Hand Reading Training Module
Develop systematic opponent range analysis skills through interactive exercises.

**Core Components**:
- **Range Narrowing Practice**: Step-by-step exercises showing how to narrow opponent ranges street-by-street
- **Live Range Display**: "Based on UTG open + flop c-bet, opponent likely holds: Top Pair (65%), Overpair (20%), Air/Bluff (15%)"
- **Interactive Quizzes**:
  - "Opponent min-raised button, then check-called flop. What does this pattern indicate?"
  - "Player 3-bet from SB after MP raise. What's their likely range?"
- **Pattern Recognition**: Highlight common betting patterns and their meanings
  - Donk bet usually indicates weak made hand or draw
  - Check-raise on dry boards typically represents strength
  - Small bet sizing often indicates polarization

**Training Scenarios**:
```
SCENARIO: Opponent raises UTG, you call from BB with 8♠7♠
FLOP: A♠K♦3♠ - Opponent bets 2/3 pot
QUESTION: What hands does this represent?

ANSWER BREAKDOWN:
✓ Premium pairs: AA, KK (very likely)
✓ Top pair: AK, AQ, AJ (most common)
✓ Overpairs: QQ, JJ (continuation bet)
✗ Bluffs: (rare from UTG on this board)

YOUR ACTION: You have flush draw (9 outs). Pot odds: 2.5:1
Equity needed: 29% | Your equity vs. range: ~35%
RECOMMENDATION: Call profitably, fold equity as backup
```

### 2. Bankroll Management System
Teach responsible poker finance through integrated bankroll tracking.

**Features**:
- **Bankroll Tracker**: Real-time balance across sessions
- **Risk Management Rules**:
  - "Never risk more than 5% of total bankroll in single session"
  - "Maintain minimum 20 buy-ins for your current stake level"
  - "Move down stakes if bankroll drops below 15 buy-ins"
- **Stake Level Recommendations**:
  - $200 bankroll → Play $0.10/$0.25 maximum
  - $500 bankroll → $0.25/$0.50 recommended
  - $2000 bankroll → $1/$2 stakes accessible
- **Visual Graphs**:
  - Bankroll growth/decline over time
  - Session win/loss chart
  - Buy-in depth indicator (green/yellow/red zones)
- **Alerts & Warnings**:
  - "⚠️ You've lost 3 buy-ins this session - consider stopping"
  - "✓ Bankroll reached new milestone: $1000! Consider moving up stakes"
  - "🔴 Playing above recommended stakes for your bankroll"

**Stop-Loss Protection**:
- Configurable session stop-loss (e.g., -3 buy-ins)
- Mandatory break suggestions after losses
- Psychological coaching: "Variance is normal - review hands, not results"

### 3. Mental Game & Tilt Detection
AI-powered emotional state monitoring to maintain optimal decision-making.

**Tilt Recognition Algorithms**:
- **Behavioral Pattern Analysis**:
  - VPIP increase >15% after losing hand
  - Aggression spike (3-betting 40%+ suddenly)
  - Chasing losses with marginal hands
  - Revenge-calling all-ins without proper odds
- **Real-Time Interventions**:
  - "🧠 TILT ALERT: You've lost 3 hands in a row and your play has become 30% looser"
  - "Your fold to 3-bet dropped from 70% to 20% - take a break?"
  - "Last 5 decisions were emotionally driven - pause recommended"

**Mental Reset Tools**:
- **Breathing Exercises**: Guided 60-second mindfulness breaks
- **Perspective Reminders**:
  - "Even AA loses 18% of the time - variance is part of poker"
  - "Focus on decisions, not results"
  - "One session doesn't define your skill"
- **Session Limits**: Enforced time limits (e.g., 90-minute max for beginners)
- **Emotional State Logging**: Track mood before/after sessions to identify patterns

**Statistics**:
- Tilt frequency tracking
- Decision quality comparison (calm vs. tilted states)
- Emotional discipline score (0-100)

### 4. Comprehensive Session Analytics Dashboard
Professional-grade statistics platform for detailed performance analysis.

**Core Metrics**:
- **Positional Stats**:
  - VPIP/PFR breakdown by position (UTG: 12/10, BTN: 35/28, etc.)
  - 3-bet/4-bet frequencies per position
  - Fold to steal % from blinds
- **Win Rate Analysis**:
  - **bb/100 hands**: Industry-standard win rate metric
  - **Showdown winnings** (blue line): Profit when reaching showdown
  - **Non-showdown winnings** (red line): Profit from folds (bluff effectiveness)
  - Combined graph visualization
- **Advanced HUD Stats**:
  - **AF** (Aggression Factor): Ratio of bets+raises to calls
  - **WTSD** (Went To Showdown): % of hands that see showdown
  - **W$SD** (Won $ at Showdown): Win rate when reaching showdown
  - **Cbet** stats: Flop/turn/river continuation bet %

**Leak Detection System**:
- AI-powered analysis identifies common mistakes:
  - "You're folding 85% to 3-bets from BB - too exploitable"
  - "Your flop c-bet% is 85% - opponents can exploit with check-raises"
  - "You're calling too many river bets without proper odds"
  - "Your blind defense is too tight - losing 15bb/100 from blinds"

**Visual Representations**:
- Line graphs: Win rate trends over sessions
- Heat maps: Positional profitability (green=profitable, red=losing)
- Pie charts: Hand type distribution at showdown
- Range charts: Your actual vs. optimal opening ranges

**Comparison Tools**:
- Compare your stats vs. winning players benchmarks
- Track improvement over time (30/60/90 day comparison)
- Goal setting: "Target: Reduce fold to 3-bet from 80% to 65%"

### 5. Equity Calculation Trainer
Rapid equity estimation through timed quizzes and drills.

**Quiz Modes**:

**Mode 1: Exact Equity Calculation**
```
QUESTION: What's the equity?
Your Hand: A♠K♠
Opponent: Q♦Q♣
Board: K♥9♠4♣

Time Limit: 15 seconds
Your Answer: _____%

CORRECT ANSWER: 68.5%
EXPLANATION: You have top pair, top kicker. Opponent needs to hit
2-outer (2 remaining Queens) or runner-runner for straight.
Equity breakdown: You win 68.5%, Opponent wins 31.5%
```

**Mode 2: Common Matchup Recognition**
- Overpair vs. Set: ~8% (2-outer)
- Flush draw vs. Top pair: ~36% (9 outs, 2 cards to come)
- OESD vs. Overpair: ~32% (8 outs, 2 cards to come)
- Set vs. Flush draw: ~55/45%
- Pocket pair vs. Overcards (pre-flop): ~55/45% (classic flip)

**Mode 3: Out Counting Drill**
- "You have J♠10♠ on Q♠9♣2♦. How many outs for straight? ___"
- "You flopped A♥7♥ on K♥6♥2♠. Flush draw outs? ___"
- "Count your outs: 8♦7♦ on 9♠6♣2♥ (OESD + backdoor flush)"

**Scoring System**:
- Points for accuracy (within 5% equity)
- Bonus points for speed (<10 seconds)
- Leaderboard for fastest accurate calculators
- Unlock harder scenarios as you improve

### 6. Multi-Table Training (MTT Preparation)
Simulate real online poker multi-tabling environment.

**Progressive Difficulty**:
- Level 1: 2 tables simultaneously
- Level 2: 3 tables with increased decision time pressure
- Level 3: 4 tables (professional standard)
- Level 4: 6+ tables (grinder mode)

**Features**:
- **Time Bank Management**:
  - Limited total time bank per table (60 seconds reserve)
  - Auto-fold warning when time expires
  - Practice allocating time to complex decisions
- **Table Priority System**:
  - Highlight tables requiring immediate action
  - Queue actions when multiple tables act simultaneously
  - Hotkey table switching (1-4 keys)
- **Quick Decision Training**:
  - Reduce average decision time while maintaining quality
  - Track "time wasted" on routine folds
  - Encourage pre-action buttons for obvious situations
- **Performance Metrics**:
  - Decision quality across multiple tables
  - Mistakes per table (does quality drop at 3+ tables?)
  - Hands per hour (volume metric)
  - Optimal table count recommendation

**Realistic Simulation**:
- Synchronized time banks (tables don't pause for you)
- Overlapping action windows
- Tournament vs. Cash game multi-tabling differences

### 7. Tournament Mode & ICM Training
Complete tournament poker education from early stages to bubble play.

**Tournament Formats**:
- **Sit & Go (SNG)**:
  - 6-max Turbo: Fast blind levels
  - 9-max Standard: Classic structure
  - Double or Nothing: Top 50% get 2x buy-in
  - Winner-Take-All: High variance practice
- **Multi-Table Tournaments (MTT)**:
  - 45-player simulated tournaments
  - Deep stack vs. turbo structures
  - Rebuy/add-on variations

**ICM (Independent Chip Model) Education**:
ICM converts tournament chips to real money equity based on payout structure.

**ICM Scenarios**:
```
BUBBLE SITUATION:
Players: 4 remaining, Top 3 pay
Payouts: 1st: $500, 2nd: $300, 3rd: $200, 4th: $0
Your Stack: 5000 chips (25% of total)

QUESTION: Should you call all-in with AJ?
CHIP VALUE: 5000 chips
ICM VALUE: ~$280 (average finish value)

If you fold: Guarantee $280 average
If you call and win (65%): ~$400 average
If you call and lose (35%): $0

ICM RECOMMENDATION: Fold - risk exceeds reward on bubble
```

**Tournament-Specific Training**:
- **Bubble Play Coaching**:
  - "You're chip leader on bubble - apply maximum pressure"
  - "Short stack with 8bb - push/fold mode activated"
  - "Medium stack - survival mode, avoid confrontation with big stacks"
- **Push/Fold Charts**:
  - Automatic display for <15bb stacks
  - Color-coded shoving ranges by position
  - Nash equilibrium strategy for heads-up
- **Final Table Dynamics**:
  - Pay jump considerations
  - Stack leveraging strategies
  - Deal-making concepts (chip chop vs. ICM chop)

### 8. Player Note-Taking System
Professional-grade opponent tracking and tagging.

**Note Interface**:
- **Quick Tag Buttons**:
  - "Calling Station", "LAG", "TAG", "Nit", "Maniac", "Fish"
  - "Bluffs Often", "Folds to Pressure", "Tilts Easily"
  - Custom tags creation
- **Detailed Notes Field**:
  - Free-form text per player
  - Hand history references
  - Tendency descriptions

**AI-Assisted Notes**:
Based on observed play, system suggests:
- "Player X has 3-bet 6 times from CO - tag as 'Aggressive from Late Position'"
- "Player Y folded to 4 c-bets in row - possibly 'Fit or Fold'"
- "Player Z check-raised 3/4 flops - tag as 'Check-Raise Heavy'"

**Organization**:
- Color-coding: Green (exploitable fish), Yellow (solid reg), Red (tough opponent)
- Search/filter notes by tag
- Export notes for external database

**Privacy & Ethics**:
- Notes are local only (not shared with opponents)
- Encourage respectful descriptions
- Focus on strategic tendencies, not personal attacks

### 9. Professional Hand History Review Theater
Learn from the masters through annotated hand replays.

**Featured Content**:
- **Legendary Hands**:
  - Phil Ivey's soul read vs. Paul Jackson (2005 WSOP)
  - Chris Moneymaker's bluff vs. Sam Farha (2003 WSOP Main Event)
  - Tom Dwan's high-stakes cash game battles
  - Daniel Negreanu's tournament masterclasses

**Interactive Analysis**:
```
HAND BREAKDOWN: Phil Ivey vs. Amateur (High Stakes Poker)

PRE-FLOP:
Ivey (BTN): K♠10♠ - Raises to 3bb
Opponent (BB): A♣Q♦ - Calls

FLOP: J♠9♠2♥
Opponent checks, Ivey bets 4bb (c-bet with gutshot + flush draw)
Opponent calls

📊 EQUITY: Ivey 45% | Opponent 55%

TURN: 7♣ (brick)
Opponent checks, Ivey bets 10bb (semi-bluff, 12 outs)
Opponent calls

🎓 TEACHING POINT: Ivey applies maximum pressure with equity.
Even when behind, his aggressive betting gives two ways to win:
1) Hit draw (12 outs = ~43% river equity)
2) Opponent folds (fold equity)

RIVER: 3♦ (brick, Ivey has K-high)
Opponent checks, Ivey bets 25bb (PURE BLUFF)

🤔 PAUSE: Would you bluff here?
- Pot: 38bb
- Bet: 25bb (66% pot)
- Opponent needs to call 25bb to win 63bb (2.5:1 odds)
- Must be good 28% of time to call

RESULT: Opponent folds A♣Q♦ (top pair!)

💡 WHY IT WORKED:
- Ivey represented flush draw that hit
- Consistent aggression told credible story
- Opponent had bluff-catchers, not the nuts
- Large bet made call uncomfortable even with pair
```

**Learning Modes**:
- **Pause & Predict**: Guess pro's next action before revealing
- **Alternative Lines**: "What if Phil had checked here instead?"
- **GTO Comparison**: How does pro play compare to solver?
- **Exploitative Adjustments**: What did pro identify about opponent?

**Content Library**:
- 50+ annotated professional hands
- Filter by: Player, game type, concept (bluffing, value betting, ICM, etc.)
- Community submissions (user-uploaded interesting hands)

### 10. Variance Simulator & Mental Resilience
Prepare players psychologically for poker's natural variance.

**Simulation Engine**:
- Input your win rate (e.g., 5bb/100 hands)
- Run 10,000-hand simulation
- Display realistic outcome distributions

**Eye-Opening Visualizations**:
```
YOUR STATS: 5bb/100 win rate (good winning player)

After 1,000 hands:
- Best case: +150bb profit
- Expected: +50bb profit
- Worst case: -80bb loss (still possible!)

After 10,000 hands:
- 95% confidence interval: +200bb to +800bb
- You could still be breakeven after 5,000 hands despite being a winner!

LONGEST EXPECTED DOWNSWING: 3,000 hands
This means you might play 3,000 hands without profit even with solid strategy.
```

**Psychological Training**:
- **Downswing Challenge Mode**:
  - Experience 500-hand losing streak (with good decisions)
  - Practice emotional discipline during adversity
  - Reinforce "process over results" mindset
- **Bad Beat Library**:
  - Show famous bad beats (Aces cracked, one-outers)
  - Normalize brutal losses as part of the game
  - "Even pros face AA < 72o sometimes"

**Resilience Metrics**:
- Track how decision quality changes during downswings
- "Your play quality dropped 15% after -5 buy-in session"
- Build mental calluses through exposure

### 11. Stack Depth Strategy Training
Master different strategic approaches based on effective stack sizes.

**Stack Categories & Adjustments**:

**1. Short Stack (10-40bb)**:
- **Push/Fold Strategy**:
  - <15bb: Nash equilibrium shoving charts
  - Steal/resteal dynamics
  - All-in or fold decision trees
- **Simplified Post-Flop**:
  - Commitment threshold (1/3 stack in pot = committed)
  - Pot-sized bets standard
  - Avoid small ball poker
- **Example Coaching**:
  - "12bb stack: Any raise commits you - shove or fold"
  - "You opened, flop came - pot is 40% of stack, you're committed to call"

**2. Medium Stack (40-100bb)**:
- **Standard Cash Game Play**:
  - Full range of bet sizes (1/3, 1/2, 2/3, pot)
  - Balanced c-betting
  - 3-bet bluffing viable
- **Implied Odds Awareness**:
  - Set mining with pocket pairs (need 15:1 implied)
  - Suited connectors playability
- **Example Coaching**:
  - "60bb effective: You can call with 44 to flop set"
  - "Standard 3-bet sizing: 3x original raise"

**3. Deep Stack (100bb+)**:
- **Implied Odds Paradise**:
  - Speculative hands gain value (suited connectors, small pairs)
  - Draws become more valuable (can win huge pots)
  - Thin value betting increases
- **Complex Lines Available**:
  - Check-raise bluffing
  - Multi-street bluffs
  - Floating and delayed c-betting
- **Pot Control**:
  - Not every hand needs to build massive pot
  - Pot geometry becomes critical
- **Example Coaching**:
  - "200bb deep: Your 6♠5♠ has great implied odds"
  - "Deep stacked, you can barrel turn and river as bluff"

**Training Scenarios**:
- Same hand, different stack depths
- "You have AK, flop A73 rainbow. How do you play with 20bb vs. 100bb vs. 300bb?"

### 12. Live Tell Recognition & Timing Tells (Online Focus)
Teach online-specific behavioral patterns and timing analysis.

**Online Timing Tells**:
- **Instant Actions**:
  - Instant call pre-flop usually indicates: Medium pocket pair, suited connector
  - Instant check often means: Missed completely, giving up
  - Instant river call: Likely bluff-catcher, not premium hand
- **Delayed Actions**:
  - Long tank then raise: Usually genuine strength (value)
  - Long tank then call: Marginal hand, tough decision
  - Long tank then fold: Borderline fold, had some equity
- **Pre-Select Buttons**:
  - Auto-check detected: Player multi-tabling, gave up on hand
  - Auto-call detected: Passive player, likely drawing

**Bet Sizing Tells**:
- **Weak Bet Sizing Tells**:
  - Odd bet sizes (23bb into 40bb pot): Often indicates uncertainty, marginal hand
  - Min-bets: Usually weak made hand or blocking bet
- **Strong Bet Sizing Tells**:
  - Pot overbet (1.5x-2x pot): Polarized - nuts or air
  - Perfectly sized pot bet (exactly pot): Experienced player, balanced range

**Training Exercises**:
- Watch hand replays with timing data
- "Opponent tanked 45 seconds then min-raised - what does this mean?"
- Build database of timing patterns per opponent type

**Note**: Emphasize tells are not 100% reliable, just additional data points

### 13. Community & Social Features
Foster learning community and competitive environment.

**Hand Sharing Platform**:
- **Upload Interesting Hands**:
  - Export hand history with annotations
  - Ask community: "How would you play this?"
  - Voting system for best analysis
- **Hand of the Week**: Featured instructional hands
- **Debate Section**: Controversial plays discussed

**Strategy Forums**:
- Beginner Questions section
- Advanced Strategy discussion
- Hand History Review subforum
- Bankroll Management support group

**Coach Review Service**:
- Submit hands for professional review (premium feature)
- Certified coaches provide video analysis
- Personalized leak detection
- Study plan recommendations

**Leaderboards**:
- **Overall Win Rate** (bb/100, minimum 1000 hands)
- **Fastest Learner**: Most improvement over 30 days
- **Equity Quiz Champion**: Highest accuracy score
- **Tilt Resistance**: Best emotional discipline score
- **Multi-Table Master**: Highest quality play across 4+ tables

**Filter Options**:
- By skill level (beginner/intermediate/advanced)
- By game type (cash/tournament/SNG)
- By region/language
- Friends-only leaderboards

### 14. Customizable Training Plans & Daily Missions
Structured curriculum with gamification elements.

**Pre-Built Training Tracks**:

**1. "Zero to Hero" (30-Day Beginner Plan)**:
- Days 1-5: Starting hands and position
- Days 6-10: Pot odds and equity fundamentals
- Days 11-15: Post-flop c-betting and board reading
- Days 16-20: 3-betting and advanced aggression
- Days 21-25: ICM and tournament basics
- Days 26-30: Multi-tabling and volume building

**2. "Aggression Mastery" (14-Day Intensive)**:
- Focus: Increase controlled aggression
- Target: Raise PFR from 12% to 20%
- Exercises: 3-bet bluffing drills, c-bet optimization
- Goal: Transform from passive to aggressive player

**3. "Positional Domination" (21-Day Course)**:
- Week 1: Button play exploitation
- Week 2: Blind defense strategies
- Week 3: Early position discipline
- Outcome: +3bb/100 improvement from positional awareness

**Daily Missions**:
- "Win a pot with a bluff from the cutoff" (+50 XP)
- "Correctly fold top pair when behind" (+75 XP)
- "Play 100 hands with <15% VPIP" (+100 XP)
- "Execute successful check-raise" (+60 XP)
- "Identify opponent player type within 20 hands" (+40 XP)

**Progress Tracking**:
- XP system with level-ups (Level 1-50)
- Skill tree unlocks (new training modules)
- Visual badge collection
- Completion certificates

### 15. Voice Coaching & Audio Commentary
Immersive audio guidance for hands-free learning.

**Real-Time Voice Assistant**:
- Natural language coaching during hands
- "You're on the button with pocket jacks. The action folds to you - this is a clear raising situation to steal the blinds and build the pot."
- Adjustable verbosity (minimal hints vs. detailed explanations)
- Multiple voice personas (professional commentator, friendly coach, GTO robot)

**WSOP-Style Commentary Mode**:
- Dramatic narration of hands
- "He's staring down at pocket kings and there's a raise in front of him. What will he do here?"
- Post-flop analysis: "And the flop brings an ace - this could spell trouble for those cowboys"
- Adds entertainment value to practice sessions

**Situational Audio Cues**:
- "You're pot-committed" (alert when 1/3+ stack invested)
- "Profitable call based on pot odds"
- "Warning: Playing outside your bankroll limits"
- "Tilt detected - consider a break"

**Accessibility Features**:
- Full audio navigation for visually impaired
- Screen reader compatibility
- Verbal hand strength descriptions
- Audio-based quiz mode

**Settings**:
- Volume mixing (voice vs. sound effects)
- Enable/disable mid-hand (test yourself in silence)
- Language selection
- Speech speed adjustment

### 16. Interactive Range Builder Workshop
Visual range construction tool for pre-flop mastery.

**Range Matrix Interface**:
- 169-square grid (all possible starting hands)
- Color-coding system:
  - Dark green: Always play (AA, KK, QQ, AK)
  - Light green: Play from late position
  - Yellow: Marginal/suited connectors
  - Red: Never play (72o, 83o, etc.)

**Functionality**:
- **Drag-and-Drop Construction**:
  - Paint hands into "UTG Open Range"
  - Build "Button 3-bet vs. MP" range
  - Create "BB defense vs. CO steal" range
- **Percentage Calculator**:
  - "Your UTG range is 12.5% of hands - appropriate"
  - "Your button opening range is 45% - standard for 6-max"
- **Save/Load Presets**:
  - Save custom ranges by position
  - Import GTO baseline ranges
  - Export for study

**Range Comparison**:
- **Your Range vs. GTO**:
  - Overlay visualization showing gaps
  - "You're missing suited aces in CO open - consider adding"
  - "You're opening 72o from MP - too loose"
- **Equity Calculations**:
  - "Your UTG range has 58% equity vs. BB defend range"
  - EV calculations per position matchup

**Training Mode**:
- Quiz: "Build an optimal UTG open range"
- Submit for automated grading
- Feedback: "Good start! Consider adding suited connectors 98s+ for balance"

**Integration**:
- Built ranges automatically apply to practice tables
- Experiment with range adjustments and track results
- A/B testing: "Tight vs. loose BTN range - which wins more?"

### 17. Exploitative Play Training Academy
Learn to identify and exploit opponent tendencies.

**Player Archetype Database**:

**1. The Nit (Tight-Passive)**:
- **Stats**: VPIP 8-12%, PFR 6-8%, Fold to 3-bet 80%+
- **Exploits**:
  - Steal blinds relentlessly (90%+ success rate)
  - Fold to their rare 3-bets (always strong)
  - Never bluff when they show interest
  - Value bet thin when you have it
- **Practice Scenario**: "Table full of nits - maximize steal profit"

**2. Calling Station (Loose-Passive)**:
- **Stats**: VPIP 40-60%, PFR 5-10%, Fold to c-bet 20%
- **Exploits**:
  - Never bluff (they don't fold)
  - Value bet relentlessly with marginal hands
  - No fancy plays needed
  - Let them pay you off
- **Practice Scenario**: "Extract maximum value from calling station"

**3. LAG (Loose-Aggressive)**:
- **Stats**: VPIP 30-45%, PFR 25-35%, 3-bet 12%+
- **Exploits**:
  - Trap with premium hands (they'll barrel off)
  - Call down lighter (they bluff often)
  - 4-bet/shove with strong hands for value
  - Avoid bluffing (they won't fold to single bet)
- **Practice Scenario**: "Play against maniac - let them bluff off"

**4. TAG (Tight-Aggressive)**:
- **Stats**: VPIP 18-24%, PFR 16-20%, balanced 3-bet
- **Exploits**:
  - Minimal - these are good players
  - Look for positional imbalances
  - Exploit if they over-fold to 4-bets
  - Table select away from them when possible
- **Practice Scenario**: "Grind small edges vs. competent opponent"

**Adaptive AI**:
- Bots change archetypes mid-session
- "Player X just went on tilt after bad beat - now playing like maniac"
- Real-time adjustment recommendations
- Track your exploitation success rate

**Counter-Exploitation**:
- "You're being exploited! Opponent is stealing your blinds 75% of the time - defend wider"
- Balance detection: "Your c-bet is 85% - opponents will start check-raising light"

### 18. Multi-Format Poker Training
Expand beyond NLHE to other popular variants.

**Additional Variants** (Post-MVP):

**1. Pot-Limit Omaha (PLO)**:
- 4-card starting hands (complexity increase)
- Nut-oriented strategy
- Hand reading adjustments
- Equity run closer (more variance)
- Starting with PLO4, expandable to PLO5

**2. Short Deck Hold'em (6+ Hold'em)**:
- Remove 2-5 cards from deck
- Altered hand rankings (flush > full house)
- Increased action (more equity realization)
- Popular in high-stakes Asian games

**3. Heads-Up Specialist Training**:
- Hyper-aggressive optimal strategy
- Wide range battles
- Nash equilibrium push/fold
- Psychological warfare
- Fastest format to improve fundamental skills

**4. Mixed Games Introduction**:
- H.O.R.S.E. rotation basics
- 8-Game overview
- Dealer's choice concepts
- Well-rounded poker education

**Learning Path**:
- Master NLHE first (foundation)
- Branch to PLO (equity calculation practice)
- Try Short Deck (action and fun)
- Heads-up (skill development accelerator)

**Cross-Training Benefits**:
- NLHE skills transfer to other variants
- Improved hand reading from PLO
- Aggression lessons from Heads-Up
- Become complete poker player

---

## Enhanced Development Phases (Revised)

### Phase 1 (MVP - Core Foundation)
**Goal**: Functional poker trainer with essential learning features
**Timeline**: 3-4 months

- Core Texas Hold'em engine (accurate hand evaluation, pot calculations)
- Single-player vs. 5 AI opponents (basic difficulty levels)
- Basic hint system (hand strength + position advice)
- Starting hand recommendations by position
- Simple post-hand review
- Pot odds calculator display
- Basic bankroll tracking
- Session statistics (hands played, win/loss)

**Success Criteria**: Beginners can play 100 hands with guidance and understand basic strategy

---

### Phase 2 (Enhanced Learning & Psychology)
**Goal**: Professional-grade training tools and mental game features
**Timeline**: 3-4 months

**Analytics & Insights**:
- Comprehensive session analytics dashboard (VPIP, PFR, positional stats)
- Board texture analysis and real-time coaching
- Leak detection system with actionable feedback
- Advanced HUD-style statistics
- Win rate tracking (bb/100 hands, showdown/non-showdown)

**Mental Game**:
- Tilt detection and intervention system
- Mental reset tools (breathing exercises, perspective reminders)
- Variance simulator to build psychological resilience
- Emotional discipline tracking

**Education**:
- Comprehensive glossary with interactive tooltips
- Practice scenario trainer (situational drills)
- Mistake detection with gentle corrections
- Hand reading training module (range narrowing exercises)

**Success Criteria**: Players demonstrate 30% improvement in decision quality over 20 sessions

---

### Phase 3 (Advanced Skills & Competition)
**Goal**: Tournament play, advanced concepts, and competitive features
**Timeline**: 4-5 months

**Tournament Features**:
- Full tournament mode (SNG, MTT formats)
- ICM training with bubble play scenarios
- Push/fold charts for short stacks
- Final table dynamics coaching

**Advanced Training**:
- Equity calculation trainer (timed quizzes)
- Stack depth strategy modules (short/medium/deep)
- Multi-table training (2-6 tables simultaneously)
- Range builder workshop (visual range construction tool)
- Exploitative play academy (player archetype training)

**AI & Opponents**:
- Adaptive AI with player archetypes (Nit, LAG, TAG, Calling Station)
- AI that changes behavior mid-session (tilt simulation)
- Player note-taking system with AI-assisted suggestions
- Timing tell recognition training

**Gamification**:
- Achievement/progression system with XP
- Customizable training plans ("Zero to Hero", "Aggression Mastery")
- Daily missions and challenges
- Skill tree unlocks

**Success Criteria**: Players successfully navigate tournament bubble situations 70%+ of time

---

### Phase 4 (Community & Professional Tools)
**Goal**: Social features, professional content, and advanced variants
**Timeline**: 3-4 months

**Community Features**:
- Hand sharing platform with voting system
- Strategy forums and discussion boards
- Leaderboards (win rate, improvement, quiz champions)
- Friends-only competition modes
- Hand of the Week featured content

**Professional Content**:
- Hand history review theater (50+ annotated pro hands)
- Interactive analysis of legendary hands (Phil Ivey, Moneymaker, etc.)
- Pause & predict learning mode
- GTO solver comparisons
- Coach review service integration (premium)

**Advanced Features**:
- Voice coaching and audio commentary (WSOP-style narration)
- Range visualization overlay (opponent hand distributions)
- Professional hand history database with search
- Custom bot personality creation

**Success Criteria**: 10,000+ active users, 500+ hands shared daily

---

### Phase 5 (Expansion & Multiplayer)
**Goal**: Real multiplayer, mobile apps, and game variants
**Timeline**: 4-6 months

**Multiplayer**:
- Real-time multiplayer cash games
- Private table creation with friends
- Tournament lobbies with scheduled events
- Spectator mode with coaching permissions
- Chat with poker etiquette filters

**Platform Expansion**:
- Native mobile apps (iOS/Android)
- Cross-platform synchronization
- Offline mode with AI opponents
- Tablet-optimized interfaces

**Game Variants**:
- Pot-Limit Omaha (PLO4, PLO5)
- Short Deck Hold'em (6+ poker)
- Heads-Up specialist mode
- Mixed games introduction (H.O.R.S.E., 8-Game)

**Advanced Tools**:
- GTO training modules with solver integration
- Advanced range analysis tools
- Session replay with VR/AR support (experimental)
- Coaching marketplace

**Success Criteria**: 50,000+ users, 4.5+ star ratings, profitable freemium model

---

## Monetization Strategy

### Free Tier
- Unlimited play vs. AI opponents
- Basic hint system and position coaching
- Post-hand review (last 10 hands)
- Community forums access
- Daily missions (limited)

### Premium Tier ($9.99/month or $79.99/year)
- Advanced analytics dashboard
- Tilt detection and mental game tools
- Full hand history database (unlimited storage)
- Professional hand review theater (all content)
- Equity trainer and quiz modes
- Tournament mode access
- Multi-table training
- Range builder tool
- Priority customer support
- Ad-free experience

### Pro Tier ($24.99/month or $199/year)
- All Premium features
- Coach review service credits (2 hands/month)
- GTO solver integration
- Custom bot creation
- Advanced range analysis tools
- Exclusive pro content and webinars
- Tournament lobby access
- Private tables with friends
- API access for hand import/export

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