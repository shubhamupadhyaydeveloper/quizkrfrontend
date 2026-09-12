import { Difficulty, Quiz, QuizQuestion, QuizSettings, QuizSource } from '../utils/types';

// Stand-in for the model's output while generation runs on canned data.
// Each topic carries mixed difficulties and both question shapes so the
// setup screen's toggles have something real to filter.
type BankQuestion = QuizQuestion & {
  difficulty: Difficulty;
  kind: 'mcq' | 'boolean';
};

type Topic = {
  id: string;
  title: string;
  keywords: string[];
  questions: BankQuestion[];
};

const mcq = (
  id: string,
  difficulty: Difficulty,
  question: string,
  options: string[],
  answer: string,
  explanation: string,
): BankQuestion => ({ id, difficulty, kind: 'mcq', question, options, answer, explanation });

const tf = (
  id: string,
  difficulty: Difficulty,
  question: string,
  answer: 'True' | 'False',
  explanation: string,
): BankQuestion => ({
  id,
  difficulty,
  kind: 'boolean',
  question,
  options: ['True', 'False'],
  answer,
  explanation,
});

const TOPICS: Topic[] = [
  {
    id: 'photosynthesis',
    title: 'Photosynthesis',
    keywords: ['photosynth', 'chlorophyll', 'plant', 'leaf', 'stomata', 'calvin', 'biology'],
    questions: [
      mcq('ph1', 'Easy', 'Which pigment gives plants their green colour and captures sunlight?',
        ['Carotene', 'Chlorophyll', 'Melanin', 'Xanthophyll'], 'Chlorophyll',
        'Chlorophyll absorbs red and blue light and reflects green, which is why leaves look green.'),
      mcq('ph2', 'Easy', 'What gas do plants release as a by-product of photosynthesis?',
        ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], 'Oxygen',
        'Water molecules are split during the light reactions, releasing oxygen.'),
      mcq('ph3', 'Easy', 'Which organelle carries out photosynthesis?',
        ['Mitochondrion', 'Chloroplast', 'Ribosome', 'Nucleus'], 'Chloroplast',
        'Chloroplasts hold the thylakoid membranes where the light reactions happen.'),
      mcq('ph4', 'Medium', 'Where does the Calvin cycle take place?',
        ['Thylakoid membrane', 'Stroma', 'Cell wall', 'Mitochondria'], 'Stroma',
        'The Calvin cycle runs in the stroma, the fluid surrounding the thylakoids.'),
      mcq('ph5', 'Medium', 'Which two molecules produced by the light reactions power the Calvin cycle?',
        ['ATP and NADPH', 'ATP and oxygen', 'Glucose and water', 'NADH and FADH2'], 'ATP and NADPH',
        'The light reactions store energy as ATP and reducing power as NADPH.'),
      mcq('ph6', 'Medium', 'Through which pores does a leaf exchange gases with the air?',
        ['Cuticles', 'Stomata', 'Xylem vessels', 'Root hairs'], 'Stomata',
        'Guard cells open and close stomata to balance gas exchange against water loss.'),
      mcq('ph7', 'Medium', 'Which enzyme fixes carbon dioxide in the Calvin cycle?',
        ['ATP synthase', 'RuBisCO', 'Amylase', 'Catalase'], 'RuBisCO',
        'RuBisCO attaches CO2 to RuBP — it is the most abundant enzyme on Earth.'),
      mcq('ph8', 'Hard', 'In non-cyclic photophosphorylation, what is the final electron acceptor?',
        ['Oxygen', 'NADP+', 'Photosystem II', 'Water'], 'NADP+',
        'Electrons end at NADP+, reducing it to NADPH for the Calvin cycle.'),
      mcq('ph9', 'Hard', 'Why do C4 plants outperform C3 plants in hot, dry conditions?',
        [
          'They concentrate CO2 and suppress photorespiration',
          'They photosynthesise at night only',
          'They do not need RuBisCO',
          'They store more chlorophyll per cell',
        ],
        'They concentrate CO2 and suppress photorespiration',
        'C4 plants pre-fix carbon in mesophyll cells, keeping CO2 high around RuBisCO.'),
      mcq('ph10', 'Hard', 'Splitting water during the light reactions is known as:',
        ['Photolysis', 'Hydrolysis', 'Glycolysis', 'Carboxylation'], 'Photolysis',
        'Photolysis at photosystem II releases electrons, protons and oxygen.'),
      tf('ph11', 'Easy', 'Photosynthesis converts light energy into chemical energy stored in glucose.', 'True',
        'That conversion is the whole point of the process.'),
      tf('ph12', 'Easy', 'Plants only carry out respiration at night and never during the day.', 'False',
        'Plants respire continuously; during the day photosynthesis simply outpaces it.'),
      tf('ph13', 'Medium', 'The Calvin cycle requires light to run directly.', 'False',
        'It depends on ATP and NADPH from the light reactions, but needs no light itself.'),
      tf('ph14', 'Medium', 'Oxygen released during photosynthesis comes from carbon dioxide.', 'False',
        'Isotope tracing shows the oxygen comes from water, not CO2.'),
      tf('ph15', 'Hard', 'Photorespiration lowers the efficiency of photosynthesis in C3 plants.', 'True',
        'RuBisCO binds oxygen instead of CO2, wasting energy and fixed carbon.'),
    ],
  },
  {
    id: 'quadratics',
    title: 'Quadratic Equations',
    keywords: ['quadratic', 'algebra', 'equation', 'parabola', 'discriminant', 'roots', 'maths', 'math'],
    questions: [
      mcq('qe1', 'Easy', 'What is the standard form of a quadratic equation?',
        ['ax + b = 0', 'ax² + bx + c = 0', 'ax³ + bx² + c = 0', 'a/x + b = 0'], 'ax² + bx + c = 0',
        'A quadratic has degree two, with a ≠ 0.'),
      mcq('qe2', 'Easy', 'Solve: x² − 9 = 0',
        ['x = 3 only', 'x = ±3', 'x = ±9', 'x = 0'], 'x = ±3',
        'A difference of squares factors to (x − 3)(x + 3) = 0.'),
      mcq('qe3', 'Easy', 'What shape does the graph of a quadratic function make?',
        ['A straight line', 'A parabola', 'A hyperbola', 'A circle'], 'A parabola',
        'Every quadratic graphs as a parabola opening up or down.'),
      mcq('qe4', 'Medium', 'What is the discriminant of ax² + bx + c = 0?',
        ['b² − 4ac', '2a + b', '−b / 2a', '√(b² + 4ac)'], 'b² − 4ac',
        'Its sign tells you how many real roots the equation has.'),
      mcq('qe5', 'Medium', 'Solve: 2x + 4 = 12',
        ['x = 2', 'x = 4', 'x = 6', 'x = 8'], 'x = 4',
        'Subtract 4 from both sides, then divide by 2.'),
      mcq('qe6', 'Medium', 'For x² − 5x + 6 = 0, what are the roots?',
        ['2 and 3', '−2 and −3', '1 and 6', '−1 and 6'], '2 and 3',
        'The factors (x − 2)(x − 3) give roots that sum to 5 and multiply to 6.'),
      mcq('qe7', 'Medium', 'The x-coordinate of a parabola\'s vertex is given by:',
        ['−b / 2a', 'b / 2a', 'c / a', '−c / b'], '−b / 2a',
        'The vertex sits on the axis of symmetry, halfway between the roots.'),
      mcq('qe8', 'Hard', 'If the discriminant is negative, the equation has:',
        ['Two distinct real roots', 'One repeated real root', 'Two complex roots', 'No solution at all'],
        'Two complex roots',
        'A negative discriminant means the square root is imaginary, giving a conjugate pair.'),
      mcq('qe9', 'Hard', 'For roots α and β of ax² + bx + c = 0, what does αβ equal?',
        ['c / a', '−b / a', 'b / a', '−c / a'], 'c / a',
        'Vieta\'s formulas: the sum is −b/a and the product is c/a.'),
      mcq('qe10', 'Hard', 'Completing the square on x² + 6x + 5 gives:',
        ['(x + 3)² − 4', '(x + 3)² + 4', '(x + 6)² − 31', '(x − 3)² − 4'], '(x + 3)² − 4',
        'Half of 6 is 3; (x + 3)² = x² + 6x + 9, so subtract 4 to keep the value.'),
      tf('qe11', 'Easy', 'A quadratic equation can have at most two real roots.', 'True',
        'A degree-two polynomial has exactly two roots, counted with multiplicity.'),
      tf('qe12', 'Easy', 'Every quadratic equation can be solved by factoring over the integers.', 'False',
        'Many need the quadratic formula or completing the square.'),
      tf('qe13', 'Medium', 'If a > 0 the parabola opens upwards.', 'True',
        'A positive leading coefficient makes the curve open up, giving a minimum.'),
      tf('qe14', 'Medium', 'A discriminant of zero means the parabola never touches the x-axis.', 'False',
        'Zero means it touches at exactly one point — a repeated root.'),
      tf('qe15', 'Hard', 'The quadratic formula works for every quadratic equation.', 'True',
        'It is derived by completing the square on the general form, so it always applies.'),
    ],
  },
  {
    id: 'coldwar',
    title: 'The Cold War',
    keywords: ['cold war', 'soviet', 'ussr', 'berlin', 'nato', 'cuban', 'history', 'communism'],
    questions: [
      mcq('cw1', 'Easy', 'The Cold War was mainly a rivalry between which two powers?',
        ['USA and USSR', 'USA and China', 'UK and Germany', 'France and USSR'], 'USA and USSR',
        'Two superpowers competed without direct large-scale fighting between them.'),
      mcq('cw2', 'Easy', 'Which wall came to symbolise the divide in Europe?',
        ['Hadrian\'s Wall', 'The Berlin Wall', 'The Great Wall', 'The Maginot Line'], 'The Berlin Wall',
        'Built in 1961, it separated East and West Berlin until 1989.'),
      mcq('cw3', 'Easy', 'In which year did the Berlin Wall fall?',
        ['1985', '1987', '1989', '1991'], '1989',
        'It opened on 9 November 1989, two years before the USSR dissolved.'),
      mcq('cw4', 'Medium', 'The Cuban Missile Crisis took place in which year?',
        ['1959', '1962', '1968', '1972'], '1962',
        'A thirteen-day standoff over Soviet missiles stationed in Cuba.'),
      mcq('cw5', 'Medium', 'What was the Marshall Plan designed to do?',
        [
          'Rebuild Western European economies',
          'Create a joint nuclear arsenal',
          'Divide Germany into four zones',
          'Establish the United Nations',
        ],
        'Rebuild Western European economies',
        'US aid aimed to make communism less attractive in a recovering Europe.'),
      mcq('cw6', 'Medium', 'Which alliance did the USSR form in response to NATO?',
        ['The Warsaw Pact', 'The Triple Entente', 'The Axis', 'COMECON'], 'The Warsaw Pact',
        'Signed in 1955 as a mutual-defence bloc for the Eastern states.'),
      mcq('cw7', 'Medium', 'The policy of preventing the spread of communism was called:',
        ['Containment', 'Appeasement', 'Détente', 'Isolationism'], 'Containment',
        'Set out in the Truman Doctrine and shaped US strategy for decades.'),
      mcq('cw8', 'Hard', 'Which 1975 agreement marked a high point of détente on human rights?',
        ['The Helsinki Accords', 'The Yalta Agreement', 'SALT II', 'The Potsdam Declaration'],
        'The Helsinki Accords',
        'Thirty-five states accepted post-war borders alongside human-rights commitments.'),
      mcq('cw9', 'Hard', 'Glasnost, introduced by Gorbachev, refers to:',
        ['Openness', 'Restructuring', 'Collectivisation', 'Rearmament'], 'Openness',
        'Glasnost meant openness; perestroika was the economic restructuring.'),
      mcq('cw10', 'Hard', 'The Berlin Airlift of 1948–49 was a response to:',
        [
          'A Soviet blockade of West Berlin',
          'The building of the Berlin Wall',
          'The Prague Spring',
          'The Korean War',
        ],
        'A Soviet blockade of West Berlin',
        'Allied aircraft supplied the city by air for nearly a year.'),
      tf('cw11', 'Easy', 'The Cold War involved direct, declared war between the USA and USSR.', 'False',
        'The rivalry played out through proxy wars, spying and an arms race.'),
      tf('cw12', 'Easy', 'The Soviet Union dissolved in 1991.', 'True',
        'It formally ceased to exist in December 1991.'),
      tf('cw13', 'Medium', 'NATO was founded before the Warsaw Pact.', 'True',
        'NATO came in 1949; the Warsaw Pact followed in 1955.'),
      tf('cw14', 'Medium', 'The space race was part of Cold War competition.', 'True',
        'Sputnik and the Moon landings were prestige contests between the blocs.'),
      tf('cw15', 'Hard', 'Détente described a period of eased tension in the 1970s.', 'True',
        'It brought arms-limitation talks and more contact between the blocs.'),
    ],
  },
  {
    id: 'newton',
    title: "Newton's Laws",
    keywords: ['newton', 'force', 'motion', 'momentum', 'gravity', 'physics', 'inertia', 'acceleration'],
    questions: [
      mcq('nl1', 'Easy', "Newton's first law is also known as the law of:",
        ['Inertia', 'Gravitation', 'Momentum', 'Friction'], 'Inertia',
        'An object keeps its state of motion unless a net force acts on it.'),
      mcq('nl2', 'Easy', 'Which equation states Newton\'s second law?',
        ['F = ma', 'E = mc²', 'v = u + at', 'p = mv'], 'F = ma',
        'Net force equals mass times acceleration.'),
      mcq('nl3', 'Easy', 'What is the SI unit of force?',
        ['Joule', 'Newton', 'Watt', 'Pascal'], 'Newton',
        'One newton accelerates one kilogram at one metre per second squared.'),
      mcq('nl4', 'Medium', "Newton's third law says that forces always come in:",
        ['Equal and opposite pairs', 'Threes', 'Single directions', 'Diminishing series'],
        'Equal and opposite pairs',
        'The pair acts on two different bodies, which is why they do not cancel.'),
      mcq('nl5', 'Medium', 'A 5 kg object accelerates at 4 m/s². What net force acts on it?',
        ['9 N', '20 N', '1.25 N', '45 N'], '20 N',
        'F = ma = 5 × 4 = 20 N.'),
      mcq('nl6', 'Medium', 'Momentum is defined as:',
        ['Mass × velocity', 'Force × time', 'Mass × acceleration', 'Force / area'], 'Mass × velocity',
        'p = mv, and it is conserved in a closed system.'),
      mcq('nl7', 'Medium', 'Which quantity stays constant when no external force acts on a system?',
        ['Total momentum', 'Total acceleration', 'Total displacement', 'Total force'], 'Total momentum',
        'Conservation of momentum follows directly from the second and third laws.'),
      mcq('nl8', 'Hard', 'A ball bounces off a wall and reverses direction. What changed?',
        ['Its momentum', 'Its mass', 'Its weight', 'Nothing measurable'], 'Its momentum',
        'Momentum is a vector, so reversing direction changes it even at the same speed.'),
      mcq('nl9', 'Hard', 'Impulse is best described as:',
        ['Force applied over a time interval', 'Mass times gravity', 'Work done per second', 'Change of mass'],
        'Force applied over a time interval',
        'Impulse equals the change in momentum, which is why airbags lengthen impact time.'),
      mcq('nl10', 'Hard', 'Why does a rocket accelerate in the vacuum of space?',
        [
          'It pushes exhaust gases backwards',
          'It pushes against the air',
          'Gravity pulls it forwards',
          'Its mass increases',
        ],
        'It pushes exhaust gases backwards',
        'Third law: expelling mass one way pushes the rocket the other way — no air needed.'),
      tf('nl11', 'Easy', 'A moving object needs a constant force to keep moving at constant velocity.', 'False',
        'Without friction, no force is needed to maintain constant velocity.'),
      tf('nl12', 'Easy', 'Mass and weight mean the same thing.', 'False',
        'Mass is the amount of matter; weight is the force gravity exerts on that mass.'),
      tf('nl13', 'Medium', 'Action and reaction forces act on the same object.', 'False',
        'They act on two different objects, so they never cancel each other out.'),
      tf('nl14', 'Medium', 'Acceleration is proportional to net force for a fixed mass.', 'True',
        'Doubling the net force doubles the acceleration.'),
      tf('nl15', 'Hard', 'Newton\'s laws hold exactly at speeds approaching that of light.', 'False',
        'Relativity takes over; Newtonian mechanics is an approximation at low speeds.'),
    ],
  },
  {
    id: 'cells',
    title: 'Cell Structure',
    keywords: ['cell', 'organelle', 'membrane', 'mitochond', 'nucleus', 'ribosome', 'prokaryot', 'eukaryot'],
    questions: [
      mcq('cs1', 'Easy', 'Which organelle is called the powerhouse of the cell?',
        ['Nucleus', 'Mitochondrion', 'Golgi body', 'Lysosome'], 'Mitochondrion',
        'Mitochondria produce most of the cell\'s ATP through respiration.'),
      mcq('cs2', 'Easy', 'Which structure controls what enters and leaves the cell?',
        ['Cell membrane', 'Nucleolus', 'Cytoplasm', 'Vacuole'], 'Cell membrane',
        'Its phospholipid bilayer is selectively permeable.'),
      mcq('cs3', 'Easy', 'Where is a cell\'s DNA mainly stored in a eukaryote?',
        ['Nucleus', 'Ribosome', 'Cell wall', 'Vesicle'], 'Nucleus',
        'The nuclear envelope keeps chromosomes separate from the cytoplasm.'),
      mcq('cs4', 'Medium', 'Which organelle assembles proteins?',
        ['Ribosome', 'Lysosome', 'Centriole', 'Chloroplast'], 'Ribosome',
        'Ribosomes translate mRNA into chains of amino acids.'),
      mcq('cs5', 'Medium', 'What distinguishes a prokaryotic cell from a eukaryotic one?',
        [
          'It has no membrane-bound nucleus',
          'It has no DNA',
          'It cannot reproduce',
          'It has no cell membrane',
        ],
        'It has no membrane-bound nucleus',
        'Prokaryotes keep their DNA loose in the cytoplasm, in a nucleoid region.'),
      mcq('cs6', 'Medium', 'Which organelle packages and ships proteins?',
        ['Golgi apparatus', 'Nucleolus', 'Peroxisome', 'Cytoskeleton'], 'Golgi apparatus',
        'The Golgi modifies, sorts and dispatches proteins in vesicles.'),
      mcq('cs7', 'Medium', 'A plant cell has which structure that an animal cell lacks?',
        ['Cell wall', 'Mitochondrion', 'Nucleus', 'Ribosome'], 'Cell wall',
        'Plant cells add a rigid cellulose wall outside the membrane.'),
      mcq('cs8', 'Hard', 'Rough endoplasmic reticulum is "rough" because it is studded with:',
        ['Ribosomes', 'Lysosomes', 'Vacuoles', 'Chloroplasts'], 'Ribosomes',
        'Those ribosomes make proteins destined for secretion or membranes.'),
      mcq('cs9', 'Hard', 'Lysosomes primarily contain:',
        ['Digestive enzymes', 'Chlorophyll', 'Genetic material', 'Storage starch'], 'Digestive enzymes',
        'They break down worn-out organelles and engulfed material.'),
      mcq('cs10', 'Hard', 'Mitochondria having their own DNA supports which idea?',
        [
          'Endosymbiotic theory',
          'Cell theory',
          'Natural selection',
          'Fluid mosaic model',
        ],
        'Endosymbiotic theory',
        'They likely began as free-living bacteria taken in by an ancestral cell.'),
      tf('cs11', 'Easy', 'All living things are made of one or more cells.', 'True',
        'That is the first principle of cell theory.'),
      tf('cs12', 'Easy', 'Animal cells contain chloroplasts.', 'False',
        'Only plants and some protists photosynthesise.'),
      tf('cs13', 'Medium', 'The cell membrane is described by the fluid mosaic model.', 'True',
        'Proteins drift within a fluid bilayer of phospholipids.'),
      tf('cs14', 'Medium', 'Bacteria are eukaryotic cells.', 'False',
        'Bacteria are prokaryotes — no nucleus, no membrane-bound organelles.'),
      tf('cs15', 'Hard', 'Ribosomes are found in both prokaryotic and eukaryotic cells.', 'True',
        'Both need them to build proteins, though the sizes differ.'),
    ],
  },
];

const DIFFICULTY_ORDER: Difficulty[] = ['Easy', 'Medium', 'Hard'];

const shuffle = <T,>(items: T[]): T[] => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

// Pick a topic from the file name or pasted text so the questions feel
// connected to what the user actually supplied.
export const detectTopic = (hint: string) => {
  const haystack = hint.toLowerCase();
  const hit = TOPICS.find(topic => topic.keywords.some(word => haystack.includes(word)));
  return hit ?? TOPICS[Math.floor(Math.random() * TOPICS.length)];
};

export const topicTitle = (topicId: string) =>
  TOPICS.find(topic => topic.id === topicId)?.title ?? 'Your notes';

const matchesTypes = (question: BankQuestion, settings: QuizSettings) =>
  (question.kind === 'mcq' && settings.multipleChoice) ||
  (question.kind === 'boolean' && settings.trueFalse);

const withShuffledOptions = (question: BankQuestion): QuizQuestion => ({
  id: question.id,
  question: question.question,
  // True/False reads better in its natural order.
  options: question.kind === 'boolean' ? question.options : shuffle(question.options),
  answer: question.answer,
  explanation: question.explanation,
});

export const buildQuestions = (topicId: string, settings: QuizSettings): QuizQuestion[] => {
  const topic = TOPICS.find(item => item.id === topicId) ?? TOPICS[0];
  const others = TOPICS.filter(item => item.id !== topic.id);

  // Start on the requested difficulty, then widen outwards until there are
  // enough questions — a short bank should never produce a short quiz.
  const wanted = settings.questionCount;
  const picked: BankQuestion[] = [];
  const seen = new Set<string>();

  const take = (candidates: BankQuestion[]) => {
    for (const question of shuffle(candidates)) {
      if (picked.length >= wanted || seen.has(question.id)) continue;
      seen.add(question.id);
      picked.push(question);
    }
  };

  const byDifficulty = (pool: BankQuestion[], difficulty: Difficulty) =>
    pool.filter(question => matchesTypes(question, settings) && question.difficulty === difficulty);

  const orderedDifficulties = [
    settings.difficulty,
    ...DIFFICULTY_ORDER.filter(level => level !== settings.difficulty),
  ];

  for (const level of orderedDifficulties) {
    take(byDifficulty(topic.questions, level));
  }
  for (const level of orderedDifficulties) {
    for (const other of others) {
      take(byDifficulty(other.questions, level));
    }
  }
  // Both type toggles off would leave nothing — fall back to the whole topic.
  if (!picked.length) {
    take(topic.questions);
  }

  return picked.map(withShuffledOptions);
};

export const buildQuiz = (source: QuizSource, settings: QuizSettings): Quiz => {
  const questions = buildQuestions(source.topicId, settings);
  return {
    id: `quiz-${Date.now()}`,
    title: topicTitle(source.topicId),
    source,
    settings,
    questions,
    createdAt: Date.now(),
  };
};

export const availableQuestionCount = (topicId: string, settings: QuizSettings) => {
  const topic = TOPICS.find(item => item.id === topicId) ?? TOPICS[0];
  const own = topic.questions.filter(question => matchesTypes(question, settings)).length;
  const rest = TOPICS.filter(item => item.id !== topic.id)
    .reduce((total, item) => total + item.questions.filter(q => matchesTypes(q, settings)).length, 0);
  return own + rest;
};
