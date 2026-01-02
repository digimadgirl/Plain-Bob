
import { WorkStage, GlossaryItem, QuizQuestion, Resource } from './types';

export const WORK_STAGES: WorkStage[] = [
  {
    name: "Make 2nds",
    description: "Hunt down to the front and lead. Stay in 2nds place for one blow (over the bell that just led), then lead again and hunt out.",
    trigger: "When you are the 'Seconds Place Bell'.",
    visualCue: "Treble leads, then you stay in 2nds."
  },
  {
    name: "3-4 Down Dodge",
    description: "Hunt up towards the back. When the Treble leads, step back one place (towards lead) then continue up.",
    trigger: "Hunting up, meet Treble at lead.",
    visualCue: "Step 4 -> 3 -> 4 -> 5."
  },
  {
    name: "Long 5ths",
    description: "Stay at the back (5ths place) for four blows in total. This occurs while the Treble leads and other bells dodge.",
    trigger: "Arrive at 5ths place just as Treble leads.",
    visualCue: "1-2-3-4 blows at the back."
  },
  {
    name: "3-4 Up Dodge",
    description: "Hunt down towards the front. When the Treble leads, step back one place (towards the back) then continue down.",
    trigger: "Hunting down, meet Treble at lead.",
    visualCue: "Step 3 -> 4 -> 3 -> 2 -> 1."
  }
];

export const GLOSSARY: GlossaryItem[] = [
  { term: "Lead", definition: "Ringing in the first place in a row. A full lead consists of two blows (handstroke and backstroke) at the front." },
  { term: "Treble", definition: "The smallest and highest-pitched bell in the set. In Plain Bob poured always rings a steady 'plain hunt' path." },
  { term: "Tenor", definition: "The largest and lowest-pitched bell. In Doubles, it usually rings in 6th place as a 'cover' bell, never changing its position." },
  { term: "Dodging", definition: "Changing the direction of hunting for one blow to swap places with another bell, then returning to the original direction." },
  { term: "Rounds", definition: "The basic sequence where bells ring in descending order of pitch (1 2 3 4 5 6)." },
  { term: "Hunting", definition: "Moving a bell one place earlier or later in each successive row (e.g., moving from 1st to 2nd to 3rd place)." },
  { term: "Plain Hunt", definition: "The simplest form of change ringing where bells move continuously from lead to the back and back again." },
  { term: "Work", definition: "The specific 'dodges' or 'places' a bell must perform at a lead end to vary the sequence from plain hunting." },
  { term: "Lead End", definition: "The specific row that occurs when the Treble bell is leading its second blow (the backstroke lead)." },
  { term: "Blue Line", definition: "The visual representation of the path a single bell takes through the various rows of a method." },
  { term: "Blow", definition: "A single strike of a bell." }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "How many bells participate in the changing patterns of Plain Bob Doubles?",
    options: ["4", "5", "6", "12"],
    correctIndex: 1,
    explanation: "Plain Bob 'Doubles' is rung on 5 bells. Any 6th bell typically rings a 'cover' in 6ths place."
  },
  {
    question: "At a standard lead end, what work does the bell perform if it is 'turned from lead' by the Treble?",
    options: ["Dodge 3-4 Up", "Dodge 3-4 Down", "Make 2nds", "Long 5ths"],
    correctIndex: 2,
    explanation: "When the Treble leads, the bell it just replaced at lead makes 2nds place and leads again."
  },
  {
    question: "How many blows are rung in 5ths place for 'Long 5ths'?",
    options: ["2", "3", "4", "5"],
    correctIndex: 2,
    explanation: "Long 5ths consists of 4 blows in 5ths place (two at handstroke, two at backstroke) while other work happens below."
  },
  {
    question: "What is the Conductor's primary tool for extending a touch of Plain Bob Doubles?",
    options: ["Ringing the Treble", "Calling 'Bob' or 'Single'", "Counting aloud", "Changing the rhythm"],
    correctIndex: 1,
    explanation: "The Conductor calls 'Bob' or 'Single' at specific lead ends to change the sequence of work and extend the length of the ringing."
  },
  {
    question: "In bell ringing, what does 'Hunting Up' mean?",
    options: ["Moving toward 1st place", "Moving toward the back (5ths/6ths place)", "Ringing faster", "Stopping the bell"],
    correctIndex: 1,
    explanation: "'Up' refers to moving toward the higher-numbered places (the back of the row)."
  },
  {
    question: "When hunting down toward lead and you meet the Treble in 1st place, what piece of work do you do next?",
    options: ["Make 2nds", "Long 5ths", "3-4 Up Dodge", "3-4 Down Dodge"],
    correctIndex: 2,
    explanation: "Meeting the Treble as it leads while you are hunting down triggers a 3-4 Up dodge."
  },
  {
    question: "Which bell is considered the 'Seconds Place Bell' at the very start of a plain course?",
    options: ["The Treble", "The 2", "The 3", "The 5"],
    correctIndex: 1,
    explanation: "In Rounds (1 2 3 4 5), the 2 is in 2nds place and starts as the 'Seconds Place Bell'."
  },
  {
    question: "What is the correct 'Circle of Work' sequence for Plain Bob Doubles?",
    options: ["2nds -> 5ths -> 3-4 Up -> 3-4 Down", "2nds -> 3-4 Down -> 5ths -> 3-4 Up", "3-4 Up -> 3-4 Down -> 2nds -> 5ths", "5ths -> 2nds -> 3-4 Up -> 3-4 Down"],
    correctIndex: 1,
    explanation: "The standard progression is: Make 2nds, Dodge 3-4 Down, Long 5ths, Dodge 3-4 Up, then back to 2nds."
  },
  {
    question: "How many blows make up a full 'Lead' at the front?",
    options: ["1", "2", "3", "4"],
    correctIndex: 1,
    explanation: "A lead at the front consists of 2 blows: one at handstroke and one at backstroke."
  },
  {
    question: "If a 'Bob' is called, what does the bell about to make 2nds do instead?",
    options: ["Makes 4ths", "Dodge 3-4 Up", "Runs out (hunts to the back)", "Stops ringing"],
    correctIndex: 2,
    explanation: "When a Bob is called, the bell that was going to make 2nds 'runs out' and becomes the 3-4 Down dodging bell at the next lead end."
  }
];

// Full Plain Course of Plain Bob Doubles (40 rows)
export const METHOD_GRID = [
  [1, 2, 3, 4, 5], // Lead 1 Start
  [2, 1, 4, 3, 5], [2, 4, 1, 5, 3], [4, 2, 5, 1, 3], [4, 5, 2, 3, 1],
  [5, 4, 3, 2, 1], [5, 3, 4, 1, 2], [3, 5, 1, 4, 2], [3, 1, 5, 2, 4],
  [1, 3, 2, 5, 4], // Row 10: Lead End (Treble Backstroke Lead)
  [1, 3, 5, 2, 4], // Lead 2 Start (after 2nds made, 3-4 dodge)
  [3, 1, 2, 5, 4], [3, 2, 1, 4, 5], [2, 3, 4, 1, 5], [2, 4, 3, 5, 1],
  [4, 2, 5, 3, 1], [4, 5, 2, 1, 3], [5, 4, 1, 2, 3], [5, 1, 4, 3, 2],
  [1, 5, 4, 3, 2], // Row 20: Lead End
  [1, 5, 3, 4, 2], // Lead 3 Start
  [5, 1, 4, 3, 2], [5, 4, 1, 2, 3], [4, 5, 2, 1, 3], [4, 2, 5, 3, 1],
  [2, 4, 3, 5, 1], [2, 3, 4, 1, 5], [3, 2, 1, 4, 5], [3, 1, 2, 5, 4],
  [1, 3, 4, 2, 5], // Row 30: Lead End
  [1, 4, 2, 3, 5], // Lead 4 Start
  [4, 1, 3, 2, 5], [4, 3, 1, 5, 2], [3, 4, 5, 1, 2], [3, 5, 4, 2, 1],
  [5, 3, 2, 4, 1], [5, 2, 3, 1, 4], [2, 5, 1, 3, 4], [2, 1, 5, 4, 3],
  [1, 2, 5, 4, 3], // Row 40: Treble Handstroke lead
  [1, 2, 3, 4, 5]  // Row 41: Rounds (Treble Backstroke lead)
];

// Resources for the library
export const RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Plain Bob Doubles: A Ringer\'s Guide',
    url: 'https://cccbr.org.uk/wp-content/uploads/2016/03/Plain-Bob-Doubles.pdf',
    category: 'PDF'
  },
  {
    id: '2',
    title: 'The Blue Line Explorer',
    url: 'https://www.blueline.uk.com/methods/plain-bob-doubles',
    category: 'Interactive'
  },
  {
    id: '3',
    title: 'Central Council of Church Bell Ringers',
    url: 'https://cccbr.org.uk/',
    category: 'Website'
  },
  {
    id: '4',
    title: 'Learning the Ropes: Method Ringing',
    url: 'https://learningtheropes.org/',
    category: 'Website'
  }
];
