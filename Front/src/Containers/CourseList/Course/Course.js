import React, {Component} from 'react';
import './Course.css'
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import MovieIcon from '@material-ui/icons/Movie';
import ImageIcon from '@material-ui/icons/Image';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';


export default function Course({match: {params: {id}}}) {

    const url=window.location.protocol+'//'+window.location.hostname;
    const [expand, setExpand] = React.useState(false),
        [selected, setSelected] = React.useState({}),
        [types] = React.useState([
            {code: "InteractiveVideo", name: "Video", icon: <MovieIcon/>},
            {code: "InteractiveImage", name: "Image", icon: <ImageIcon/>},
            {code: "InteractiveObject", name: "Object", icon: <EmojiObjectsIcon/>}
        ]),

        handleListItemClick = (type) => setSelected({...type}),

        ToggleClick = (expand) => setExpand(!expand),

        getList = () => {
            console.log(url);
            return types.map(type => <ListItem
                button
                selected={selected.code === type.code}
                onClick={() => {
                    handleListItemClick(type)
                }}>
                <ListItemIcon>
                    {type.icon}
                </ListItemIcon>
                <ListItemText primary={type.name}/>
            </ListItem>)
        },
        getIframe = (type, expand) => (
            <React.Fragment>
                <iframe
                    src={url+":8081/index.html?type=" + type}
                    className={expand ? "expanded" : ""}
                    frameBorder="0"/>
                <Button variant="contained"
                        onClick={() => ToggleClick(expand)}
                        className={expand ? "expanded" : ""}>
                    <FullscreenIcon/>
                </Button>
            </React.Fragment>
        );

    return (
    <Container maxWidth="sm">
        <h1>Explore the universe</h1>
        <h2>{selected.name}</h2>
        {getIframe(selected.code, expand)}
        <section>
            <List component="nav" aria-label="secondary mailbox folder">
                {getList()}
            </List>
        </section>
    </Container>)

}
