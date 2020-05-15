// move randomly
map.displayChapter(String([map.getPlayer().getX(), map.getPlayer().getY()]));
let q = [];
let target = [
  map.getWidth() - 2,
  8
];
let path = map.getPlayer().robotPath;
if (path) {
  // go as path
  if (path['res'].length > 0) {
    let next = path['res'].pop();
    if (next[0] - x == 1) {
      me.move('right');
    } else if (next[0] - x == -1) {
      me.move('left');
    } else if (next[1] - y == 1) {
      me.move('down');
    } else if (next[1] - y == -1) {
      me.move('up');
    }
  } else {
    me.move('down');
  }
} else {
  // compute path by DFS
  path['res'] = [];
  let newMap = [];
  for (let i = 0; i < 40; i++) {
    let lines = [];
    for (let j = 0; j < 40; j++) {
      lines.push(0);
    }
    newMap.push(lines);
  }
  q.push((me.getX(), me.getY()))
  newMap[me.getX()][me.getY()] = 1;
  while (q.length > 0) {
    let now = q.pop();
    let pathIndex = String(now);

    let x = now[0],
      y = now[1];

    if ((x + 1) == target[0] && y == target[1]) {
      path.push([
        x + 1,
        y
      ]);
      break;
    }
    if ((x - 1) == target[0] && y == target[1]) {
      path.push([
        x - 1,
        y
      ]);
      break;
    }
    if (x == target[0] && (y + 1) == target[1]) {
      path.push([
        x, y + 1
      ]);
      break;
    }
    if (x == target[0] && (y - 1) == target[1]) {
      path.push([
        x, y - 1
      ]);
      break;
    }
    let moves = map.getAdjacentEmptyCells(x, y);
    for (let i = 0; i < moves.length; i++) {
      let isRepeated = false;
      if (newMap[moves[i][0][0]][moves[i][0][1]] == 1) {
        isRepeated = true;
      }
      for (let k = 0; k < q.length; k++) {
        if (q[k][0] == moves[i][0][0] && q[k][1] == moves[i][0][1]) {
          isRepeated = true;
          break;
        }
      }
      if (isRepeated == false) {
        path[pathIndex] = String(moves[i][0]);
        newMap[moves[i][0][0]][moves[i][0][1]] = 1;
        q.push(moves[i][0]);
      }
    }
  }

}
