import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../font-faces/geist.css';
import '../font-faces/geist-mono.css';
import '../font-faces/google-sans-flex.css';
import '../lib/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
