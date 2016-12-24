import React from 'react';
import NavHeader from './navHeader'

//This is a view layout, hence avoid putting any business logic
export default class Home extends React.Component {
	constructor(props) {
    super(props);
    
  }
		
	render() 
	{
		return ( <div>
			<NavHeader />
			{this.props.children}
			
			</div>			
			);
	}
}