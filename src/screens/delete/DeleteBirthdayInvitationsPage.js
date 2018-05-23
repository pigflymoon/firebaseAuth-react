import React, {Component} from 'react';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import List from 'material-ui/List';

import Hidden from 'material-ui/Hidden';

import withAuthorization from '../../components/withAuthorization';
import withRoot from '../../components/withRoot';

import SimpleSnackbar from '../../widgets/snackBar';
import AlertDialog from '../../widgets/alert'
import {mailFolderListItems, otherMailFolderListItems} from '../../components/ImageListNav';
import {uploadStyles} from '../../styles/uploadPage';

import DeletePanel from '../../components/DeletePanel';

class DeleteBirthdayInvitationsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploading: false,
            open: false,
            activeTabIndex: 0,
            imageCategory: 'invitations',
            activeTab: 'kids',
            mobileOpen: false,
        };
    }

    handleChange = (event, value) => {
        this.setState({open: false});

        let tabs = ["kids", "women", "men"];
        for (let tab of tabs) {
            let tabValue = tabs[value];
            if (tab == tabValue) {
                console.log('tab is ', tab)
                this.setState({activeTabIndex: value, activeTab: tab})
            }

        }
        // this.setState({activeTabIndex: value});
    };

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };
    handleUploadStatus = (status) => {
        this.setState({open: status.open, uploading: status.uploading, error: status.error});
    }

    render() {
        const {classes} = this.props;
        // const {anchor} = this.state;
        console.log('props is ', this.props)
        const drawer = (
            <div>
                <div className={classes.toolbar}/>
                <Divider />
                <List>{mailFolderListItems}</List>
                <Divider />
                <List>{otherMailFolderListItems}</List>
            </div>
        );


        return (
            <div className={classes.root}>

                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, classes[`appBar-left`])}>
                        <Toolbar>
                            <Typography variant="title" color="inherit" noWrap>
                                Delete images of Birthday Invitations for  {this.state.activeTab} from Database and Storage
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Hidden mdUp>
                        <Drawer
                            variant="temporary"
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            variant="permanent"
                            open
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <main className={classes.content}>
                        <SimpleSnackbar show={this.state.uploading}/>
                        <AlertDialog open={this.state.open} error={this.state.error}/>
                        <Paper>
                            <Tabs
                                value={this.state.activeTabIndex}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={this.handleChange}
                            >
                                <Tab label="Kids and baby"/>
                                <Tab label="Women's"/>
                                <Tab label="Men's"/>
                            </Tabs>

                        </Paper>
                        <DeletePanel classes={classes} imageCategory={this.state.imageCategory}
                                     activeTabIndex={this.state.activeTabIndex} activeTab={this.state.activeTab}

                                     onHandleUploadStatus={this.handleUploadStatus}
                        />
                    </main>
                </div>
            </div>
        );


    }
}


const authCondition = (authUser) => !!authUser;


DeleteBirthdayInvitationsPage = withRoot(withStyles(uploadStyles)(DeleteBirthdayInvitationsPage));
export default withAuthorization(authCondition)(DeleteBirthdayInvitationsPage);
