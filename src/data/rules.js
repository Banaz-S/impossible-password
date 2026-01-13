const COLORS = [
  "red",
  "blue",
  "green",
  "yellow",
  "black",
  "white",
  "orange",
  "purple",
  "pink",
  "brown",
];
const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const EMOJI_REGEX = /[\u{1F300}-\u{1FAFF}]/u;
const EMOJI_REGEX_GLOBAL = /[\u{1F300}-\u{1FAFF}]/gu;

export const RULES = {
  easy: [
    {
      id: "len_8_20",
      text: "Password length must be 8–20 characters",
      validate: (pw) => pw.length >= 8 && pw.length <= 20,
    },
    {
      id: "uppercase",
      text: "Must include at least one uppercase letter",
      validate: (pw) => /[A-Z]/.test(pw),
    },
    {
      id: "number",
      text: "Must include at least one number",
      validate: (pw) => /\d/.test(pw),
    },
    {
      id: "year",
      text: "Must include a 4-digit year (2000–2026)",
      validate: (pw) => /(200\d|201\d|202[0-6])/.test(pw),
    },
    {
      id: "color",
      text: "Must include a color name",
      validate: (pw) => COLORS.some((c) => pw.toLowerCase().includes(c)),
    },
    {
      id: "emoji",
      text: "Must include one emoji",
      validate: (pw) => EMOJI_REGEX.test(pw),
    },
    {
      id: "start_letter",
      text: "Must start with a letter",
      validate: (pw) => /^[A-Za-z]/.test(pw),
    },
  ],

  medium: [
    {
      id: "len_12_20",
      text: "Password length must be 12–20 characters",
      validate: (pw) => pw.length >= 12 && pw.length <= 20,
    },
    {
      id: "year",
      text: "Must include a 4-digit year",
      validate: (pw) => /(200\d|201\d|202[0-6])/.test(pw),
    },
    {
      id: "two_numbers_outside_year",
      text: "Must include exactly 2 numbers outside the year",
      validate: (pw) => {
        const numbers = pw.replace(/(200\d|201\d|202[0-6])/g, "").match(/\d/g);
        return numbers && numbers.length === 2;
      },
    },
    {
      id: "emoji",
      text: "Must include one emoji",
      validate: (pw) => EMOJI_REGEX.test(pw),
    },
    {
      id: "weekday",
      text: "Must include a weekday name",
      validate: (pw) => WEEKDAYS.some((d) => pw.toLowerCase().includes(d)),
    },
    {
      id: "special_char",
      text: "Must include one special character (not ! or @)",
      validate: (pw) => /[#$%^&*()_+\-=\[\]{};:'",.<>/?\\|~]/.test(pw),
    },

    {
      id: "even_vowels",
      text: "Number of vowels must be even",
      validate: (pw) => {
        const v = pw.match(/[aeiou]/gi);
        return v && v.length % 2 === 0;
      },
    },
    {
      id: "upper_lower",
      text: "Must include both uppercase and lowercase letters",
      validate: (pw) => /[A-Z]/.test(pw) && /[a-z]/.test(pw),
    },
    {
      id: "question_mark",
      text: "Must end with a question mark (?)",
      validate: (pw) => pw.endsWith("?"),
    },
    {
      id: "color",
      text: "Must include a color name",
      validate: (pw) => COLORS.some((c) => pw.toLowerCase().includes(c)),
    },
  ],

  evil: [
    {
      id: "len_15_25",
      text: "Password length must be 15-25 characters",
      validate: (pw) => pw.length >= 15 && pw.length <= 25,
    },
    {
      id: "year",
      text: "Must include a 4-digit year among (1990+10 - 2036-10)",
      validate: (pw) => /(200\d|201\d|202[0-6])/.test(pw),
    },
    {
      id: "exact_4_numbers",
      text: "Must include exactly 4 numbers in total",
      validate: (pw) => (pw.match(/\d/g) || []).length === 4,
    },
    {
      id: "math",
      text: "Must include the result of 4+5",
      validate: (pw) => pw.includes("9"),
    },
    {
      id: "two_emojis",
      text: "Must include two emojis",
      validate: (pw) => (pw.match(EMOJI_REGEX_GLOBAL) || []).length >= 2,
    },
    {
      id: "weekday",
      text: "Must include a weekday",
      validate: (pw) => WEEKDAYS.some((d) => pw.toLowerCase().includes(d)),
    },
    {
      id: "color",
      text: "Must include a color name",
      validate: (pw) => COLORS.some((c) => pw.toLowerCase().includes(c)),
    },
    {
      id: "repeat_letter",
      text: "Must include one repeated letter (e.g. oo)",
      validate: (pw) => /([a-zA-Z])\1/.test(pw),
    },
    {
      id: "consonants_more",
      text: "Number of consonants must be greater than vowels",
      validate: (pw) => {
        const vowels = (pw.match(/[aeiou]/gi) || []).length;
        const consonants = (pw.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
        return consonants > vowels;
      },
    },
    {
      id: "symbol",
      text: "Must include one symbol, but not ! @ #",
      validate: (pw) => /[^A-Za-z0-9!@# ]/.test(pw),
    },
    {
      id: "dot_end",
      text: "Must end with a dot (.)",
      validate: (pw) => pw.endsWith("."),
    },
    {
      id: "one_uppercase",
      text: "Must include only one uppercase letter",
      validate: (pw) => (pw.match(/[A-Z]/g) || []).length === 1,
    },
    {
      id: "no_x",
      text: "Must include the letter x",
      validate: (pw) => /[xX]/.test(pw),
    },
    {
      id: "win",
      text: "Must include the word 'win' (case-insensitive)",
      validate: (pw) => pw.toLowerCase().includes("win"),
    },
  ],
};
