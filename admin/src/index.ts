import { TestAction } from './components/DropdownAction';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';

export default {
  register(app: any) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async bootstrap(app: any) {
    app
      .getPlugin('content-manager')
      .apis.addDocumentAction((actions: any[]) => [
        ...actions.filter((a) => a.name !== 'DeleteAction'),
        TestAction,
        ...actions.filter((a) => a.name === 'DeleteAction'),
      ]);
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          const prefixedData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [`${PLUGIN_ID}.${key}`, value])
          );
          return { data: prefixedData, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
