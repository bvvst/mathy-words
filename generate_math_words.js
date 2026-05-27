#!/usr/bin/env node

const FLATTENED_WORDS = [
  "integer",
  "rational",
  "irrational",
  "real",
  "complex",
  "imaginary",
  "natural",
  "whole",
  "prime",
  "composite",
  "cardinal",
  "ordinal",
  "scalar",
  "vector",
  "tensor",
  "matrix",
  "finite",
  "infinite",
  "countable",
  "uncountable",
  "positive",
  "negative",
  "signed",
  "unsigned",
  "even",
  "odd",
  "parity",
  "modulus",
  "remainder",
  "quotient",
  "numerator",
  "denominator",
  "factor",
  "multiple",
  "divisor",
  "coefficient",
  "constant",
  "variable",
  "parameter",
  "index",
  "exponent",
  "base",
  "radix",
  "sum",
  "difference",
  "product",
  "quotient",
  "addition",
  "subtraction",
  "multiplication",
  "division",
  "power",
  "root",
  "square",
  "cube",
  "logarithm",
  "antilog",
  "factorial",
  "permutation",
  "combination",
  "modulo",
  "congruence",
  "absolute value",
  "floor",
  "ceiling",
  "round",
  "truncate",
  "conjugate",
  "reciprocal",
  "inverse",
  "transpose",
  "determinant",
  "trace",
  "linear",
  "affine",
  "quadratic",
  "cubic",
  "quartic",
  "polynomial",
  "exponential",
  "logarithmic",
  "rational",
  "algebraic",
  "transcendental",
  "trigonometric",
  "hyperbolic",
  "monotonic",
  "bounded",
  "periodic",
  "continuous",
  "discrete",
  "smooth",
  "piecewise",
  "even",
  "odd",
  "convex",
  "concave",
  "domain",
  "range",
  "codomain",
  "mapping",
  "surjection",
  "injection",
  "bijection",
  "composition",
  "identity",
  "derivative",
  "differential",
  "gradient",
  "integral",
  "antiderivative",
  "primitive",
  "limit",
  "infinitesimal",
  "neighborhood",
  "continuity",
  "differentiability",
  "convergence",
  "divergence",
  "series",
  "sequence",
  "partial sum",
  "Taylor",
  "Maclaurin",
  "Laurent",
  "expansion",
  "approximation",
  "asymptote",
  "asymptotic",
  "maximum",
  "minimum",
  "extremum",
  "inflection",
  "critical point",
  "saddle",
  "concavity",
  "curvature",
  "tangent",
  "secant",
  "normal",
  "area",
  "volume",
  "arc length",
  "flux",
  "circulation",
  "equation",
  "inequality",
  "identity",
  "expression",
  "term",
  "monomial",
  "binomial",
  "factorization",
  "expansion",
  "root",
  "zero",
  "solution",
  "system",
  "simultaneous",
  "matrix",
  "determinant",
  "rank",
  "nullity",
  "eigenvalue",
  "eigenvector",
  "basis",
  "span",
  "dimension",
  "subspace",
  "kernel",
  "image",
  "linear combination",
  "independence",
  "orthogonal",
  "orthonormal",
  "parallel",
  "symmetric",
  "skew",
  "diagonal",
  "identity",
  "inverse",
  "transpose",
  "point",
  "line",
  "plane",
  "surface",
  "angle",
  "arc",
  "chord",
  "tangent",
  "triangle",
  "polygon",
  "polyhedron",
  "circle",
  "ellipse",
  "parabola",
  "hyperbola",
  "conic",
  "locus",
  "distance",
  "norm",
  "metric",
  "coordinate",
  "axis",
  "origin",
  "vector",
  "magnitude",
  "direction",
  "parallel",
  "perpendicular",
  "oblique",
  "congruent",
  "similar",
  "isomorphic",
  "open",
  "closed",
  "bounded",
  "compact",
  "interior",
  "boundary",
  "exterior",
  "neighborhood",
  "ball",
  "sphere",
  "mean",
  "median",
  "mode",
  "variance",
  "deviation",
  "dispersion",
  "moment",
  "skew",
  "kurtosis",
  "distribution",
  "density",
  "mass",
  "sample",
  "population",
  "parameter",
  "statistic",
  "correlation",
  "covariance",
  "regression",
  "expectation",
  "likelihood",
  "prior",
  "posterior",
  "quantile",
  "percentile",
  "outlier",
  "residual",
  "bias",
  "variance",
  "error",
  "axiom",
  "postulate",
  "theorem",
  "lemma",
  "corollary",
  "conjecture",
  "hypothesis",
  "proposition",
  "proof",
  "contradiction",
  "induction",
  "deduction",
  "premise",
  "conclusion",
  "inference",
  "necessary",
  "sufficient",
  "iff",
  "universal",
  "existential",
  "quantifier",
  "predicate",
  "linear",
  "nonlinear",
  "discrete",
  "continuous",
  "deterministic",
  "stochastic",
  "explicit",
  "implicit",
  "exact",
  "approximate",
  "closed-form",
  "numerical",
  "analytic",
  "synthetic",
  "absolute",
  "relative",
  "global",
  "local",
  "uniform",
  "pointwise",
];

const VOWELS = "aeiouy";
const EXCEPTIONS = new Map([
  ["real", ["real"]],
  ["whole", ["whole"]],
  ["signed", ["signed"]],
  ["unsigned", ["un", "signed"]],
  ["square", ["square"]],
  ["piecewise", ["piece", "wise"]],
  ["Taylor", ["tay", "lor"]],
  ["Maclaurin", ["mac", "lau", "rin"]],
  ["Laurent", ["lau", "rent"]],
  ["eigenvalue", ["ei", "gen", "val", "ue"]],
  ["eigenvector", ["ei", "gen", "vec", "tor"]],
  ["closed-form", ["closed", "form"]],
  ["iff", ["iff"]],
]);

function isVowel(char) {
  return VOWELS.includes(char.toLowerCase());
}

function syllabifySingleWord(rawWord) {
  const word = rawWord.trim();
  if (!word) return [];
  if (EXCEPTIONS.has(word)) return EXCEPTIONS.get(word);

  const lowerWord = word.toLowerCase();
  if (EXCEPTIONS.has(lowerWord)) return EXCEPTIONS.get(lowerWord);

  const vowelGroups = [];
  let groupStart = -1;

  for (let index = 0; index < word.length; index += 1) {
    const char = word[index];
    if (isVowel(char)) {
      if (groupStart === -1) groupStart = index;
    } else if (groupStart !== -1) {
      vowelGroups.push([groupStart, index - 1]);
      groupStart = -1;
    }
  }

  if (groupStart !== -1) vowelGroups.push([groupStart, word.length - 1]);
  if (vowelGroups.length <= 1) return [word];

  const breakpoints = [];

  for (let index = 0; index < vowelGroups.length - 1; index += 1) {
    const currentVowelEnd = vowelGroups[index][1];
    const nextVowelStart = vowelGroups[index + 1][0];
    const consonants = word.slice(currentVowelEnd + 1, nextVowelStart);

    if (consonants.length <= 1) {
      breakpoints.push(nextVowelStart);
    } else {
      breakpoints.push(currentVowelEnd + consonants.length);
    }
  }

  const syllables = [];
  let start = 0;
  for (const breakpoint of breakpoints) {
    syllables.push(word.slice(start, breakpoint));
    start = breakpoint;
  }
  syllables.push(word.slice(start));

  return syllables.filter(Boolean);
}

function syllabify(term) {
  return term
    .split(/([\s-]+)/)
    .flatMap((piece) => {
      if (!piece.trim()) return [];
      if (/^[\s-]+$/.test(piece)) return [];
      return syllabifySingleWord(piece);
    });
}

function splitIntoHalves(term) {
  const syllables = syllabify(term);

  if (syllables.length <= 1) {
    const compact = term.replace(/[\s-]+/g, "");
    const midpoint = Math.max(1, Math.ceil(compact.length / 2));
    return {
      term,
      syllables,
      front: compact.slice(0, midpoint),
      back: compact.slice(midpoint) || compact,
    };
  }

  const midpoint = Math.ceil(syllables.length / 2);
  return {
    term,
    syllables,
    front: syllables.slice(0, midpoint).join(""),
    back: syllables.slice(midpoint).join(""),
  };
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function generateNewWords(count, sourceWords = FLATTENED_WORDS) {
  const halves = sourceWords.map(splitIntoHalves);
  const generated = [];

  for (let index = 0; index < count; index += 1) {
    const front = randomItem(halves);
    const back = randomItem(halves);
    generated.push({
      word: `${front.front}${back.back}`.toLowerCase(),
      frontFrom: front.term,
      backFrom: back.term,
    });
  }

  return generated;
}

function usage() {
  console.log("Usage: node generate_math_words.js <count> [--json] [--show-halves]");
}

function main() {
  const count = Number.parseInt(process.argv[2] ?? "20", 10);
  const asJson = process.argv.includes("--json");
  const showHalves = process.argv.includes("--show-halves");

  if (!Number.isInteger(count) || count < 1) {
    usage();
    process.exitCode = 1;
    return;
  }

  if (showHalves) {
    const halves = FLATTENED_WORDS.map(splitIntoHalves);
    console.log(JSON.stringify(halves, null, 2));
    return;
  }

  const generated = generateNewWords(count);

  if (asJson) {
    console.log(JSON.stringify(generated, null, 2));
    return;
  }

  for (const item of generated) {
    console.log(`${item.word} (${item.frontFrom} + ${item.backFrom})`);
  }
}

if (typeof window !== "undefined") {
  window.MathWordGenerator = {
    FLATTENED_WORDS,
    syllabify,
    splitIntoHalves,
    generateNewWords,
  };
}

if (typeof require !== "undefined" && require.main === module) {
  main();
}

if (typeof module !== "undefined") {
  module.exports = {
    FLATTENED_WORDS,
    syllabify,
    splitIntoHalves,
    generateNewWords,
  };
}
