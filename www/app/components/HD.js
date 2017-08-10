import React from "react";
import {connect} from "dva";

 class HD extends React.Component{
    constructor(){
         super();
    }

    render(){
         return <div>
             TodoList:{" "}
            <input type="text" ref = "kuang"  onKeyDown = {(e)=>{if(e.keyCode==13){this.props.dispatch({"type":"todos/add","title":this.refs.kuang.value});this.refs.kuang.value = ""}}} />
            {" "}
            <button onClick = {()=>{this.props.dispatch({"type":"todos/add","title":this.refs.kuang.value})}}
            >增加</button>
         </div>
    }
}

export default connect(
  ({todos})=>{
     return {
         todos
     }
  }
)(HD);