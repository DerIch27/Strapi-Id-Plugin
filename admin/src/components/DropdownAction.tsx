import { Link as LinkIcon } from '@strapi/icons';
import { useTranslation } from '../utils/getTranslation';
import { useClipboard } from '@strapi/strapi/admin';

export const TestAction = ({ model, documentId }: { model: string; documentId?: string }) => {
  const { formatMessage } = useTranslation();
  const { copy } = useClipboard();
  if (!documentId) return null;
  return {
    disabled: false,
    icon: <LinkIcon />,
    label: formatMessage('copy-id-list-view'),
    position: ['table-row', 'header'],
    onClick: () => {
      copy(documentId);
      return null;
    },
    dialog: {
      type: 'notification',
      content:
        formatMessage('copy-id-list-view-notification-1') +
        documentId +
        formatMessage('copy-id-list-view-notification-2'),
      status: 'info',
    },
  };
};
