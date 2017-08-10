import React from "react";
import {connect} from "dva";
import BD from "../components/BD.js";
import HD from "../components/HD.js";

 class App extends React.Component{
    constructor(){
         super();
    }
    componentDidMount(){
         this.props.dispatch({"type":"todos/init"})
    }

    render(){
         return <div>
            <HD></HD>
            <BD></BD>
         </div>
    }
}

export default connect(

)(App);
