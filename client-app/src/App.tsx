import React,{Component} from 'react';
import './App.css';
import axios from 'axios'
import { Header, Icon, List } from 'semantic-ui-react'
//import { start } from 'repl';
class App extends Component{
    state={
        values:[]
    }
    componentDidMount(){
       
        axios.get('https://localhost:5001/api/values')
        .then((response)=>{ 
            
            this.setState({
                //values:[{id:1,name:'Value 101'},{id:2,name:'Value 102'}]
                values:response.data
        })
       
        })
    }
    render(){
        return (
            <div>
                <Header as='h2'>
                <Icon name='users' />
                <Header.Content>Reactivities</Header.Content>
               </Header>
               <List>
               {this.state.values.map((value:any)=>(
                             <List.Item key={value.id}>{value.name}</List.Item>
                        ))}
                   
                   
                </List>
                    
            
            </div>
        );
    }
    
}

 

  

export default App;
