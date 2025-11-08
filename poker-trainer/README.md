# 🎴 Texas Hold'em Poker Trainer

A professional poker training application designed for beginners, featuring real-time coaching, strategic hints, and professional poker terminology.

## 🎯 Features

### ✅ Implemented (MVP - Phase 1)

- **Core Texas Hold'em Engine**
  - Accurate hand evaluation (Royal Flush to High Card)
  - Proper betting rounds (Pre-Flop, Flop, Turn, River, Showdown)
  - 6-player tables with position-based play
  - Pot calculations and side pots

- **Professional Hint System**
  - Real-time hand strength indicator (0-100 scale)
  - Position-based coaching (UTG, MP, CO, BTN, Blinds)
  - Action recommendations with professional reasoning
  - Board texture analysis (wet/dry boards, flush/straight possibilities)
  - Poker concept education (position advantage, pot odds, aggression)

- **Pot Odds Calculator**
  - Real-time pot odds display
  - Required equity calculation
  - Ratio and percentage formats

- **AI Opponents (3 difficulty levels)**
  - Beginner: Passive, loose play
  - Intermediate: Balanced strategy
  - Advanced: Tight-aggressive, position-aware

- **Interactive UI**
  - Professional poker table design
  - Keyboard shortcuts (F=Fold, C=Call/Check, R=Raise, A=All-In)
  - Action history log
  - Visual bet sizing controls

## 🚀 How to Run

### Option 1: Direct Browser (Easiest)

1. Navigate to the `poker-trainer` directory
2. Open `index.html` in any modern web browser
3. Start playing!

```bash
cd /home/user/agro/poker-trainer
# Then open index.html in your browser
```

### Option 2: Local Web Server (Recommended)

Using Python:
```bash
cd /home/user/agro/poker-trainer
python3 -m http.server 8000
# Open browser to http://localhost:8000
```

Using Node.js:
```bash
cd /home/user/agro/poker-trainer
npx http-server -p 8000
# Open browser to http://localhost:8000
```

## 🎮 How to Play

### Controls

**Mouse:**
- Click action buttons (FOLD, CHECK, CALL, RAISE, ALL-IN)
- Use bet sizing slider for custom raise amounts
- Quick size buttons (1/3 POT, 1/2 POT, etc.)

**Keyboard Shortcuts:**
- `F` - Fold
- `C` - Call or Check
- `R` - Raise (opens bet sizing)
- `A` - All-In

### Game Flow

1. **New Hand** - Cards are dealt, blinds posted
2. **Pre-Flop** - First betting round
3. **Flop** - 3 community cards revealed
4. **Turn** - 4th community card (second barrel)
5. **River** - 5th community card (final street)
6. **Showdown** - Best hand wins!

### Understanding Hints

The hint panel provides:
- **Position Analysis** - Your table position and its implications
- **Hand Strength** - Your current hand strength (0-100%)
- **Situation** - Board texture and current action
- **Recommendation** - Professional guidance on best action
- **Pot Odds** - Mathematical profitability calculation
- **Poker Concept** - Educational tip to improve your game

## 📚 Poker Terminology Used

- **Position**: Your seat relative to the dealer button
  - **UTG** (Under the Gun): First to act, early position
  - **MP** (Middle Position): Middle seats
  - **CO** (Cutoff): One seat before button
  - **BTN** (Button): Dealer position, best position
  - **SB/BB** (Small/Big Blind): Forced bets

- **Hand Types**:
  - **Premium Pairs**: AA, KK, QQ
  - **Big Slick**: AK (suited or offsuit)
  - **Suited Connectors**: Sequential cards same suit (e.g., 9♠8♠)

- **Actions**:
  - **Check**: Pass action without betting
  - **Call**: Match current bet
  - **Raise**: Increase the bet
  - **3-Bet**: Re-raise after initial raise
  - **All-In**: Bet all remaining chips

- **Concepts**:
  - **Pot Odds**: Ratio of pot size to bet you must call
  - **Equity**: Your percentage chance to win the hand
  - **C-Bet**: Continuation bet after raising pre-flop
  - **GTO**: Game Theory Optimal (unexploitable strategy)

## 🎓 Learning Path

### For Complete Beginners

1. **Start with Pre-Flop Play** (Hands 1-20)
   - Learn starting hand selection
   - Understand position importance
   - Follow hint system recommendations

2. **Master Pot Odds** (Hands 21-50)
   - Compare pot odds to equity
   - Make mathematically correct calls
   - Recognize profitable situations

3. **Board Reading** (Hands 51-100)
   - Identify flush/straight possibilities
   - Recognize wet vs. dry boards
   - Adjust strategy accordingly

4. **Advanced Concepts** (Hands 100+)
   - Experiment with aggression
   - Try 3-betting and bluffing
   - Develop your playing style

## 🔧 Technical Details

### Architecture

```
poker-trainer/
├── index.html           # Main HTML structure
├── styles.css           # Poker table styling
├── poker-engine.js      # Game logic (betting, stages)
├── hand-evaluator.js    # Hand ranking system
├── ai-player.js         # AI decision making
├── hints-system.js      # Professional coaching
└── game.js              # UI controller
```

### Technologies Used

- **Pure JavaScript** (ES6+) - No frameworks required
- **HTML5** - Semantic markup
- **CSS3** - Responsive design with gradients and animations
- **No dependencies** - Runs entirely in browser

## 🎯 Roadmap

### Phase 2 (Coming Soon)
- Session analytics dashboard
- Tilt detection system
- Variance simulator
- Hand reading training module

### Phase 3 (Future)
- Tournament mode (SNG, MTT)
- ICM training
- Multi-table practice
- Range builder tool

### Phase 4 (Advanced)
- Multiplayer support
- Hand history database
- Voice coaching
- Mobile apps

## 📖 Learning Resources

Based on this trainer, you're learning:
- ✅ Starting hand selection by position
- ✅ Pot odds and equity calculation
- ✅ Board texture analysis
- ✅ Position advantage exploitation
- ✅ Proper bet sizing
- ✅ Bankroll management basics

## 🐛 Known Issues

- Hand evaluation for extremely rare cases (e.g., tie-breakers with kickers) may need refinement
- AI doesn't yet adapt to player tendencies (planned for Phase 3)
- No mobile optimization yet (works but suboptimal on small screens)

## 🤝 Contributing

This is an educational project. Suggestions for improvement:
1. More sophisticated AI strategies
2. Additional hint scenarios
3. UI/UX enhancements
4. Bug fixes

## 📝 License

Educational use only. Based on comprehensive poker game specification.

## 🎲 Disclaimer

This is a **training tool** for learning poker strategy. No real money involved. Practice responsible gaming.

---

**Good luck at the tables! Remember: Play the player, not just the cards. 🎴♠️♥️♦️♣️**
