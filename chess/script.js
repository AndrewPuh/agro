const pieceSymbols = {
  'P':'\u2659','N':'\u2658','B':'\u2657','R':'\u2656','Q':'\u2655','K':'\u2654',
  'p':'\u265F','n':'\u265E','b':'\u265D','r':'\u265C','q':'\u265B','k':'\u265A'
};

function parseFEN(fen) {
  const rows = fen.split('/');
  const board = [];
  for (let r = 0; r < 8; r++) {
    const row = [];
    for (const ch of rows[r]) {
      if (!isNaN(ch)) {
        for (let i = 0; i < Number(ch); i++) row.push(null);
      } else {
        row.push(ch);
      }
    }
    board.push(row);
  }
  return board;
}

function boardToFEN(board) {
  return board.map(row => {
    let str = '';
    let empty = 0;
    row.forEach(cell => {
      if (!cell) empty++; else {
        if (empty) { str += empty; empty = 0; }
        str += cell;
      }
    });
    if (empty) str += empty;
    return str;
  }).join('/');
}

function getFENFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('fen');
}

let board = parseFEN(getFENFromURL() || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
let selected = null;
const boardElem = document.getElementById('board');
const lightInput = document.getElementById('lightColor');
const darkInput = document.getElementById('darkColor');
const applyBtn = document.getElementById('applyColors');
const shareBtn = document.getElementById('shareButton');
const shareLink = document.getElementById('shareLink');

function render() {
  boardElem.innerHTML = '';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const square = document.createElement('div');
      square.className = 'square ' + ((r + c) % 2 ? 'dark' : 'light');
      square.dataset.row = r;
      square.dataset.col = c;
      if (selected && selected.r === r && selected.c === c) {
        square.classList.add('selected');
      }
      const piece = board[r][c];
      if (piece) square.textContent = pieceSymbols[piece];
      boardElem.appendChild(square);
    }
  }
}

boardElem.addEventListener('click', e => {
  const cell = e.target.closest('.square');
  if (!cell) return;
  const r = Number(cell.dataset.row);
  const c = Number(cell.dataset.col);
  if (selected) {
    board[r][c] = board[selected.r][selected.c];
    board[selected.r][selected.c] = null;
    selected = null;
    render();
  } else if (board[r][c]) {
    selected = { r, c };
    render();
  }
});

applyBtn.addEventListener('click', () => {
  boardElem.style.setProperty('--light', lightInput.value);
  boardElem.style.setProperty('--dark', darkInput.value);
});

shareBtn.addEventListener('click', () => {
  const fen = boardToFEN(board);
  const url = window.location.origin + window.location.pathname + '?fen=' + encodeURIComponent(fen);
  shareLink.value = url;
});

render();
