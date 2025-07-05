import { hydrateRoot } from 'react-dom/client';
import { WidgetContainer } from './components/widget-container';
import './styles/style.css';
import { log } from 'console';

function initializeWidget() {
  if (document.readyState !== 'loading') {
    onReady();
  } else {
    document.addEventListener('DOMContentLoaded', onReady);
  }
}

function onReady() {
  try {
    const placeholder =
      document.querySelector('[data-widget-placeholder]') || document.body;

    const element = document.createElement('div');
    const shadow = element.attachShadow({ mode: 'open' });
    const shadowRoot = document.createElement('div');
    const clientKey = getClientKey();

    shadowRoot.id = 'widget-root';

    const component = <WidgetContainer clientKey={clientKey} />;

    shadow.appendChild(shadowRoot);
    injectStyle(shadowRoot);
    hydrateRoot(shadowRoot, component);

    placeholder.appendChild(element);
  } catch (error) {
    console.warn('Widget initialization failed:', error);
  }
}

function injectStyle(shadowRoot: HTMLElement) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  const fileName = process.env.WIDGET_NAME || 'widget';
  link.href = process.env.WIDGET_CSS_URL || `/${fileName}.css`;
  shadowRoot.appendChild(link);
  console.log(`Widget CSS loaded from:`);
}

function getClientKey() {
  const script = document.currentScript as HTMLScriptElement;
  const clientKey = script?.getAttribute('data-client-key');

  if (!clientKey) {
    throw new Error('Missing data-client-key attribute');
  }

  return clientKey;
}

initializeWidget();
