import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index'
import Paper from '@material-ui/core/Paper/index'
import Navigation from "../component/navigation";
import TopItemList from "../component/topitemlist";
import Browserlist from "../component/browserlist";
import Tag from "../component/tag";
import Listitem from '../component/listitem'
import Activitylist from "../component/activitylist";
import axios from 'axios';


class Activitypage extends Component{
    constructor(props){
        super(props);
        this.state={
            username: "游客",
            userid:1,
            activities: [{actTime:2019-7-1},{ctTime:2019-7-2}],
            search:"",
            isloaded: false,
            friends:[]
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.finduser=this.finduser.bind(this);
        this.findfriends=this.findfriends.bind(this);
    }

    componentWillMount() {
        this.finduser();
        this.findfriends();
        const _this=this;
        this.state.friends.map(friend=>{
            axios.get("/activity/userid/"+friend.id+"?access_token="+localStorage.getItem("access_token"))
                .then(function (res) {
                    _this.setState({
                        activities: _this.state.activities+res.data,
                        isloaded: true,
                    });
                })
                .catch(function (error) {
                })
        })

    }
    async findfriends()
    {
        await axios.get('/friend/all/userid/'+this.state.userid+"?access_token="+localStorage.getItem("access_token")).then(
            function(response){
                this.setState({friends:response.data})
            }.bind(this)
        )
    }
    async finduser()
    {
        if(localStorage.getItem("userid")==null)
        {
            window.location.href="/#/login";
        }
        else {
          await  this.setState({userid:localStorage.getItem("userid")})
        }
    }

    handleSearch(value){
        this.setState({search:value});
    }

    render(){
        var activities=this.state.activities.sort((a,b)=>{
            return a.actTime>b.actTime;
        });
        return(
            <Grid container direction={"column"} >

                <Grid container direction={"row"} alignItems={"center"}>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={8} >
                        <br/><br/>
                        <Activitylist
                            activities={activities}
                            username={this.state.username}
                            userid={this.state.userid}
                            />
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>

        )
    }
}

export  default Activitypage;