import React from 'react';
import dayjs from 'dayjs';
import { IconButton, ListItem } from '@mui/material';
import { DeleteOutline, RestoreOutlined } from '@mui/icons-material';
import { TrashPB } from '@/services/backend';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

function TrashItem({
  item,
  hoverId,
  setHoverId,

  onDelete,
  onPutback,
}: {
  setHoverId: (id: string) => void;
  item: TrashPB;
  hoverId: string;
  onPutback: (id: string) => void;
  onDelete: (ids: string[]) => void;
}) {
  const { t } = useTranslation();

  return (
    <ListItem
      onMouseEnter={(e) => {
        setHoverId(item.id);
      }}
      onMouseLeave={(e) => {
        setHoverId('');
      }}
      key={item.id}
      style={{
        paddingInline: 0,
      }}
    >
      <div className={'flex w-[100%] items-center justify-around rounded-lg px-2 py-3 hover:bg-fill-list-hover'}>
        <div className={'w-[40%] text-left'}>{item.name}</div>
        <div className={'flex-1'}>{dayjs.unix(item.modified_time).format('MM/DD/YYYY hh:mm A')}</div>
        <div className={'flex-1'}>{dayjs.unix(item.create_time).format('MM/DD/YYYY hh:mm A')}</div>
        <div
          style={{
            visibility: hoverId === item.id ? 'visible' : 'hidden',
          }}
          className={'w-[64px]'}
        >
          <Tooltip placement={'top-start'} title={t('button.putback')}>
            <IconButton onClick={(e) => onPutback(item.id)} className={'mr-2'}>
              <RestoreOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip placement={'top-start'} title={t('button.delete')}>
            <IconButton color={'error'} onClick={(e) => onDelete([item.id])}>
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </ListItem>
  );
}

export default TrashItem;
