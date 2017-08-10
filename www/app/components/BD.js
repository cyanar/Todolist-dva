import React from "react";
import {connect} from "dva";
import Item from "./Item.js";

 class BD extends React.Component{
    constructor(){
         super();
    }

    render(){
         return <div>
         <h3>未做:</h3>
                {this.props.todos.todos.map((item,index)=>{
                 if(item.done==0)
                  return   <Item key = {index} item = {item}
                  del = {(id)=>{this.props.dispatch({"type":"todos/del",id})}}
                  changedone = {(id,done)=>{this.props.dispatch({"type":"todos/changedone",id,done})}}
                  changetitle = {(id,title)=>{this.props.dispatch({"type":"todos/changetitle",id,title})}}
                  ></Item>
             })}
          <hr />
         <h3>已做:</h3>
             {this.props.todos.todos.map((item,index)=>{
                 if(item.done==1)
                  return   <Item key = {index} item = {item}
                  del = {(id)=>{this.props.dispatch({"type":"todos/del",id})}}
                  changedone = {(id,done)=>{this.props.dispatch({"type":"todos/changedone",id,done})}}
                  changetitle = {(id,title)=>{this.props.dispatch({"type":"todos/changetitle",id,title})}}
                  ></Item>
             })}
         </div>
    }
}

export default connect(
  ({todos})=>{
     return {
         todos
     }
  }
)(BD);