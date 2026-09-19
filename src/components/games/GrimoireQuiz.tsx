import { useState } from "react";
import { motion } from "framer-motion";
import { quizQuestions } from "../../data/quizQuestions";

type AnswerState = "idle" | "correct" | "wrong";

function getVerdict(score: number, total: number) {
  const ratio = score / total;
  if (ratio === 1) return "A perfect reading. You know her better than her own grimoire does.";
  if (ratio >= 0.7) return "Impressively fluent in all things Mia. The realm approves.";
  if (ratio >= 0.4) return "A respectable showing — a few more chronicles to study, perhaps.";
  return "The grimoire remains mysterious to you still. Time for a re-read!";
}

export function GrimoireQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[step];
  const progress = ((step + (finished ? 1 : 0)) / quizQuestions.length) * 100;

  const handleSelect = (index: number) => {
    if (answerState !== "idle") return;
    setSelected(index);
    const isCorrect = index === question.correctIndex;
    setAnswerState(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);

    window.setTimeout(() => {
      if (step + 1 < quizQuestions.length) {
        setStep((s) => s + 1);
        setSelected(null);
        setAnswerState("idle");
      } else {
        setFinished(true);
      }
    }, 700);
  };

  const handleRestart = () => {
    setStep(0);
    setScore(0);
    setSelected(null);
    setAnswerState("idle");
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="text-center">
        <p className="font-display text-2xl text-gold-soft sm:text-3xl">
          {score} / {quizQuestions.length}
        </p>
        <p className="mx-auto mt-4 max-w-md font-body italic text-mist">{getVerdict(score, quizQuestions.length)}</p>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-8 min-h-[44px] rounded-sm border border-gold px-6 py-2 font-body text-sm uppercase tracking-[0.15em] text-gold-soft transition-colors hover:bg-gold/10"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-panel-2">
        <motion.div
          className="h-full rounded-full bg-gold"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <p className="font-body text-xs uppercase tracking-[0.2em] text-mist">
        Question {step + 1} of {quizQuestions.length}
      </p>
      <h4 className="mt-2 font-display text-xl font-semibold text-parchment sm:text-2xl">
        {question.question}
      </h4>

      <div className="mt-6 grid gap-3">
        {question.options.map((option, index) => {
          let stateClasses = "border-gold/25 hover:border-gold-soft hover:bg-panel-2";
          if (answerState !== "idle" && selected === index) {
            stateClasses =
              answerState === "correct"
                ? "border-gold-soft bg-gold/15 text-gold-soft"
                : "border-wine bg-wine/20 text-parchment";
          } else if (answerState !== "idle" && index === question.correctIndex) {
            stateClasses = "border-gold-soft bg-gold/15 text-gold-soft";
          }

          return (
            <button
              key={option}
              type="button"
              disabled={answerState !== "idle"}
              onClick={() => handleSelect(index)}
              className={`min-h-[44px] rounded-sm border px-4 py-3 text-left font-body text-sm transition-colors duration-300 sm:text-base ${stateClasses}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
