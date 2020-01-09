import React, {Component} from 'react';
import axios from "axios";
import {OneTodo} from "./oneTodo";
import SimpleReactValidator from "simple-react-validator";

export class TodoList extends Component {

    constructor(props) {
        super(props);

        this. state = {
            tasks: [],
            tasksDone: [],
            tasksToDo: [],
            task: {}
        };

        this.validator = new SimpleReactValidator(
            {element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>}
        );

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    onChange(e) {
        const { name, value } = e.target;
        const { task } = this.state;
        this.setState({
            task: {
                ...task,
                [name]: value
            }
        });
    }


    componentDidMount(){
        axios.get(`http://127.0.0.1:3000/`).then(response => {
            this.setState({ tasks: response.data });
            console.log(this.state.tasks);
            console.log(response);
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const {task} = this.state;
        if (this.validator.allValid()) {
            axios.post(`http://127.0.0.1:3000/`, task)
                .then(res => {
                    console.log(res)
                });

            this.setState({})
            setTimeout(() => window.location.reload(), 0);
            this.componentDidMount();
        }else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    render(){

        console.log(this.state.tasksDone)
        return(
            <div>
                <br/>
                <form onSubmit={this.onSubmit} style={{ display: "flex", justifyContent: "center",alignItems: "center"}}>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Todo Board</label>
                        {this.validator.message('Name', this.state.task.name, 'required')}
                        <input name="name" type="text" value={this.state.task.name}
                               onChange={this.onChange} className="form-control" id="formGroupExampleInput" placeholder="Add a new task" />
                        {alert.message &&
                        <div className={`alert ${alert.type} text-white px-4 py-3`} role="alert">
                            {alert.message}
                        </div>
                        }
                    </div>
                    <button type="submit" className="btn btn-primary">
                        <i className="material-icons">add</i>
                    </button>
                </form>
                <div className="container mb-5 mt-5">
                    <div className="pricing card-deck flex-column flex-md-row mb-3">
                        <div className="card card-pricing text-center px-3 mb-4">
                            <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Todo</span>
                            <div className="bg-transparent card-header pt-4 border-0">
                                <h1 className="h1 font-weight-normal text-primary text-center mb-0" ><span className="price"></span><span className="h6 text-muted ml-2"></span></h1>
                            </div>
                            <div className="card-body pt-0">
                                <ul className="list-unstyled mb-4">
                                    {this.state.tasks.map(todo => (
                                        todo.done === false &&
                                    <OneTodo id={todo.id}/>

                                    ))}
                                </ul>

                            </div>
                        </div>
                        <div className="card card-pricing popular shadow text-center px-3 mb-4">
                            <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Done</span>
                            <div className="bg-transparent card-header pt-4 border-0">
                                <h1 className="h1 font-weight-normal text-primary text-center mb-0" ><span className="price"></span><span className="h6 text-muted ml-2"></span></h1>
                            </div>
                            <div className="card-body pt-0">
                                <ul className="list-unstyled mb-4">
                                    {this.state.tasks.map(todo => (
                                        todo.done === true &&
                                        <OneTodo id={todo.id}></OneTodo>
                                    ))}
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
    );
    };
}
