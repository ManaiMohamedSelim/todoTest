import React, {Component} from 'react';
import axios from "axios";

export class OneTodo extends Component {

    constructor(props) {
        super(props);

        this. state = {
            task: {}
        };

    }

    onDelete(){
        axios.delete(`http://127.0.0.1:3000/${this.props.id}`).then(console.log("deleted"));
        setTimeout(()=>window.location.reload(),0);
    }

    onDone(){
        axios.put(`http://127.0.0.1:3000/${this.props.id}`).then(console.log("updated"));
        setTimeout(()=>window.location.reload(),0);
    }
    componentDidMount(){
        axios.get(`http://127.0.0.1:3000/${this.props.id}`).then(response => {
            this.setState({ task: response.data });
            console.log(this.state.task);
            console.log(response);
        });
    }

    render(){
        return(
            <li>{this.state.task.name}
                {this.state.task.done === false &&
                <i className="fa fa-check" style={{color:"green", fontSize : 30}} onClick={this.onDone.bind(this)}></i>
                }
                <i className="fa fa-trash" style={{color:"red" , fontSize : 30}} onClick={this.onDelete.bind(this)}></i>
            </li>
        );
    };
}
