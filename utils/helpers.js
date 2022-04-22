module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `<span for="img" aria-label="lightbulb">💡</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="laptop">💻</span>`;
    } else {
      return `<span for="img" aria-label="gear">⚙️</span>`;
    }
  },
  ifCond: (v1, operator, v2, options) => {
    switch (operator) {
      case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
          return options.inverse(this);
  }
  },

  ifCondTwo: (v1, v2, options) => {
    return (v1 == v2) ? options.fn(this) : options.inverse(this);
  },

  ifCondThree: (v1, v2, v3, options) => {
    return (v1 && v2 == v3) ? options.fn(this) : options.inverse(this);
  },
  
  ifCondFour: (v1, v2, v3, options) => {
    return (v1 && v2 !== v3) ? options.fn(this) : options.inverse(this);
  },

  ifCondFive: (v1, v2, v3, options) => {
    return (v1 && v2 == v3) ? options.fn(this) : options.inverse(this);
  },
};
