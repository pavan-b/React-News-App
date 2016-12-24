import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import {   hashHistory } from 'react-router';
import axios from 'axios';

export default class NavHeader extends React.Component {
  constructor(){
    super();
    this.state={
      openDrawer:false, 
      lable:'login'     
    }
  }

  handleTouchTap=() =>{ 
  hashHistory.push('/');   
  }

  drawDrawer =()=>{
    this.setState({openDrawer: !(this.state.openDrawer)})
  }

  drawDialog = ()=>{
    if(this.state.lable == 'login'){
        hashHistory.push("/login");
      }else{       
        axios.get('http://localhost:8080/data/logout')
                   .then( (response) =>{                      
                    if(response.data){
                            hashHistory.push("/"); 
                            }  
                        });
      }
     
  }

  openSearch=()=>{
    hashHistory.push("/searchNews");
    this.drawDrawer();
  }
  saveHeadlines=()=>{
    hashHistory.push("/savedComments");
    this.drawDrawer();
  }

  render() {
    const styles = {
    title: {
      cursor: 'pointer',
    },
  };
  const container ={    
    "position":"fixed"
  };  

//change the login lable
  axios.get('http://localhost:8080/data/status')
             .then( (response) =>{  
                         if(response.data){
                            this.setState({lable:'logout'});
                         }
                         else{
                          this.setState({lable:'login'})
                         } 
                  });
    return (      
      <div>
     <AppBar
    title={<span style={styles.title}>News broadcast</span>}
    onTitleTouchTap={this.handleTouchTap}   
    iconElementLeft={<IconButton onClick={this.drawDrawer}><NavigationMenu /></IconButton>}
    iconElementRight={<FlatButton label={this.state.lable} onClick={this.drawDialog}/>}
    style={container}
  />
  <Drawer open={this.state.openDrawer} docked={false} onRequestChange={(openDrawer) => this.setState({openDrawer})}>
            <MenuItem onTouchTap={this.openSearch}>Search news</MenuItem>
            <MenuItem onTouchTap={this.saveHeadlines}>Saved headlines</MenuItem>
          </Drawer>  
          </div>
    );
  }
}