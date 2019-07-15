import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'; 
class Messagelist extends Component{
    constructor(props)
    {
        super(props);
        this.state={messages:[{senderId:1,receiverId:1,content:"asdadadasd"}]}
    }
    componentWillMount() {
        var url="http://202.120.40.8:30741/message/"+this.props.type+"/1";
        axios.get(url).then(
            function(response)
            {
                this.setState({messages:response.data});
            }.bind(this)
        )
    }

    render()
    {
        var messages=this.state.messages;
        var rows=[];
        for(var i=0;i<messages.length;++i)
        {
            rows.push(
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <Paper>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <Typography>from:{messages[i].senderId}</Typography>
                                        <Typography>to:{messages[i].receiverId}</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography>{messages[i].content}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </Grid>

            )
        }
        return(
            <Paper>
                <Grid container spacing={2}>
                    {rows}
                </Grid>
            </Paper>
        )

    }
}
export default Messagelist;