import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import  '../css/navigate.css'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import {Avatar} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Userinfo from '../component/userinfo'
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
/*function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};*/

/*function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={event => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}*/

/*const useStyles = makeStyles(theme => ({
    root: {
        // flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        height:100
    },
}));*/

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value : 0,
            show:false,
            x:0,
            y:0,
            search:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleenter=this.handleenter.bind(this);
        this.handleleave=this.handleleave.bind(this);
        this.handlechange=this.handlechange.bind(this);
    }
    handlechange(e)
    {
        this.setState({search:e.target.value})
    }
    handleleave(e){
        this.setState({show:false,x:e.clientX,y:e.clientY})
    }
    handleenter(e)
    {
        this.setState({show:true,x:e.clientX,y:e.clientY});


    }
    componentWillMount() {
        var x=window.location.href.split("#")[1].split("/")[1];
        console.log(x);
        switch (x)
        {
            case "homepage" :this.setState({value:0});break;
            case "itembrowsepage" :this.setState({value:1});break;
            case "useriteminfopage" :this.setState({value:2});break;
            case "userfavoritepage" :this.setState({value:3});break;
            case "topicpage" :this.setState({value:4});break;
        }
    }

    handleChange(event, newValue) {
        console.log(newValue);
        this.setState({value : newValue});
    }

    render() {

        var style={"position":"absolute"};
        style["top"]=this.state.y;
        style["left"]=this.state.x;
        if(!this.state.show)
        {
            return (

                <div id={"navigateroot"}>
                    <AppBar color={"default"} position={"fixed"} id={"navigateroot"}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container>

                                    <Grid item xs={8}>
                                        <Tabs centered={true} value={this.state.value} onChange={this.handleChange}>
                                            <Tab label="首页" href={"/#/"}/>
                                            <Tab label="浏览" href={"/#/itembrowsepage"}/>
                                            <Tab label="进度" href={"/#/useriteminfopage"}/>
                                            <Tab label="收藏" href={"/#/userfavoritepage"}/>
                                            <Tab label="讨论区" href={"/#/topicpage"}/>
                                        </Tabs>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <br/>
                                        <Avatar src={"/img/3.jpg"} onMouseEnter={this.handleenter} onMouseLeave={this.handleleave}></Avatar>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <br/>
                                        <Button href={"/#/loginpage"} color={"primary"} variant="contained">登录</Button>
                                        <Button href={"/#/registerpage"} color={"primary"} variant="contained">注册</Button>
                                    </Grid>
                                    <Grid item xs={2}>

                                        <FormControl margin="normal" required fullWidth>

                                            <InputLabel htmlFor="id">search</InputLabel>
                                            <Input type="text" id="password" value={this.state.search} onChange={this.handlechange}></Input>
                                        </FormControl>

                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>

                    </AppBar>
                    <br/>
                    <br/>


                </div>
            );
        }
        else{
            console.log(style);
            return(
                <div id={"navigateroot"}>
                    <AppBar color={"default"} position={"fixed"} id={"navigateroot"}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container>

                                    <Grid item xs={8}>
                                        <Tabs centered={true} value={this.state.value} onChange={this.handleChange}>
                                            <Tab label="首页" href={"/#/"}/>
                                            <Tab label="浏览" href={"/#/itembrowsepage"}/>
                                            <Tab label="进度" href={"/#/useriteminfopage"}/>
                                            <Tab label="收藏" href={"/#/userfavoritepage"}/>
                                            <Tab label="讨论区" href={"/#/topicpage"}/>
                                        </Tabs>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <br/>
                                        <Avatar src={"/img/3.jpg"} onMouseEnter={this.handleenter} onMouseLeave={this.handleleave}></Avatar>
                                        <Paper onMouseEnter={this.handleenter} onMouseLeave={this.handleleave}>
                                            <MenuList>
                                                <MenuItem >
                                                    <Link to={{pathname:'/userinfopage'}}>用户信息</Link>
                                                </MenuItem>
                                            </MenuList>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <br/>
                                        <Button href={"/#/loginpage"} color={"primary"} variant="contained">登录</Button>
                                        <Button href={"/#/registerpage"} color={"primary"} variant="contained">注册</Button>
                                    </Grid>
                                    <Grid item xs={2}>

                                        <FormControl margin="normal" required fullWidth>

                                            <InputLabel htmlFor="id">search</InputLabel>
                                            <Input type="text" id="password" value={this.state.search} onChange={this.handlechange}></Input>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>

                    </AppBar>
                    <br/>
                    <br/>


                </div>
            );
        }

    }

}

export default Navigation;