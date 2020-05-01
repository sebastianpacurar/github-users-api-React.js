import axios from 'axios';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


// the CardList Component
const CardList = (props) => {

    // the profiles will be received from the parent which is the App component.
    // map the array of objects (testData) into Card elements. map every profile object into a card element,
    // the conversion is done like this: [<Card />, <Card />, <Card />, <Card />, etc]

    // it is necessary to use a key for every card element
    return (
        <div>
            {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
        </div>
    )
}


// The card component
class Card extends Component {

    render() {

        // the prop through which there will be passed information from the parent which is the CardList component
        // the prop will be composed of 5 properties.
        const profile = this.props;

        return (
            <div className='github-profile' style={{margin: '5% 0 0 5%', display: 'block'}}>
                <img
                    src={profile.avatar_url}
                    width='75px' height='75px' style={{display: 'inline-block', margin: '5px 0 0 0'}}
                    alt='missing'
                />
                <div className='info' style={{display: 'inline-block', margin: '0 0 0 5%'}}>
                    <div className='public repos' style={{fontSize: '100%'}}>public repositories: {profile.public_repos}</div>
                    <span>link: </span><a className='link' href={profile.html_url}
                                          style={{fontSize: '100%'}}>{profile.html_url}</a>
                    <div className='created-at' style={{fontSize: '100%'}}>created at: {profile.created_at}</div>
                    <div className='type' style={{fontSize: '100%'}}>type: {profile.type}</div>
                </div>
            </div>
        );
    }
}


class Form extends Component {

    // create a state without constructor, using class attributes
    state = {
        userName: ''
    };

    // the submit button event listener which uses axios library to fetch data from the API
    handleSubmit = async event => {

        // we need to use preventDefault, otherwise the page will refresh after clicking the button when working with forms
        event.preventDefault();

        // resp awaits for axios to retrieve data from github using the given url
        const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);

        this.props.onSubmitAction(resp.data);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{textAlign: 'center', margin: '10px 0 0 0'}}>
                <input
                    type='text'
                    placeholder='Insert user name'
                    value={this.state.userName}     // the value is the username state

                    // using onChange to add user and setState of userName based on the value
                    onChange={event => this.setState({userName: event.target.value})}
                    required/>
                <button>Add User</button>
            </form>
        );
    }
}


class App extends Component {

    // define the states as class attribute (no need for constructor anymore
    state = {
        profiles: testData,
    };

    // access previous state, spread the existing profile using ...prevState.profile, and append the new profileData
    // basically a concatenation on the profiles state array
    addNewProfile = profileData => {
        this.setState(prevState => ({
            profiles: [...prevState.profiles, profileData],
        }))
    }

    // pass the state as props to the CardList child
    // when the Form button is clicked, the state will be updated
    render() {
        return (
            <div>
                <div
                    className='header'
                    style={{textAlign: 'center', fontSize: '30px', fontFamily: 'Arial Helvetica sans-serif', fontWeight: 'bold',}}
                >
                    {this.props.title}
                </div>
                <Form onSubmitAction={this.addNewProfile}/>
                <CardList profiles={this.state.profiles}/>
            </div>
        );
    }
}


// the model used to fetch data from the github api
const testData = [
    {
        public_repos: '8',
        avatar_url: 'https://avatars1.githubusercontent.com/u/20042506?v=4',
        html_url: 'https://github.com/sebastianpacurar',
        created_at: '2016-06-20T10:41:18Z',
        type: 'User',
    }
];


ReactDOM.render(
    <App title='Github users details'/>,
    document.getElementById('root'),
);
