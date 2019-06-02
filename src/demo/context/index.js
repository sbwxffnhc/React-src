import React from 'react';
import PropTypes from 'prop-types'
import { timingSafeEqual } from 'crypto';

const {Provider , Consumer} = React.createContext('default')

class Parent extends React.Component{
  state={
    childContext:'123',
    newContext:'455'
  }
  /**context，提供给子组件属性 */
  getChildContext(){
    return {value:this.state.childContext,a:'aaa'}
  }

  render(){
    return (
      <React.Fragment> 
        <div>
          <label>childContext:</label>  
          <input type="text" value={this.state.childContext}
          onChange={e=>this.setState({childContext:e.target.value})}/>
        </div>  
        <div>
          <label>newContext:</label>
          <input type="text" value={this.state.newContext}
          onChange={e=>this.setState({newContext:e.target.value})}/>
        </div>
        <Provider value={this.state.newContext}>{this.props.children}</Provider>
        
      </React.Fragment>
    )
  }
}

function Child1(){
  return <Consumer>{value=><p>newContext:{value}</p>}</Consumer>
}

class Child2 extends React.Component{
  render(){
    return <p>childContext:{this.context.value}{this.context.a}</p>
  }
}
/**告诉react在渲染的时候，要获取父层组件context里的某些属性
 * 想要获取父组件的哪些属性要在这里声明，否则拿不到 
 */
Child2.contextType={
  value:PropTypes.string,
  a:PropTypes.string
}
/**必须声明才可以给子组件用 */
Parent.contextType={
  value:PropTypes.string,
  a:PropTypes.string
}

export default()=>{
  <Parent>
    <Child1/>
    <Child2/>
  </Parent>
}