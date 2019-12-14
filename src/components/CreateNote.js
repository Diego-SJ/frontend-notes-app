import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {
	state = {
		users: [],
		userSelected: '',
		title: '',
		content: '',
		date: new Date(),
		editing: false,
		_id: '',
	};

	async componentDidMount() {
		const res = await axios.get('http://localhost:4000/api/users');
		this.setState({
			users: res.data,
			userSelected: res.data[0].name,
		});

		if (this.props.match.params.id) {
			const res = await axios.get(
				'http://localhost:4000/api/notes/' + this.props.match.params.id,
			);
			this.setState({
				title: res.data.title,
				content: res.data.content,
				date: new Date(res.data.date),
				userSelected: res.data.author,
				editing: true,
				_id: this.props.match.params.id,
			});
		}
	}

	inputNoteChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onChangeDate = (date) => {
		this.setState({
			date,
		});
	};

	onSubmit = async (e) => {
		e.preventDefault();
		const newNote = {
			title: this.state.title,
			content: this.state.content,
			date: this.state.date,
			author: this.state.userSelected,
		};
		if (this.state.editing) {
			const resp = await axios.put(
				'http://localhost:4000/api/notes/' + this.state._id,
				newNote,
			);
			console.log(resp);
		} else {
			await axios.post('http://localhost:4000/api/notes', newNote);
		}

		window.location.href = '/';
	};

	render() {
		return (
			<div className='row'>
				<div
					className='col s12 m6 offset-m3 card blue-grey darken-1'
					style={{ marginTop: '2rem' }}
				>
					<form onSubmit={this.onSubmit} style={{ padding: '1rem' }}>
						<div className='row'>
							<div className='input-field col s12'>
								<select
									className='browser-default'
									name='userSelected'
									value={this.state.userSelected}
									onChange={this.inputNoteChange}
								>
									{this.state.users.map((user) => (
										<option key={user._id} value={user.name}>
											{user.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input
									type='text'
									name='title'
									className='validate white-text'
									placeholder=''
									value={this.state.title}
									onChange={this.inputNoteChange}
									required
								/>
								<label htmlFor='titleNote'>Title</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<input
									type='text'
									name='content'
									className='validate white-text'
									placeholder=''
									value={this.state.content}
									onChange={this.inputNoteChange}
									required
								/>
								<label htmlFor='contentNote'>Content</label>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<DatePicker
									className='input-field col s12 white-text'
									selected={this.state.date}
									value={new Date(this.state.date)}
									onChange={this.onChangeDate}
								/>
							</div>
						</div>
						<div className='row'>
							<div className='input-field col s12'>
								<button
									className='btn waves-effect waves-light green accent-4'
									type='submit'
									name='action'
								>
									{this.props.match.params.id ? 'Update note' : 'Save note'}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
