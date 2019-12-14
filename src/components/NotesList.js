import React, { Component } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

export default class NotesList extends Component {
	state = {
		notes: [],
	};

	async componentDidMount() {
		this.getAllNotes();
	}

	getAllNotes = async () => {
		const res = await axios.get('http://localhost:4000/api/notes');
		this.setState({
			notes: res.data,
		});
	};

	deleteNote = async (e) => {
		await axios.delete('http://localhost:4000/api/notes/' + e);
		this.getAllNotes();
	};

	deleteNote = async (e) => {
		await axios.delete('http://localhost:4000/api/notes/' + e);
		this.getAllNotes();
	};

	render() {
		return (
			<div className='row'>
				{this.state.notes.map((note) => (
					<div className='col s12 m6' key={note._id} style={{ marginTop: '2rem' }}>
						<div className='card blue-grey darken-1'>
							<div className='card-content white-text'>
								<span className='card-title'>{note.title}</span>
								<p>{note.content}</p>
								<div>
									<small className='left grey-text'>Date: {format(note.date)}</small>
									<small className='right grey-text'>Author: {note.author}</small>
								</div>
							</div>
							<div className='card-action'>
								<Link className='btn green accent-4 col s5' to={'/edit/' + note._id}>
									edit
								</Link>
								<button
									onClick={() => this.deleteNote(note._id)}
									className='btn  deep-purple accent-4 col s5 offset-s2'
								>
									delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}
