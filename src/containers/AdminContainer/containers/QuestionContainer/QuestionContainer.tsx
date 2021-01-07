import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Header } from 'components/ui/Table/Table';
import { Question } from 'requests/types';
import {
 useQuestions, useDeleteQuestion, useAddQuestion, useQuestion, useUpdateQuestion,
} from 'requests/questions';

import Crud from 'components/ui/Crud/Crud';
import QuestionForm from '../../components/QuestionForm/QuestionForm';

const headers: Header<Question>[] = [
  { title: 'Titre', dataIndex: 'title', key: 'title' },
  {
    title: 'Parent',
    dataIndex: 'parent',
    key: 'parent',
    render: (parent) => (parent ? parent.title : '-------'),
  },
];

const QuestionContainer = (props: RouteComponentProps) => {
  const addQuestion = useAddQuestion();
  const updateQuestion = useUpdateQuestion();
  const deleteQuestion = useDeleteQuestion();

  return (
    <Crud
      formTitles={{ create: 'Ajouter une question', update: 'Modifier une question' }}
      title="Question"
      list={useQuestions}
      get={useQuestion}
      create={addQuestion}
      update={updateQuestion}
      delete={deleteQuestion}
      headers={headers}
      Form={QuestionForm}
      {...props}
    />
  );
};

export default QuestionContainer;
