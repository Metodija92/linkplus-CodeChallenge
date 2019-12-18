import React from 'react';
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
 
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 
class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <GridLoader
          css={override}
          sizeUnit={"px"}
          size={50}
          color={'#36D7B7'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}

export default Loading