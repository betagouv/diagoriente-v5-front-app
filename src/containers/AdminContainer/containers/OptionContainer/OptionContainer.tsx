import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Header } from 'components/ui/Table/Table';
import { Option } from 'requests/types';
import {
 useOptions, useDeleteOption, useAddOption, useOption, useUpdateOption,
} from 'requests/options';

import Crud from 'components/ui/Crud/Crud';

import VerifiedIcon from '../../components/VerifiedIcon/VerifiedIcon';
import OptionForm from '../../components/OptionForm/OptionForm';

const headers: Header<Option>[] = [
  { title: 'Titre', dataIndex: 'title', key: 'title' },
  {
    title: 'Question',
    dataIndex: 'question',
    key: 'question',
    render: (question) => (question ? question.title : '-------'),
  },
  {
    dataIndex: 'verified',
    title: 'Visible',
    key: 'verified',
    render: (value: boolean) => <VerifiedIcon verified={value} />,
  },
];

const OptionContainer = (props: RouteComponentProps) => {
  const addOption = useAddOption();
  const updateOption = useUpdateOption();
  const deleteOption = useDeleteOption();

  return (
    <Crud
      formTitles={{ create: 'Ajouter une option', update: 'Modifier une option' }}
      title="Option"
      list={useOptions}
      get={useOption}
      create={addOption}
      update={updateOption}
      delete={deleteOption}
      headers={headers}
      Form={OptionForm}
      {...props}
    />
  );
};

export default OptionContainer;
