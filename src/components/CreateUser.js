import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
	state = {
		name: '',
		users: [],
	};

	async componentDidMount() {
		this.getUsers();
	}

	onChangeUserName = (e) => {
		this.setState({
			name: e.target.value,
		});
	};

	getUsers = async () => {
		const res = await axios.get('http://localhost:4000/api/users');
		this.setState({ users: res.data });
	};

	onSubmit = async (e) => {
		e.preventDefault();
		await axios.post('http://localhost:4000/api/users', {
			name: this.state.name,
		});
		this.setState({ name: '' });
		this.getUsers();
	};

	deleteUser = async (e) => {
		console.log(e);
		await axios.delete('http://localhost:4000/api/users/' + e);
		this.getUsers();
	};

	render() {
		return (
			<div className='row' style={{ marginTop: '2rem' }}>
				<div className='col s5 m3 card blue-grey darken-1'>
					<form onSubmit={this.onSubmit} style={{ padding: '0.8rem' }}>
						<div className='row'>
							<div className='input-field  col s12'>
								<input
									name='userName'
									type='text'
									value={this.state.name}
									className='validate'
									placeholder=''
									onChange={this.onChangeUserName}
								/>
								<label htmlFor='userName'>Name</label>
							</div>
							<div className='input-field col s12'>
								<button
									className='btn waves-effect waves-light green accent-4'
									type='submit'
									name='action'
								>
									Save user
								</button>
							</div>
						</div>
					</form>
				</div>
				<div className='col s7 m9'>
					<ul className='collection'>
						{this.state.users.map((user) => (
							<li
								className='collection-item pulse'
								key={user._id}
								onDoubleClick={() => this.deleteUser(user._id)}
							>
								{user.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}
