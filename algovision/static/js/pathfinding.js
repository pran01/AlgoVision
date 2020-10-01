let boxes = document.querySelector(".boxes");
let findbtn = document.querySelector("#findbtn");
let resetbtn = document.querySelector("#resetbtn");
let wall = new Map();
let tag = document.querySelector("#tag");

let slider = document.querySelector("#pathSpeed");
let speed = 500 - (slider.value - 1);

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  speed = 500 - (this.value - 1);
};

function getAlgo(name) {
  let group = document.getElementsByName(name);
  for (let i = 0; i < group.length; i++) {
    if (group[i].checked) return group[i].value;
  }
  return null;
}

let wallPreset1 = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  375,
  374,
  373,
  372,
  371,
  370,
  369,
  368,
  367,
  366,
  365,
  364,
  363,
  362,
  361,
  360,
  359,
  358,
  357,
  356,
  355,
  354,
  353,
  352,
  351,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  60,
  61,
  62,
  63,
  66,
  67,
  68,
  69,
  70,
  71,
  74,
  75,
  101,
  102,
  103,
  104,
  105,
  106,
  131,
  156,
  181,
  206,
  231,
  207,
  208,
  209,
  210,
  211,
  212,
  109,
  134,
  135,
  136,
  137,
  138,
  139,
  165,
  190,
  215,
  240,
  265,
  264,
  263,
  262,
  117,
  142,
  167,
  192,
  217,
  242,
  243,
  244,
  245,
  246,
  247,
  248,
  249,
  224,
  199,
  174,
  149,
  148,
  123,
  147,
  146,
  145,
  144,
  301,
  302,
  303,
  304,
  305,
  306,
  307,
  308,
  309,
  310,
  313,
  314,
  315,
  316,
  317,
  319,
  320,
  321,
  323,
  324,
  325,
];

let wallPreset2 = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  50,
  75,
  100,
  125,
  150,
  175,
  200,
  225,
  250,
  275,
  300,
  325,
  350,
  375,
  374,
  373,
  372,
  371,
  370,
  369,
  368,
  367,
  366,
  365,
  364,
  363,
  362,
  361,
  360,
  359,
  358,
  357,
  356,
  355,
  354,
  353,
  352,
  351,
  326,
  301,
  276,
  251,
  226,
  201,
  176,
  151,
  126,
  101,
  76,
  51,
  26,
  28,
  53,
  78,
  103,
  128,
  129,
  105,
  106,
  107,
  108,
  109,
  110,
  85,
  60,
  59,
  328,
  303,
  278,
  253,
  228,
  229,
  230,
  231,
  232,
  233,
  234,
  259,
  284,
  285,
  286,
  287,
  262,
  237,
  212,
  187,
  162,
  37,
  62,
  87,
  88,
  89,
  114,
  115,
  140,
  165,
  190,
  215,
  240,
  265,
  290,
  342,
  317,
  292,
  267,
  242,
  217,
  192,
  167,
  142,
  67,
  68,
  69,
  70,
  119,
  120,
  121,
  122,
  123,
  170,
  195,
  220,
  245,
  270,
  320,
  321,
  322,
  323,
  298,
  273,
  248,
  223,
  198,
];

let sourceSelected = false,
  goalSelected = false;

let wallPreset = "";
let source = "30";
let dest = "347";

let Default = {
  Source: "Source-Default.png",
  Goal: "Goal-Default.png",
  Wall: "Wall-Default.png",
  Path: "Path-Default2.gif",
  Tag:
    "Watch as the car tries to find the path to the goal being blocked by wall.",
  fontFamily: "'Staatliches', cursive",
  fontSize: "20px",
};

let Minecraft = {
  Source: "Source-Minecraft.jpg",
  Goal: "Goal-Minecraft.png",
  Wall: "Wall-Minecraft.gif",
  Path: "Path-Minecraft.gif",
  Tag:
    "Watch as the Zombie tries to find the path to Steve being blocked by lava.",
  fontFamily: "'Press Start 2P','cursive'",
  fontSize: "10px",
};

let Thor = {
  Source: "Source-Thor.png",
  Goal: "Goal-Thor.png",
  Wall: "Wall-Thor.png",
  Path: "Thunder2.gif",
  Tag:
    "Watch as the Mjölnir tries to find the path to Thor being blocked by Captain America's shield.",
  fontFamily: "'Electrolize', sans-serif",
  fontSize: "20px",
};

let Onepiece = {
  Source: "Luffy.png",
  Goal: "Sunny.png",
  Wall: "World.png",
  Path: "Path-Onepiece.gif",
  Tag:
    "Watch as Luffy tries to find the path to Thousand Sunny being blocked by World Government.",
  fontFamily: "'Electrolize', sans-serif",
  fontSize: "20px",
};

let Theme = Default;

document.querySelector("#changeThemeOnepiece").addEventListener("click", () => {
  Theme = Onepiece;
  boxes.innerHTML = "";
  drawBoard();
  g = newGraph();
});
document
  .querySelector("#changeThemeMinecraft")
  .addEventListener("click", () => {
    Theme = Minecraft;
    boxes.innerHTML = "";
    drawBoard();
    g = newGraph();
  });
document.querySelector("#changeThemeThor").addEventListener("click", () => {
  Theme = Thor;
  boxes.innerHTML = "";
  drawBoard();
  g = newGraph();
});
document.querySelector("#changeThemeDefault").addEventListener("click", () => {
  Theme = Default;
  boxes.innerHTML = "";
  drawBoard();
  g = newGraph();
});

function drawBoard() {
  for (let i = 1; i <= 375; i++) {
    let box = document.createElement("div");
    box.style = `background:#17a2b8;height:25 px;width:25 px;`;
    box.style.backgroundSize = "25px 25px";
    box.classList.add(`box${i}`);
    box.classList.add(`node`);
    boxes.appendChild(box);
    wall.set(i + "", false);
  }
  let sourceDiv = document.querySelector(`#sourceDiv`);
  let wallDiv = document.querySelector("#wallDiv");
  let goalDiv = document.querySelector("#goalDiv");
  let pathDiv = document.querySelector("#pathDiv");

  sourceDiv.style.backgroundImage =
    "url('/static/images/" + Theme.Source + "')";

  wallDiv.style.backgroundImage = "url('/static/images/" + Theme.Wall + "')";

  goalDiv.style.backgroundImage = "url('/static/images/" + Theme.Goal + "')";

  pathDiv.style.backgroundImage = "url('/static/images/" + Theme.Path + "')";

  let sBox = document.querySelector(`.box${source}`);
  let dBox = document.querySelector(`.box${dest}`);
  sBox.style.backgroundImage = "url('/static/images/" + Theme.Source + "')";
  dBox.style.backgroundImage = "url('/static/images/" + Theme.Goal + "')";
  let nodes = document.querySelectorAll(`.node`);
  nodes.forEach((item) => {
    item.addEventListener("mouseup", function stopMoving(event) {
      if (wall.get(event.target.classList[0].slice(3))) {
        let i = parseInt(event.target.classList[0].slice(3));
        g.addVertex(`${i}`);
        if (i % 25 != 1) g.addEdge(i + "", i - 1 + "", 1);
        if (i % 25 != 0) g.addEdge(i + "", i + 1 + "", 1);
        if (i > 25) g.addEdge(i + "", i - 25 + "", 1);
        if (i < 351) g.addEdge(i + "", i + 25 + "", 1);
        wall.set(event.target.classList[0].slice(3), false);
      }
      if (sourceSelected == true) {
        source = event.target.classList[0].slice(3);
        sourceSelected = false;
      }
      if (goalSelected == true) {
        dest = event.target.classList[0].slice(3);
        goalSelected = false;
      }
    });
    item.addEventListener("mouseout", function removeSource(event) {
      if (sourceSelected == true) {
        if (event.target.classList[0].slice(3) == source) {
          if (wall.get(event.target.classList[0].slice(3))) {
            event.target.style.backgroundSize = `25px 25px`;
            event.target.style.backgroundImage =
              "url('/static/images/" + Theme.Wall + "')";
            g.removeVertex(event.target.classList[0].slice(3) + "");
          } else {
            event.target.style.background = "#17a2b8"; //original
          }

          nodes.forEach((item) => {
            if (
              item.style.backgroundImage ==
              `url("/static/images/${Theme.Wall}")`
            ) {
              item.style.background = "#17a2b8"; //original
              item.style.backgroundSize = "25px 25px";
              item.style.backgroundImage =
                "url('/static/images/" + Theme.Wall + "')";
            } else if (
              item.classList[0].slice(3) == source ||
              item.classList[0].slice(3) == dest
            );
            else {
              item.style.background = "#17a2b8"; //original
            }
          });
          let i = parseInt(event.target.classList[0].slice(3));
          g.addVertex(`${i}`);
          if (i % 25 != 1) g.addEdge(i + "", i - 1 + "", 1);
          if (i % 25 != 0) g.addEdge(i + "", i + 1 + "", 1);
          if (i > 25) g.addEdge(i + "", i - 25 + "", 1);
          if (i < 351) g.addEdge(i + "", i + 25 + "", 1);
        }
      } else if (goalSelected == true) {
        if (event.target.classList[0].slice(3) == dest) {
          if (wall.get(event.target.classList[0].slice(3))) {
            event.target.style.backgroundSize = `25px 25px`;
            event.target.style.backgroundImage =
              "url('/static/images/" + Theme.Wall + "')";
            g.removeVertex(event.target.classList[0].slice(3) + "");
          } else {
            event.target.style.background = "#17a2b8"; //original
          }
          nodes.forEach((item) => {
            if (
              item.style.backgroundImage ==
              `url("/static/images/${Theme.Wall}")`
            ) {
              item.style.background = "#17a2b8"; //original
              item.style.backgroundSize = "25px 25px";
              item.style.backgroundImage =
                "url('/static/images/" + Theme.Wall + "')";
            } else if (
              item.classList[0].slice(3) == source ||
              item.classList[0].slice(3) == dest
            );
            else {
              item.style.background = "#17a2b8"; //original
            }
          });
          let i = parseInt(event.target.classList[0].slice(3));
          g.addVertex(`${i}`);
          if (i % 25 != 1) g.addEdge(i + "", i - 1 + "", 1);
          if (i % 25 != 0) g.addEdge(i + "", i + 1 + "", 1);
          if (i > 25) g.addEdge(i + "", i - 25 + "", 1);
          if (i < 351) g.addEdge(i + "", i + 25 + "", 1);
        }
      }
    });
    item.addEventListener("mouseover", async function addWallOver(event) {
      if (sourceSelected == true && draw == true) {
        event.target.style.backgroundSize = "25px 25px";
        event.target.style.backgroundImage =
          "url('/static/images/" + Theme.Source + "')";
        source = event.target.classList[0].slice(3);
      } else if (goalSelected == true && draw == true) {
        event.target.style.backgroundSize = "25px 25px";
        event.target.style.backgroundImage =
          "url('/static/images/" + Theme.Goal + "')";
        dest = event.target.classList[0].slice(3);
      } else if (
        draw == true &&
        event.target.classList[0].slice(3) != source &&
        event.target.classList[0].slice(3) != dest
      ) {
        if (wall.get(event.target.classList[0].slice(3))) {
          event.target.style.background = "#17a2b8"; //original
          let i = parseInt(item.classList[0].slice(3));
          g.addVertex(`${i}`);
          if (i % 25 != 1) g.addEdge(i + "", i - 1 + "", 1);
          if (i % 25 != 0) g.addEdge(i + "", i + 1 + "", 1);
          if (i > 25) g.addEdge(i + "", i - 25 + "", 1);
          if (i < 351) g.addEdge(i + "", i + 25 + "", 1);
          wall.set(event.target.classList[0].slice(3), false);
        } else {
          event.target.style.backgroundSize = `1px 1px`;
          event.target.style.backgroundRepeat = "no-repeat";
          event.target.style.backgroundPosition = "center";
          event.target.style.backgroundImage =
            "url('/static/images/" + Theme.Wall + "')";
          for (let i = 0; i <= 25; i += 1) {
            event.target.style.backgroundSize = `${i}px ${i}px`;
            await sleep(5);
          }
          g.removeVertex(event.target.classList[0].slice(3) + "");
          wall.set(event.target.classList[0].slice(3), true);
          wallPreset += event.target.classList[0].slice(3) + ",";
        }
      }
    });

    item.addEventListener("mousedown", async function addWall(event) {
      if (event.target.classList[0].slice(3) == source) sourceSelected = true;
      else if (event.target.classList[0].slice(3) == dest) goalSelected = true;
      else if (wall.get(event.target.classList[0].slice(3))) {
        event.target.style.background = "#17a2b8"; //original
        let i = parseInt(event.target.classList[0].slice(3));
        g.addVertex(`${i}`);
        if (i % 25 != 1) g.addEdge(i + "", i - 1 + "", 1);
        if (i % 25 != 0) g.addEdge(i + "", i + 1 + "", 1);
        if (i > 25) g.addEdge(i + "", i - 25 + "", 1);
        if (i < 351) g.addEdge(i + "", i + 25 + "", 1);
        wall.set(event.target.classList[0].slice(3), false);
      } else {
        if (
          event.target.classList[0].slice(3) != source &&
          event.target.classList[0].slice(3) != dest
        ) {
          event.target.style.backgroundSize = `1px 1px`;
          event.target.style.backgroundRepeat = "no-repeat";
          event.target.style.backgroundPosition = "center";
          event.target.style.backgroundImage =
            "url('/static/images/" + Theme.Wall + "')";
          for (let i = 0; i <= 25; i += 1) {
            event.target.style.backgroundSize = `${i}px ${i}px`;
            await sleep(5);
          }
          g.removeVertex(event.target.classList[0].slice(3));
          wall.set(event.target.classList[0].slice(3), true);
          wallPreset += event.target.classList[0].slice(3) + ",";
        }
      }
    });
  });
  tag.innerHTML = Theme.Tag;
  tag.style.fontFamily = Theme.fontFamily;
  tag.style.fontSize = Theme.fontSize;
}

drawBoard();
let nodes = document.querySelectorAll(`.node`);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let draw = false;

document.addEventListener("mousedown", () => {
  draw = true;
});
document.addEventListener("mouseup", () => {
  draw = false;
});

class Queue {
  constructor() {
    this.items = [];
    this.head = -1;
    this.tail = -1;
  }
  enqueue(x) {
    if (this.head == -1) {
      this.head++;
    }
    this.tail++;
    this.items[this.tail] = x;
  }
  dequeue() {
    let item = this.items[this.head];
    this.head++;
    return item;
  }
  isEmpty() {
    if (this.head > this.tail) return true;
    return false;
  }
  display() {
    let str = "";
    if (this.head == -1 && this.tail == -1) {
      str = "No items.";
    } else {
      for (let i = this.head; i <= this.tail; i++) {
        str += this.items[i];
      }
    }
    console.log(`Items in the queue: ${str}`);
  }
  front() {
    console.log(`Item at front of queue: ${this.items[this.head]}`);
  }
  clear() {
    this.items = [];
    this.head = -1;
    this.tail = -1;
    console.log("Queue Cleared");
  }
}

class Stack {
  constructor() {
    this.elements = [];
    this.top = -1;
  }

  //Inserting a number at the top of stack.
  push(num) {
    this.top++;
    this.elements[this.top] = num;
  }

  //Return and remove the element at top.
  //return undefinned if stack is empty.
  pop() {
    if (this.top == -1) return undefined;
    let num = this.elements[this.top];
    this.top--;
    return num;
  }

  //prints the element at top
  peek() {
    if (this.top == -1) {
      console.log("Stack Empty");
    } else
      console.log(
        `The element at the top of stack: ${this.elements[this.top]}`
      );
  }

  //Check if the stack is empty.
  isEmpty() {
    if (this.top == -1) {
      return true;
    } else {
      return false;
    }
  }

  //Return the size of Stack.
  size() {
    return this.top + 1;
  }

  //Display the elements of stack.
  display() {
    let str = "";
    for (let i = 0; i <= this.top; i++) {
      str += this.elements[i] + " ";
    }
    console.log(`Elements in the stack: ${str}`);
  }

  //Clear the whole stack.
  clear() {
    this.elements = [];
    this.top = -1;
    console.log(`Stack Cleared`);
  }
}

class Graph {
  constructor() {
    this.numOfVertices = 0;
    this.adjList = new Map();
  }
  addVertex(v) {
    this.numOfVertices++;
    this.adjList.set(v, []);
  }
  addEdge(from, to, weight) {
    if (!this.hasEdge(from, to)) {
      this.adjList.get(from).push({ node: to, weight: weight });
    }
    if (!this.hasEdge(to, from))
      this.adjList.get(to).push({ node: from, weight: weight });
  }
  hasEdge(from, to) {
    let dests = this.adjList.get(from);
    for (let i in dests) {
      let dest = dests[i];
      if (dest["node"] == to) return true;
    }
    return false;
  }
  getWeight(to, from) {
    let dests = this.adjList.get(to);
    for (let dest of dests) {
      if (dest["node"] == from) {
        return dest["weight"];
      }
    }
  }
  removeVertex(v) {
    this.numOfVertices--;
    let dests = this.adjList.get(v);
    this.adjList.delete(v);
    for (let i in dests) {
      let dest = dests[i];
      let del = this.adjList.get(dest["node"]);
      for (let j in del) {
        if (del[j]["node"] == v) del.splice(j, 1);
      }
      this.adjList.set(dest["node"], del);
    }
  }
  printGraph() {
    let keys = this.adjList.keys();
    for (let key of keys) {
      let destsList = "";
      let dests = this.adjList.get(key);
      for (let dest of dests) {
        destsList += `${dest["node"]}(${dest["weight"]})` + ", ";
      }
      console.log(`${key} ==> ${destsList}`);
    }
  }
  bfs(start, dest) {
    let visited = new Map();
    let visitedNodes = new Queue();
    let parent = new Map();
    for (let vertex of this.adjList.keys()) {
      visited.set(vertex["node"], false);
    }
    let q = new Queue();
    visited.set(start, true);
    visitedNodes.enqueue(start);
    q.enqueue(start);
    while (!q.isEmpty()) {
      let vertex = q.dequeue();
      if (vertex == dest) break;
      let dests = this.adjList.get(vertex);
      for (let i in dests) {
        let dest = dests[i];
        if (!visited.get(dest["node"])) {
          visited.set(dest["node"], true);
          visitedNodes.enqueue(dest["node"]);
          parent.set(dest["node"], vertex);
          q.enqueue(dest["node"]);
        }
      }
    }
    let path = new Stack();
    let child = parent.get(dest);
    while (child != start && child != undefined) {
      path.push(child);
      child = parent.get(child);
    }
    return [path, visitedNodes];
  }

  dfs(start, goal) {
    let visited = new Map();
    let visitedNodes = new Queue();
    let parent = new Map();
    for (let vertex of this.adjList.keys()) {
      visited.set(vertex["node"], false);
    }
    visited.set(start, true);
    this.dfsUtil(start, goal, visited, visitedNodes, parent);
    let path = new Stack();
    let child = parent.get(goal);
    while (child != start && child != undefined) {
      path.push(child);
      child = parent.get(child);
    }
    return [path, visitedNodes];
  }
  dfsUtil(start, goal, visited, visitedNodes, parent) {
    if (start == goal) return;
    visitedNodes.enqueue(start);
    let dests = this.adjList.get(start);
    for (let i in dests) {
      let dest = dests[i];
      if (!visited.get(dest["node"])) {
        visited.set(dest["node"], true);
        parent.set(dest["node"], start);
        if (dest["node"] == goal) return;
        this.dfsUtil(dest["node"], goal, visited, visitedNodes, parent);
      }
    }
  }
  getMinNode(sp, dist) {
    let min = Infinity;
    let node;
    for (let i of dist.keys()) {
      if (sp.get(i) == false && dist.get(i) < min && dist.get(i) != Infinity) {
        min = dist.get(i);
        node = i;
      }
    }
    return node;
  }
  dijkstraPathStack(s, d) {
    let sp = new Map(); //stores if vertex is in shortest path or not.
    let dist = new Map();
    let parent = new Map();
    let visited = new Queue();
    for (let key of this.adjList.keys()) {
      if (key == s) dist.set(key, 0);
      else dist.set(key, Infinity);
    }
    for (let key of this.adjList.keys()) {
      sp.set(key, false);
    }
    let minNode = this.getMinNode(sp, dist);
    if (minNode != undefined) {
      while (minNode) {
        minNode = this.getMinNode(sp, dist);
        sp.set(minNode, true);
        visited.enqueue(minNode);
        let adjNodes = this.adjList.get(minNode);
        for (let i in adjNodes) {
          let adjNode = adjNodes[i];
          if (
            dist.get(minNode) + this.getWeight(minNode, adjNode["node"]) <
            dist.get(adjNode["node"])
          ) {
            dist.set(
              adjNode["node"],
              dist.get(minNode) + this.getWeight(minNode, adjNode["node"])
            );
            parent.set(adjNode["node"], minNode);
          }
        }
        if (minNode == d) break;
      }
    }
    let path = new Stack();
    let child = parent.get(d);
    while (child != s && child != undefined) {
      path.push(child);
      child = parent.get(child);
    }
    return [path, visited];
  }
  getMinOpenNode(open, f) {
    let minInd = 0;
    let min = Infinity;
    for (let i in open) {
      let a = open[i];
      if (f.get(a) < min && f.get(a) != Infinity) {
        min = f.get(a);
        minInd = i;
      }
    }
    return [open[minInd], minInd];
  }
  manhattanDistance(from, to) {
    //For a 25X15 grid where names of the node denote its position
    from = parseInt(from);
    to = parseInt(to);
    let fromX = from % 25;
    let toX = to % 25;
    let fromY = 351 - (from - fromX + 1) / 25;
    let toY = 351 - (to - toX + 1) / 25;
    let h = Math.abs(fromX - toX) + Math.abs(fromY - toY);
    return h;
  }
  aStarSearch(start, goal) {
    let open = new Array(),
      closed = new Array();
    let f = new Map(),
      g = new Map(),
      h = new Map(),
      parent = new Map();
    let visited = new Queue();
    for (let key of this.adjList.keys()) {
      f.set(key, Infinity);
      g.set(key, Infinity);
      h.set(key, Infinity);
    }
    f.set(start, 0);
    g.set(start, 0);
    h.set(start, 0);

    open.push(start);
    while (open.length > 0) {
      let [q, ind] = this.getMinOpenNode(open, f);
      open.splice(ind, 1);
      closed.push(q);
      visited.enqueue(q);
      let successors = this.adjList.get(q);
      for (let successor of successors) {
        if (successor["node"] == goal) {
          parent.set(successor["node"], q);
          let path = new Stack();
          let child = parent.get(goal);
          while (child != start && child != undefined) {
            path.push(child);
            child = parent.get(child);
          }
          return [path, visited];
        } else if (!closed.includes(successor["node"])) {
          let gNew = g.get(q) + this.getWeight(q, successor["node"]);
          let hNew = this.manhattanDistance(successor["node"], goal);
          let fNew = gNew + hNew;
          if (
            f.get(successor["node"]) == Infinity ||
            f.get(successor["node"]) > fNew
          ) {
            open.push(successor["node"]);
            f.set(successor["node"], fNew);
            g.set(successor["node"], gNew);
            h.set(successor["node"], hNew);
            parent.set(successor["node"], q);
          }
        }
      }
    }
  }
  getMinOpenNodeGreedy(open, h) {
    let minInd = 0;
    let min = Infinity;
    for (let i in open) {
      let a = open[i];
      if (h.get(a) < min && h.get(a) != Infinity) {
        min = h.get(a);
        minInd = i;
      }
    }
    return [open[minInd], minInd];
  }
  greedyBestFirstSearch(start, goal) {
    let open = new Array(),
      closed = new Array();
    let h = new Map(),
      parent = new Map();
    let visited = new Queue();
    for (let key of this.adjList.keys()) {
      h.set(key, Infinity);
    }
    h.set(start, 0);

    open.push(start);
    while (open.length > 0) {
      let [q, ind] = this.getMinOpenNodeGreedy(open, h);
      open.splice(ind, 1);
      closed.push(q);
      visited.enqueue(q);
      let successors = this.adjList.get(q);
      for (let successor of successors) {
        if (successor["node"] == goal) {
          parent.set(successor["node"], q);
          let path = new Stack();
          let child = parent.get(goal);
          while (child != start && child != undefined) {
            path.push(child);
            child = parent.get(child);
          }
          return [path, visited];
        } else if (!closed.includes(successor["node"])) {
          let hNew = this.manhattanDistance(successor["node"], goal);
          if (
            h.get(successor["node"]) == Infinity ||
            h.get(successor["node"]) > hNew
          ) {
            open.push(successor["node"]);
            h.set(successor["node"], hNew);
            parent.set(successor["node"], q);
          }
        }
      }
    }
  }
}

function newGraph() {
  let g = new Graph();
  for (let i = 1; i <= 375; i++) {
    g.addVertex(`${i}`);
  }
  for (let i = 1; i <= 374; i++) {
    if (i % 25 != 0) g.addEdge(i + "", i + 1 + "", 1);
    if (i < 351) g.addEdge(i + "", i + 25 + "", 1);
  }
  return g;
}

let g = newGraph();

findbtn.addEventListener("click", async function findPath() {
  console.log(wallPreset);
  nodes = document.querySelectorAll(`.node`);
  nodes.forEach((item) => {
    if (item.style.backgroundImage == `url("/static/images/${Theme.Wall}")`) {
      item.style.background = "#17a2b8"; //original
      item.style.backgroundSize = "25px 25px";
      item.style.backgroundImage = "url('/static/images/" + Theme.Wall + "')";
    } else if (
      item.classList[0].slice(3) == source ||
      item.classList[0].slice(3) == dest
    );
    else {
      item.style.background = "#17a2b8"; //original
    }
  });
  let path, visited;
  let Algo = getAlgo("PathAlgos");
  if (Algo == "Dijkstra") [path, visited] = g.dijkstraPathStack(source, dest);
  else if (Algo == "bfs") [path, visited] = g.bfs(source, dest);
  else if (Algo == "dfs") [path, visited] = g.dfs(source, dest);
  else if (Algo == "A*") [path, visited] = g.aStarSearch(source, dest);
  else if (Algo == "greedy")
    [path, visited] = g.greedyBestFirstSearch(source, dest);
  else if (Algo == null) alert("Please Choose an algorithm first.");
  while (!visited.isEmpty()) {
    let visitedBoxNum = visited.dequeue();
    if (visitedBoxNum != source && visitedBoxNum != dest) {
      let visitedBox = document.querySelector(`.box${visitedBoxNum}`);
      visitedBox.style.backgroundSize = "25px 25px";
      visitedBox.style.background = "#f64c72"; //checking
      await sleep(speed);
    }
  }
  while (!path.isEmpty()) {
    let pathBoxNum = path.pop();
    await sleep(1);
    let pathBox = document.querySelector(`.box${pathBoxNum}`);

    pathBox.style.backgroundSize = `1px 1px`;
    pathBox.style.backgroundRepeat = "no-repeat";
    pathBox.style.backgroundPosition = "center";
    pathBox.style.backgroundImage = "url('/static/images/" + Theme.Path + "')";
    for (let i = 0; i <= 25; i += 5) {
      pathBox.style.backgroundSize = `${i}px ${i}px`;
      await sleep(1);
    }
  }
});

resetbtn.addEventListener("click", () => {
  boxes.innerHTML = "";
  drawBoard();
  g = newGraph();
});

async function drawWallPreset(wallPreset) {
  boxes.innerHTML = "";
  drawBoard();
  g = newGraph();
  for (let i of wallPreset) {
    iBox = document.querySelector(`.box${i}`);
    if (
      iBox.classList[0].slice(3) != source &&
      iBox.classList[0].slice(3) != dest
    ) {
      iBox.style.backgroundSize = `1px 1px`;
      iBox.style.backgroundRepeat = "no-repeat";
      iBox.style.backgroundPosition = "center";
      iBox.style.backgroundImage = "url('/static/images/" + Theme.Wall + "')";
      for (let i = 0; i <= 25; i += 5) {
        iBox.style.backgroundSize = `${i}px ${i}px`;
        await sleep(1);
      }
      g.removeVertex(iBox.classList[0].slice(3));
      wall.set(iBox.classList[0].slice(3), true);
    }
  }
}
