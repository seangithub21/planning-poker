const votingSystem = [
  {
    value: "fibonacci",
    label: "Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?, ☕)",
    cards: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?", "☕"],
  },
  {
    value: "modifiedFibonacci",
    label: "Modified Fibonacci (0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, ☕)",
    cards: [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, "?", "☕"],
  },
  {
    value: "tShirts",
    label: "T-shirts (xss, xs, s, m, l, xl, xxl, ☕)",
    cards: ["xxs", "xs", "s", "m", "l", "xl", "xxl", "☕"],
  },
  {
    value: "powersOf2",
    label: "Powers of 2 (0, 1, 2, 4, 8, 16, 32, 64, ?, ☕)",
    cards: [0, 1, 2, 4, 8, 16, 32, 64, "?", "☕"],
  },
];

export default votingSystem;
