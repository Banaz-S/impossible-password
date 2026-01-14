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

export const RULE_POOLS = {
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
    {
      id: "ends_letter",
      text: "Must end with a letter",
      validate: (pw) => /[A-Za-z]$/.test(pw),
    },
    {
      id: "min_two_letters",
      text: "Must include at least 2 letters",
      validate: (pw) => (pw.match(/[A-Za-z]/g) || []).length >= 2,
    },
    {
      id: "no_spaces",
      text: "Must not include spaces",
      validate: (pw) => !/\s/.test(pw),
    },
    {
      id: "lowercase",
      text: "Must include at least one lowercase letter",
      validate: (pw) => /[a-z]/.test(pw),
    },
    {
      id: "two_colors",
      text: "Must include two different color names",
      validate: (pw) => {
        const found = COLORS.filter((c) => pw.toLowerCase().includes(c));
        return new Set(found).size >= 2;
      },
    },
    {
      id: "digit_not_start",
      text: "Must not start with a number",
      validate: (pw) => !/^\d/.test(pw),
    },
    {
      id: "no_symbols",
      text: "Must not include symbols",
      validate: (pw) => !/[^A-Za-z0-9 ]/.test(pw),
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
    {
      id: "odd_consonants",
      text: "Number of consonants must be odd",
      validate: (pw) => {
        const c = (pw.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
        return c % 2 === 1;
      },
    },
    {
      id: "emoji_not_adjacent_to_digit",
      text: "Emoji must not be next to a number",
      validate: (pw) =>
        !/(\d\p{Extended_Pictographic}|\p{Extended_Pictographic}\d)/u.test(pw),
    },
    {
      id: "starts_upper",
      text: "Must start with an uppercase letter",
      validate: (pw) => /^[A-Z]/.test(pw),
    },
    {
      id: "two_specials",
      text: "Must include exactly 2 special characters",
      validate: (pw) => (pw.match(/[^A-Za-z0-9 ]/g) || []).length === 2,
    },
    {
      id: "emoji_not_end",
      text: "Emoji must not be at the end",
      validate: (pw) => !EMOJI_REGEX.test(pw.slice(-2)),
    },
    {
      id: "vowels_gt_3",
      text: "Must include more than 3 vowels",
      validate: (pw) => (pw.match(/[aeiou]/gi) || []).length > 3,
    },
    {
      id: "color_length_gt_4",
      text: "Color name must be longer than 4 letters",
      validate: (pw) =>
        COLORS.some((c) => c.length > 4 && pw.toLowerCase().includes(c)),
    },
    {
      id: "digit_before_year",
      text: "A number must appear before the year",
      validate: (pw) => /\d.*(200\d|201\d|202[0-6])/.test(pw),
    },
    {
      id: "no_repeated_digits",
      text: "Digits must not repeat",
      validate: (pw) => {
        const nums = pw.match(/\d/g) || [];
        return new Set(nums).size === nums.length;
      },
    },
    {
      id: "weekday_not_at_end",
      text: "Weekday must not be the last word",
      validate: (pw) =>
        WEEKDAYS.some(
          (d) => pw.toLowerCase().includes(d) && !pw.toLowerCase().endsWith(d)
        ),
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
    {
      id: "no_duplicate_digits",
      text: "Numbers must not repeat",
      validate: (pw) => {
        const nums = pw.match(/\d/g) || [];
        return new Set(nums).size === nums.length;
      },
    },
    {
      id: "emoji_separated",
      text: "Emojis must not be adjacent",
      validate: (pw) => !/(\p{Extended_Pictographic})\1/gu.test(pw),
    },
    {
      id: "digit_sum_even",
      text: "Sum of all digits must be even",
      validate: (pw) => {
        const nums = pw.match(/\d/g) || [];
        return nums.reduce((a, n) => a + Number(n), 0) % 2 === 0;
      },
    },
    {
      id: "weekday_after_color",
      text: "Weekday must appear after the color",
      validate: (pw) =>
        COLORS.some((c) =>
          WEEKDAYS.some(
            (d) => pw.toLowerCase().indexOf(d) > pw.toLowerCase().indexOf(c)
          )
        ),
    },
    {
      id: "prime_number",
      text: "Must include a prime number (2,3,5,7)",
      validate: (pw) => /[2357]/.test(pw),
    },
    {
      id: "uppercase_not_start",
      text: "Uppercase letter must not be at the start",
      validate: (pw) => /^[a-z]/.test(pw),
    },
    {
      id: "emoji_between_letters",
      text: "Emoji must be between two letters",
      validate: (pw) => /[A-Za-z]\p{Extended_Pictographic}[A-Za-z]/u.test(pw),
    },
    {
      id: "color_before_weekday",
      text: "Color must appear before weekday",
      validate: (pw) =>
        COLORS.some((c) =>
          WEEKDAYS.some(
            (d) => pw.toLowerCase().indexOf(c) < pw.toLowerCase().indexOf(d)
          )
        ),
    },
    {
      id: "no_repeated_words",
      text: "Words must not repeat",
      validate: (pw) => {
        const words = pw.toLowerCase().match(/[a-z]+/g) || [];
        return new Set(words).size === words.length;
      },
    },
  ],
};
