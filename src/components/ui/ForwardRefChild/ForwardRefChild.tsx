import React, { forwardRef, Ref } from 'react';

const ForwardRefChild = forwardRef(
  (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ref: Ref<HTMLDivElement>) => (
    <div ref={ref} {...props} />
  ),
);
export default ForwardRefChild;
