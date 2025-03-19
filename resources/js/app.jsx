import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { setAuth } from './redux/authSlice';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import './i18n.js';
import withLayout from './withLayout'; // Import the HOC

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: async (name) => {
    const page = (await resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))).default;
    return withLayout(page); // Wrap the resolved page component with the HOC
  },
  setup({ el, App, props }) {
    store.dispatch(setAuth(props.initialPage.props.auth));
    const root = createRoot(el);

    root.render(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
