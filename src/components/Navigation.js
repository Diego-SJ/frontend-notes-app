import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
	render() {
		return (
			<div className='nav-wrapper'>
				<nav>
					<div className='nav-wrapper grey darken-4'>
						<Link className='brand-logo center' to='/'>
							NOTES APP
						</Link>
					</div>
				</nav>
				<nav className='nav-extended grey darken-4'>
					<div className='nav-content'>
						<ul className='tabs tabs-transparent'>
							<li className='tab'>
								<Link to='/' className='active'>
									My notes
								</Link>
							</li>
							<li className='tab'>
								<Link to='/create'>New Note</Link>
							</li>
							<li className='tab'>
								<Link to='/user'>Users</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}
