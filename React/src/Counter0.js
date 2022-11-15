import React, { Component } from 'react';

class Counter extends Component {
  state = {
    number: 0
  }

  handleIncrease = () => {
    const {number} = this.state
    this.setState({
      //number: this.state.number + 1
      number: number + 1
    });
  }

  handleDecrease = () => {
    this.setState(({number}) => ({
        number: number - 1
        })
    );
  }

  render() {
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>  
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
  //위에 this.handleIncrease()이렇게 함수로 쓰면 안됨 그럼 무한반복 함수 수행하게 됨
}

export default Counter;