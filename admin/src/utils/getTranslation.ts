import { useIntl } from 'react-intl';
import { PLUGIN_ID } from '../pluginId';

const getTranslation = (id: string) => `${PLUGIN_ID}.${id}`;

const useTranslation = () => {
  const { formatMessage } = useIntl();
  return { formatMessage: (id: string) => formatMessage({ id: getTranslation(id) }) };
};

export { getTranslation, useTranslation };
