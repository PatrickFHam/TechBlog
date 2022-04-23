module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
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

  // These IF CONDITIONS are for slightly more complex HandleBars mechanics.

  // If the comment belongs to the logged-in user.
  ifCondTwo: (v1, v2, options) => {
    return (v1 == v2) ? options.fn(this) : options.inverse(this);
  },

  // If the comment belongs to the logged-in user.
  ifCondThree: (v1, v2, v3, options) => {
    return (v1 && v2 == v3) ? options.fn(this) : options.inverse(this);
  },
  
  // If the comment belongs to a diffferent user.
  ifCondFour: (v1, v2, v3, options) => {
    return (v1 && v2 !== v3) ? options.fn(this) : options.inverse(this);
  },

  // If the post belongs to the logged-in user, they may delete the comment.
  ifCondFive: (v1, v2, v3, options) => {
    return (v1 && v2 == v3) ? options.fn(this) : options.inverse(this);
  },
};
