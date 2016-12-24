import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Home from './views/home/home';
import Login from './views/home/login';
import Comments from './views/home/headlines';
import NavHeader from './views/home/navHeader';
import Sample from './components/sample';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
primary1Color: "#2c2c2c"}
});

ReactDOM.render(
	<MuiThemeProvider muiTheme={muiTheme}>
		<Router history={hashHistory}>			
			<Route path="/" component={Home}>
			<Route path="/login" component={Login}/>			
			<Route path="/savedComments" component={Comments} />
			<Route path="/searchNews" component={Sample} />
			</Route>
		</Router>
	</MuiThemeProvider>,
  	document.getElementById('mountapp')
);
