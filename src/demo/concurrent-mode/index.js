import React ,{ConcurrentMode} from 'react';
import {flushSync} from 'react-dom' //强制执行某个更新操作的时候使用优先级更高的方式去进行更新 

class Parent extends React.Component{
  state={
    async:true,
    num:1,
    length:1000
  }
  componentDidMount(){
    this.interval = setInterval(()=>{
      this.updateNum()
    },200)
  }

  componentWillUnmount(){
    if(this.interval){
      clearInterval(this.interval)
    }
  }

  updateNum(){
    const newNum = this.state.num === 3?0:this.state.num+1
    if(this.state.async){
      this.setState({
        num:newNum
      })
    }else{
      flushSync(()=>{
        this.setState({
          num:newNum
        })
      })
    }
  }
  render(){
    const children = []
    const {length,num,async} = this.state
    for(let i = 0;i<length;i++){
      children.push(
        <div className="item" key={i}>
          {num}
        </div>
      )
    }

    return (
      <React.Fragment> 
        <div>
          <input type="text" value={length}
          onChange={e=>
          flushSync(()=>this.setState({length:parseInt(e.target.value)}))}
         />
         async:{''}
          <input type="checkbox" checked={async}
          onChange={()=>
          flushSync(()=>this.setState({async:!async}))}
         />
         <div>{children}</div>
        </div>
      </React.Fragment>
    )
  }
}
 
export default()=>(
  <ConcurrentMode>
    <Parent/>
  </ConcurrentMode>
)
