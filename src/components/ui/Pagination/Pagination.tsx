import React from 'react';
import Paper from '@material-ui/core/Paper/Paper';

import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import classNames from 'utils/classNames';

import useStyles from './styles';

const NUMBER_OF_PAGES = 3;
const NUMBER_OF_PAGES_HALF = Math.ceil(NUMBER_OF_PAGES / 2);

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const classes = useStyles();
  const pages = [];
  if (totalPages <= NUMBER_OF_PAGES) {
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
  } else {
    let leftSide = Math.ceil(NUMBER_OF_PAGES / 2);
    let rightSide = NUMBER_OF_PAGES - leftSide;

    if (currentPage > totalPages - Math.trunc(NUMBER_OF_PAGES / 2)) {
      rightSide = totalPages - currentPage;
      leftSide = NUMBER_OF_PAGES - rightSide;
    } else if (currentPage < leftSide) {
      leftSide = currentPage;
      rightSide = NUMBER_OF_PAGES - leftSide;
    }
    for (let i = leftSide - 1; i >= 0; i -= 1) {
      pages.push(currentPage - i);
    }
    for (let i = 1; i <= rightSide; i += 1) {
      pages.push(currentPage + i);
    }
  }

  const renderPage = (page: number) => {
    function onClick() {
      if (page !== currentPage) {
        onPageChange(page);
      }
    }
    return (
      <Paper
        onClick={onClick}
        key={page}
        className={classNames(classes.page, page === currentPage && classes.pageSelected)}
      >
        {page}
      </Paper>
    );
  };

  const RenderArrow = (direction: 'left' | 'right') => {
    function onClick() {
      if ((currentPage !== 1 && direction === 'left') || (currentPage !== totalPages && direction === 'right')) {
        const nextPage = direction === 'left' ? currentPage - 1 : currentPage + 1;
        onPageChange(nextPage);
      }
    }

    const Component = direction === 'left' ? ArrowLeft : ArrowRight;

    return (
      <span className={classNames(classes.page, classes.arrow)} onClick={onClick}>
        <Component height={14} width={14} />
      </span>
    );
  };

  return (
    <div className={classes.container}>
      {totalPages > 1 && RenderArrow('left')}
      {totalPages > NUMBER_OF_PAGES && currentPage > NUMBER_OF_PAGES_HALF && (
        <>
          {renderPage(1)}
          {currentPage !== NUMBER_OF_PAGES && <div className={classNames(classes.page, classes.separator)}>...</div>}
        </>
      )}
      {pages.map(renderPage)}
      {totalPages > NUMBER_OF_PAGES && currentPage < totalPages - (NUMBER_OF_PAGES - NUMBER_OF_PAGES_HALF) && (
        <>
          {currentPage !== totalPages - NUMBER_OF_PAGES + 1 && (
            <div className={classNames(classes.page, classes.separator)}>...</div>
          )}
          {renderPage(totalPages)}
        </>
      )}
      {totalPages > 1 && RenderArrow('right')}
    </div>
  );
};

export default Pagination;
