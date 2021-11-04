import React from "react";
import TutorialDataService from '../services/tutorial.service';


class AddTutorial extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.addTutorial = this.addTutorial.bind(this);
        this.resetState = this.resetState.bind(this);
        this.state = {
            title: '',
            description: ''
        }
    }
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    resetState() {
        this.setState({
            title: '',
            description: ''
        })
    }
    addTutorial() {
        let data = {
            title: this.state.title,
            description: this.state.description
        }
        console.log(data);
        TutorialDataService.create(data).then(response => {
            console.log(response.data)
            this.resetState();
        }).catch(e => console.log(e));
    }

    render() {
        return (
            <div className='submit-form'>
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' required className='form-control' id='title'
                        value={this.state.title} onChange={this.onChangeTitle} />
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <input type='text' required className='form-control' id='description'
                        value={this.state.description} onChange={this.onChangeDescription} />
                </div>
                <button onClick={this.addTutorial} className='btn btn-primary'>Submit</button>
            </div>
        );
    }
}

export default AddTutorial;