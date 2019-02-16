const formats = [
  {
    "format_id": "stroke",
    "format_name": "Strokeplay",
    "description": "Scoring is kept by adding the cumulative total of strokes taken throughout the round.",
  },
  {
    "format_id": "match",
    "format_name": "Matchplay",
    "description": "Scoring is determined by giving the player, or team, a point for the lowest score each hole. All holes are either won, halved, or lost."
  },
  {
    "format_id": "best",
    "format_name": "Best Ball (Four Ball)",
    "description": "All members of each team play their own ball on each hole. After each hole, the lowest score among all team members serves as the team score."
  },
  {
    "format_id": "skin",
    "format_name": "Skins",
    "description": "Similar to Matchplay, each hole is assigned a point value. If holes are tied, the points carry over to the next hole, and continues to carry until the next hole won."
  },
  {
    "format_id": "b-b-b",
    "format_name": "Bingo-Bango-Bongo",
    "description": "Bingo: First player in group to get ball onto green gets a point. Bango: Player whos ball is closest to the pin once all balls are on the green gets a point. Bongo: First player to get the ball in the hole(longest putt/longest chipin) gets a point."
  }
];

export function getFormats() {
  return formats
}