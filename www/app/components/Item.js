import React from "react";
import {connect} from "dva";

 export default class Item extends React.Component{
    constructor({item}){
         super();
        this.state = {
             onedit:false,
             txt:item.title
        }
    }

    render(){
         return <div>
             <input type="checkbox" checked = {this.props.item.done==1} onChange = {(e)=>{this.props.changedone(this.props.item.id,e.target.checked)}}/>
             {
                !this.state.onedit?
             <span onDoubleClick = {()=>{this.setState({onedit:true})}}>{this.props.item.title}</span>
             :
             <span><input type="text" value = {this.state.txt} onChange = {(e)=>{this.setState({txt:e.target.value})}}
             onBlur = {(e)=>{this.props.changetitle(this.props.item.id,e.target.value);this.setState({onedit:false})}}
             /></span>
             }
             {" "}
             <button onClick = {()=>{this.props.del(this.props.item.id)}}>x</button>
         </div>
    }
}

