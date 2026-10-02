import { useState } from 'react';

export default function ChatLauncher() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const loadChat = () => {
    setStatus('loading');
    const script = document.createElement('script');
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.dataset.resourcesUrl = 'https://widgets.leadconnectorhq.com/chat-widget/loader.js';
    script.dataset.widgetId = '6a6a7e6fdf71a59238cfb6fa';
    script.dataset.source = 'WEB_USER';
    script.onload = () => setStatus('ready');
    script.onerror = () => { script.remove(); setStatus('error'); };
    document.body.appendChild(script);
  };
  if (status === 'ready') return null;
  return <aside className="chat-launcher" aria-label="Chat support">
    {status === 'error' && <p role="status">Chat unavailable. <a href="tel:+16195810010">Call (619) 581-0010</a>.</p>}
    <button type="button" onClick={loadChat} disabled={status === 'loading'}>
      {status === 'loading' ? 'Loading chat…' : 'Chat with us'}
    </button>
  </aside>;
}
