import { useRef, useState } from 'react';

type Props = { targetId: string; title: string; disabled?: boolean; relatedIds?: string[] };

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character] ?? character);

function copySection(source: HTMLElement): string {
  const copy = source.cloneNode(true) as HTMLElement;

  const originalControls = source.querySelectorAll('input, select, textarea');
  const copiedControls = copy.querySelectorAll('input, select, textarea');
  originalControls.forEach((control, index) => {
    const copied = copiedControls[index];
    if (control instanceof HTMLInputElement && copied instanceof HTMLInputElement) {
      copied.value = control.value;
      copied.setAttribute('value', control.value);
      copied.checked = control.checked;
      if (control.checked) copied.setAttribute('checked', '');
      else copied.removeAttribute('checked');
    } else if (control instanceof HTMLSelectElement && copied instanceof HTMLSelectElement) {
      Array.from(copied.options).forEach(option => {
        option.selected = option.value === control.value;
        if (option.selected) option.setAttribute('selected', '');
        else option.removeAttribute('selected');
      });
    } else if (control instanceof HTMLTextAreaElement && copied instanceof HTMLTextAreaElement) {
      copied.textContent = control.value;
    }
  });

  copy.querySelectorAll('details').forEach(details => { details.open = true; });
  copy.querySelectorAll('script, iframe, dialog, form, button, .consultation-cta, .report-actions').forEach(element => element.remove());
  return copy.outerHTML;
}

function reportHtml(targetId: string, title: string, relatedIds: string[]): string | null {
  const sources = [...relatedIds, targetId].map(id => document.getElementById(id));
  if (sources.some(source => !source)) return null;
  const content = sources.map(source => copySection(source!)).join('\n');

  const styles = Array.from(document.styleSheets).map(sheet => {
    try { return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n'); }
    catch { return ''; }
  }).join('\n').replace(/<\/style/gi, '<\\/style');
  const generated = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date());
  const sourceUrl = `${location.origin}${location.pathname}#${targetId}`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)} | Broussard Financial Services</title><style>${styles}\n
    body{margin:0;background:white;color:#243e35;font-family:Arial,sans-serif}
    .report-shell{max-width:960px;margin:0 auto;padding:32px 24px}
    .report-head{border-bottom:2px solid #243e35;margin-bottom:24px;padding-bottom:16px}
    .report-head strong{display:block;font-size:18px;margin-bottom:8px}
    .report-head h1{font-size:32px;line-height:1.2;margin:0 0 8px}
    .report-head p,.report-foot{font-size:12px;color:#444;line-height:1.5}
    .report-actions{margin:16px 0 24px}
    .report-actions button{padding:12px 18px;border:0;border-radius:5px;background:#243e35;color:white;font:inherit;cursor:pointer}
    .embedded-preview .report-actions{display:none}
    .report-shell .planning-page{padding:0;max-width:none}
    .report-shell .planning-card{margin:0}
    .report-foot{border-top:1px solid #ccc;margin-top:24px;padding-top:12px}
    @media print{.report-shell{padding:0;max-width:none}.report-actions{display:none!important}.report-foot{display:block!important}.report-head{break-inside:avoid-page}.planning-card{break-inside:auto}a{color:inherit;text-decoration:none}body{print-color-adjust:exact}}
  </style></head><body><main class="report-shell"><header class="report-head"><strong>Broussard Financial Services</strong><h1>${escapeHtml(title)}</h1><p>Prepared ${escapeHtml(generated)} from ${escapeHtml(sourceUrl)}. Your entries were processed in your browser; this report was not sent to us.</p></header><div class="report-actions"><button type="button" onclick="window.print()">Print or save as PDF</button></div><div class="planning-page">${content}</div><footer class="report-foot">Educational planning illustration, not a personalized recommendation or a guarantee. Review the assumptions and limitations above before relying on these numbers. Keep saved reports in a secure location.</footer></main></body></html>`;
}

export default function ReportActions({ targetId, title, disabled = false, relatedIds = [] }: Props) {
  const [preview, setPreview] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const create = () => reportHtml(targetId, title, relatedIds);
  const fileName = `${targetId}-report.html`;

  function print() {
    const html = create();
    if (!html) return;
    setPreview(html);
    dialog.current?.showModal();
  }

  function download() {
    const html = create();
    if (!html) return;
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <div className="report-actions" role="group" aria-label={`${title} report`}>
    <button type="button" className="tool-button" onClick={print} disabled={disabled}>Preview / print PDF report</button>
    <button type="button" className="tool-button report-download" onClick={download} disabled={disabled}>Download report</button>
    <small>Download saves an HTML copy. The print dialog can save a PDF.</small>
    <dialog ref={dialog} className="report-preview" onClose={() => setPreview('')} aria-label={`${title} report preview`}>
      <div className="report-preview-controls">
        <strong>{title} report</strong>
        <button type="button" className="tool-button" onClick={() => frame.current?.contentWindow?.print()}>Print / save as PDF</button>
        <button type="button" className="tool-button report-download" onClick={() => dialog.current?.close()}>Close preview</button>
      </div>
      <iframe ref={frame} title={`${title} printable report`} srcDoc={preview.replace('<body>', '<body class="embedded-preview">')} />
    </dialog>
  </div>;
}
