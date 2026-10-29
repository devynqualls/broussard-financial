import './HelpHint.css';

export default function HelpHint({ text }: { text: string }) {
  return <span className="calculator-help" tabIndex={0} role="note" aria-label={text} data-help={text}>?</span>;
}
