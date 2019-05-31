import React from 'react';
import axios from 'axios'

class Test extends React.Component {
    state = {
        data: []
    }

    componentDidMount = async() => {
        const { data: { data } } = await axios.get('https://reqres.in/api/users?page=2')
        this.setState({ data })
    }
    
    render() {
        return (
            <div>
                <h3>Names</h3>
                <ul>
                    {this.state.data.map(e => <li key={e.email}>{e.first_name} {e.last_name}</li>)}
                </ul>
            </div>
        );
    }
};

export default Test;
