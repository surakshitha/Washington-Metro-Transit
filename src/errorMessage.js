import React from 'react';

function ErrorMessage(props) {
  return (
    <div style={{ color: 'red' }}>
      {props.message}
    </div>
  );
}

export default ErrorMessage;
