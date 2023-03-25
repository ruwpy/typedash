import { memo, useEffect, useRef } from "react";

interface WordProps {
  text: string;
  isActive: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
}

export default memo(function Word({
  text,
  isActive,
  isCorrect,
  isIncorrect,
}: WordProps) {
  if (isActive) return <span className="word active">{text}</span>;
  if (isCorrect) return <span className="word correct">{text}</span>;
  if (isIncorrect) return <span className="word incorrect">{text}</span>;

  return <span className="word">{text}</span>;
});
