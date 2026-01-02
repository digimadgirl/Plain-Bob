
import { WorkStage, GlossaryItem, QuizQuestion, Resource } from './types';

export const WORK_STAGES: WorkStage[] = [
  {
    name: "Make 2nds",
    description: "Hunt down to the front and lead. Stay in 2nds place for one blow (striking over the Treble), then lead again and hunt out.",
    trigger: "Go 2nds over the Treble.",
    visualCue: "Lead, 2nds, Lead."
  },
  {
    name: "3-4 Up Dodge",
    description: "Hunt down towards the front. Before you reach the lead, dodge back from 3rd place to 4th, then continue up to the back.",
    trigger: "Go 3rds over the Treble.",
    visualCue: "Step 3 -> 4 -> 3 -> 4 -> 5."
  },
  {
    name: "Four Blows Behind",
    description: "Also known as Long 5ths. Stay in 5ths place for 4 blows (two handstrokes and two backstrokes) while the Treble leads and others dodge.",
    trigger: "Go 4ths over the Treble.",
    visualCue: "Four steady blows at the back (5-5-5-5)."
  },
  {
    name: "3-4 Down Dodge",
    description: "Hunt up towards the back. Before you reach the 5ths place, dodge back from 4th place to 3rd, then continue down to lead.",
    trigger: "Go 5ths over the Treble.",
    visualCue: "Step 4 -> 3 -> 4 -> 3 -> 2 -> 1."
  }
];

export const GLOSSARY: GlossaryItem[] = [
  { term: "Lead", definition: "Ringing in the first place in a row. A full lead consists of two blows (handstroke and backstroke) at the front." },
  { term: "Treble", definition: "The smallest and highest-pitched bell. In Plain Bob it always rings a steady 'plain hunt' path." },
  { term: "Tenor", definition: "The largest and lowest-pitched bell. In Doubles, it usually rings in 6th place as a 'cover' bell, never changing its position." },
  { term: "Dodging", definition: "Changing the direction of hunting for one blow to swap places with another bell, then returning to the original direction." },
  { term: "Rounds", definition: "The basic sequence where bells ring in descending order of pitch (1 2 3 4 5)." },
  { term: "Hunting", definition: "Moving a bell one place earlier or later in each successive row (e.g., moving from 1st to 2nd to 3rd place)." },
  { term: "Plain Hunt", definition: "The simplest form of change ringing where bells move continuously from lead to the back and back again." },
  { term: "Place Bell", definition: "Your identity for a single lead, determined by which position you start in after the Treble leads." },
  { term: "Bob", definition: "A call made by the conductor at the lead end. It changes the work: bells that would dodge instead 'run in', 'run out', or 'make 4ths'." },
  { term: "Single", definition: "A call similar to a Bob, but even more restrictive, typically used to swap two bells while others remain stationary." },
  { term: "Handstroke Gap", definition: "The small rhythmic pause after the last bell (the Tenor) rings at backstroke, before the Treble starts the next handstroke row." },
  { term: "Sally", definition: "The thick, woolly, colored part of the bell rope that you catch during the handstroke." },
  { term: "Tail End", definition: "The very end of the rope, often doubled over into a loop, which is held throughout both strokes." },
  { term: "Whole Pull", definition: "Two successive blows of a bell, consisting of one handstroke followed by one backstroke." },
  { term: "Blow", definition: "A single strike of the bell at either handstroke or backstroke." },
  { term: "Course", definition: "A series of leads that brings all the bells back to their original starting positions in Rounds." },
  { term: "Plain Course", definition: "The complete sequence of the method rung from start to finish without any Bobs or Singles being called." },
  { term: "Rope-sight", definition: "The skill of seeing which bell to follow next by watching the movement of the other ringers' ropes." },
  { term: "Conductor", definition: "The ringer who is responsible for keeping the rhythm and calling out Bobs or Singles to change the method's path." },
  { term: "Row", definition: "A single sequence in which each bell in the set strikes exactly once." },
  { term: "Backstroke", definition: "The second half of a whole pull, where the ringer pulls the tail end of the rope and the bell rotates back." },
  { term: "Handstroke", definition: "The first half of a whole pull, where the ringer catches and pulls the sally." },
  { term: "Checking", definition: "Pulling the rope slightly harder or earlier to stop the bell's swing and make it ring faster." }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "If you 'Go 2nds over the Treble', what work do you perform next?",
    options: ["Dodge 3-4 Down", "Make 2nds", "Four blows behind", "Dodge 3-4 Up"],
    correctIndex: 1,
    explanation: "Striking in 2nds place over the Treble (which is leading) signals that you must Make 2nds."
  },
  {
    question: "What is the sequence of work in a full Plain Course of Bob Doubles?",
    options: ["Make 2nds, 3-4 Up, Four behind, 3-4 Down", "Make 2nds, 3-4 Down, Four behind, 3-4 Up", "3-4 Up, Make 2nds, 3-4 Down, Four behind", "Four behind, 3-4 Up, Make 2nds, 3-4 Down"],
    correctIndex: 1,
    explanation: "The standard circle of work is: Make 2nds -> 3-4 Down -> Four blows behind -> 3-4 Up."
  },
  {
    question: "During a 3-4 Down dodge, which path is correct?",
    options: ["Hunt up to 5ths, then dodge", "Hunt down to 1st, then dodge", "Hunt up, dodge 4-3, then hunt down to lead", "Stay at 3rd place for 4 blows"],
    correctIndex: 2,
    explanation: "In a 3-4 Down dodge, you hunt up, dodge 4-3 when the treble leads, then continue hunting down to lead."
  }
];

// Correct 40-row Plain Course for Plain Bob Doubles
export const METHOD_GRID = [
  [1, 2, 3, 4, 5], // 0: Rounds
  [2, 1, 4, 3, 5], // 1
  [2, 4, 1, 5, 3], // 2
  [4, 2, 5, 1, 3], // 3
  [4, 5, 2, 3, 1], // 4
  [5, 4, 3, 2, 1], // 5
  [5, 3, 4, 1, 2], // 6
  [3, 5, 1, 4, 2], // 7
  [3, 1, 5, 2, 4], // 8
  [1, 3, 2, 5, 4], // 9: Treble Handstroke Lead
  [1, 3, 5, 2, 4], // 10: Lead End 1 (3 makes 2nds, 5-2 dodge, 4 long 5ths)
  [3, 1, 2, 5, 4], // 11
  [3, 2, 1, 4, 5], // 12
  [2, 3, 4, 1, 5], // 13
  [2, 4, 3, 5, 1], // 14
  [4, 2, 5, 3, 1], // 15
  [4, 5, 2, 1, 3], // 16
  [5, 4, 1, 2, 3], // 17
  [5, 1, 4, 3, 2], // 18
  [1, 5, 3, 4, 2], // 19
  [1, 5, 4, 3, 2], // 20: Lead End 2 (5 makes 2nds, 4-3 dodge, 2 long 5ths)
  [5, 1, 3, 4, 2], // 21
  [5, 3, 1, 2, 4], // 22
  [3, 5, 2, 1, 4], // 23
  [3, 2, 5, 4, 1], // 24
  [2, 3, 4, 5, 1], // 25
  [2, 4, 3, 1, 5], // 26
  [4, 2, 1, 3, 5], // 27
  [4, 1, 2, 5, 3], // 28
  [1, 4, 5, 2, 3], // 29
  [1, 4, 2, 5, 3], // 30: Lead End 3 (4 makes 2nds, 2-5 dodge, 3 long 5ths)
  [4, 1, 5, 2, 3], // 31
  [4, 5, 1, 3, 2], // 32
  [5, 4, 3, 1, 2], // 33
  [5, 3, 4, 2, 1], // 34
  [3, 5, 2, 4, 1], // 35
  [3, 2, 5, 1, 4], // 36
  [2, 3, 1, 5, 4], // 37
  [2, 1, 3, 4, 5], // 38
  [1, 2, 4, 3, 5], // 39
  [1, 2, 3, 4, 5]  // 40: Rounds
];

export const RESOURCES: Resource[] = [
  { id: '1', title: 'Plain Bob Doubles: RingBell Guide', url: 'https://www.ringbell.co.uk/methods/pb5.htm', category: 'Website' },
  { id: '2', title: 'CCCBR: Method Ringing Resource', url: 'https://cccbr.org.uk/learn/method-ringing/plain-bob-doubles/', category: 'Website' },
  { id: '3', title: 'Tower Bells: Plain Bob Visualizer', url: 'https://www.towerbells.org/change-ringing/plain-bob-doubles.html', category: 'Interactive' }
];
