// The Grimoire's contents. Edit freely — each story chapter is an array of
// pages (one paragraph or two per page), and the final chapter is a set of
// joke "spells" cast on Jonathan. Add/remove pages or spells without
// touching any component code.

export type GrimoireSpell = {
  id: string;
  name: string;
  incantation: string;
  effect: string;
};

export type GrimoireStoryChapter = {
  id: string;
  kind: "story";
  title: string;
  teaser: string;
  pages: string[];
};

export type GrimoireSpellChapter = {
  id: string;
  kind: "spells";
  title: string;
  teaser: string;
  spells: GrimoireSpell[];
};

export type GrimoireChapter = GrimoireStoryChapter | GrimoireSpellChapter;

export const grimoireChapters: GrimoireChapter[] = [
  {
    id: "sleeping-castle",
    kind: "story",
    title: "The Sorceress and the Sleeping Castle",
    teaser: "A castle that hadn't lit its towers in a hundred years — until someone worth waking for arrived.",
    pages: [
      "Every map of the northern cliffs marks the same castle, and every mapmaker adds the same quiet caveat beside it: asleep. Not ruined. Not abandoned. Asleep, the way something enormous and old can be asleep — waiting, not dying. Its towers hadn't held a lit window in longer than anyone could verify, and the village at its feet had long since stopped watching the horizon for smoke from its chimneys.",
      "Plenty had tried to wake it. A prince with a very shiny sword. A choir, on the theory that beautiful enough singing could rouse anything. A committee, at one point, which achieved nothing except a strongly worded report. The castle stayed dark through all of it, patient in the specific way ancient things are patient — like it knew the difference between someone arriving, and someone arriving for the right reason.",
      "She didn't arrive with an army or an argument. She arrived on foot, at dusk, with an orb cupped loosely in both hands the way you'd carry something you trusted not to fall. It wasn't glowing when she started up the cliff path. By the time she reached the gate, it was — not because she'd commanded it to, witnesses agree, but because it had simply recognized where it was standing, and who was holding it.",
      "The dragon met her at the second gate, which is traditionally where dragons meet people, and traditionally the part where people either negotiate or catch fire. It circled once, low, the way you'd look someone up and down at a party to decide if they were worth talking to. She didn't raise the orb. She didn't run. She just waited, the way you wait for someone to finish deciding something about you that you already know the answer to.",
      "The dragon landed. That was the whole confrontation — it landed, folded its wings, and looked at her the way old, tired things look at someone who might finally be interesting enough to stay awake for. Scholars still argue about what was actually said in that courtyard. The dragon isn't talking. She's never been especially forthcoming about it either, which everyone agrees is very on brand.",
      "The lights came on one window at a time, starting at the top and working down, like the castle was stretching after a very long nap. By morning every tower held a flame, and the village at the base of the cliff woke to smoke over the chimneys for the first time in a generation. The official chronicles list it plainly: this was the day the realm got its sorceress back. They don't add much else. They don't really need to.",
    ],
  },
  {
    id: "wolf-throne",
    kind: "story",
    title: "The Wolf Who Chose Her Throne",
    teaser: "Wolves don't kneel. This one made an exception.",
    pages: [
      "Wolves do not kneel. It's one of the oldest rules in the realm, older than most of its kingdoms, and considerably better enforced — nobody has ever successfully commanded a wolf to do anything it didn't already feel like doing. The black wolf that guarded the throne road was, by every account, an exceptionally committed example of the rule. It answered to no one. It had outlasted four different court appointments whose entire job description was \"wolf handler.\"",
      "The throne room itself had a reputation of its own: grand, freezing, and mostly ceremonial, the kind of room built to remind visitors they were small. Candles lined the walls in numbers that suggested someone had once cared deeply about the room's lighting budget and then stopped caring at all about anyone's safety. The wolf slept near the doors, which everyone agreed was sensible, since doors are where trouble tends to arrive from.",
      "She didn't arrive through the doors loudly, the way court business usually did. She came in quietly, found the throne, and sat down in it before anyone had formally offered it to her — which by every rule of etiquette should have gone over terribly, and by every account, simply didn't. The room went quiet in the particular way rooms go quiet when everyone present is recalculating who's actually in charge.",
      "The wolf noticed first. It always notices who deserves the room's attention before the room itself works it out — it's practically the job description. It got up, crossed the entire freezing length of that hall in front of the full assembled court, and sat down at her feet like it had been meaning to do this for years and had simply been waiting for the right person to make the walk worth it.",
      "Nobody in the room dared say anything about it, which was, on reflection, the correct call. Court advisors who had spent decades trying to win that wolf's trust with meat, praise, and one memorably disastrous attempt at a leash watched it choose her in under a minute, for reasons it had clearly decided were none of their business.",
      "It still sleeps there — at her feet, through every council, unbothered by crowns, candlelight, or the general chaos of governing a realm that argues about everything except this. It found the one thing wolves are famously terrible at finding: someone worth staying for. It hasn't looked for anything else since.",
    ],
  },
  {
    id: "ember",
    kind: "story",
    title: "The Ember That Refused to Die",
    teaser: "Every realm has an origin story. This is the least disputed one.",
    pages: [
      "Every realm has an origin story, and every origin story gets argued about at dinner parties by people who weren't there. This one is the least disputed of the lot, mostly because it's almost insultingly simple: it began with a single ember that, by every law of physics and tradition, should have gone out — and simply declined to.",
      "Historians have theories, because historians always have theories. Stubbornness, mostly. A refusal to be anything as forgettable as ash. One particularly persistent academic spent thirty years arguing it was pure spite directed at a wind that tried to put it out on a specific Tuesday, several centuries ago. He was never able to prove it. He was also never able to disprove it, which he considered a personal victory.",
      "It traveled. Through storms that should have drowned it a hundred times over. Through centuries that tried, in the ordinary way centuries do, to simply forget it existed. It crossed oceans it had no business crossing, survived wars it had no stake in, and outlasted at least three empires that were, at the time, extremely confident about their own permanence.",
      "It always found somewhere to land — a wick here, a hearth there, a candle held by someone who needed the light more than they knew. It was never picky about the venue. It just needed something willing to let it stay lit a little longer than expected, and it had an uncanny talent for finding exactly that, in exactly the right hands, at exactly the right moment.",
      "They say it's still out there, somewhere east of the maps, burning quietly in whatever it's currently decided is worth warming. They also say — and this part gets repeated more than the rest — that it has excellent taste in which stories it chooses to stay in. It doesn't linger in boring ones. It's picky that way.",
      "This one, clearly, made the cut. Make of that what you will — the ember certainly has opinions, even if it's never once explained them. Some things don't need footnotes. They just need someone willing to keep reading.",
    ],
  },
  {
    id: "spells-on-jonathan",
    kind: "spells",
    title: "Spells to Cast on Jonathan",
    teaser: "Turn the final pages carefully. These incantations are best used sparingly.",
    spells: [
      {
        id: "spell-obedience",
        name: "Incantation of Instant Obedience",
        incantation: "By ember and oath, thy stubbornness now bends.",
        effect: "Compels Jonathan to admit he's wrong within ten seconds — no follow-up arguments permitted.",
      },
      {
        id: "spell-silencing",
        name: "The Silencing Hex",
        incantation: "Let his excuses turn to smoke and drift away.",
        effect: "Renders Jonathan incapable of saying \"in a minute\" when asked to do something right now.",
      },
      {
        id: "spell-errand",
        name: "Charm of the Unasked Errand",
        incantation: "Let his feet walk where my patience has worn thin.",
        effect: "Summons Jonathan, unprompted, with snacks exactly when the craving hits.",
      },
      {
        id: "spell-patience",
        name: "Ritual of the Bottomless Patience",
        incantation: "Bind his temper to the calm of still water.",
        effect: "Grants Jonathan infinite patience for rewatching the same show for the fifth time.",
      },
      {
        id: "spell-truth",
        name: "The Truth-Telling Draft",
        incantation: "Speak now the thought you were about to hide.",
        effect: "Forces Jonathan to confess exactly why he's twenty minutes late — no excuses invented on the spot.",
      },
      {
        id: "spell-devotion",
        name: "The Devotion Binding",
        incantation: "Let this spell need no renewal, only time.",
        effect: "A lasting one: permanently binds Jonathan to remembering your birthday, every year, without a reminder.",
      },
    ],
  },
];
