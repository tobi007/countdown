import React, { Component } from 'react';
import { FlatList, Text, StyleSheet, TouchableHighlight } from 'react-native';
import ActionButton from 'react-native-action-button'

import EventCard from './EventCard'
import { getEvents } from './api'
class EventList extends Component {

    state = {
        events: []
    }

    componentDidMount() {

        setInterval(() => {
            this.setState({
                events: this.state.events.map(evt => ({
                    ...evt, timer: Date.now()
                }))
            })
        }, 1000)

        this.props.navigation.addListener('didFocus', () => {
            getEvents()
            .then(events => this.setState({ events }))
            .catch((error)=>{
                console.log("Api call error");
                alert("The app is under maintenance!!!");
            });
        })
    }

    handleAddEvent = () => {
        this.props.navigation.navigate('form', {event: {
            userId: 1,
            title: "",
            date: new Date,
            isNew: true,
            id: 0
        }})
    }

    handleEditEvent = (event) => {
        event["isNew"] = false 
        this.props.navigation.navigate('form', {event: event})
    }



    render() {
        return [
            <FlatList
                key="fList"
                style={styles.list}
                data={this.state.events}
                renderItem={({item}) => (
                    <TouchableHighlight
                        onPress={() => this.handleEditEvent(item)}>
                    <EventCard event={item} />
                    </TouchableHighlight>
                    )}
                keyExtractor={item => item.id}
            />,
            <ActionButton
                key="fab"
                onPress={this.handleAddEvent}
                buttonColor="rgba(231, 76, 60, 1)"
            />
        ]
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#f3f3f3'
    }
})

export default EventList