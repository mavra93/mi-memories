import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base'
import {Actions} from 'react-native-router-flux';
import styles from './styles';

export const homeScreen = 'home';
export const favoriteScreen = 'favorite';
export const notificationsScreen = 'notifications';
export const profileScreen = 'profile';

class Tabs extends Component {

    state = {
        activeIndex: 0,
    };

    setActiveIndex = (i) => {
        this.setState({
            activeIndex: i
        });
    }
    ;
    openModal = () => {
        Actions.createMemory();
    };

    selectTab = (screen, i) => {
        this.setActiveIndex(i);
        this.props.changeScene(screen)
    };

    render() {
        const {activeIndex} = this.state;
        const tabs  = [
            {
                icon: 'home',
                screen: homeScreen
            },
            {
                icon: 'heart',
                screen: favoriteScreen
            },
            {
                icon: 'bell',
                screen: notificationsScreen
            },
            {
                icon: 'user',
                screen: profileScreen
            }
        ];
        return (
            <View style={styles.tabsContainer}>
                <View style={styles.tabsWrapper}>
                    {tabs.map((tab, i) => {
                        let tabStyles;
                        switch(i) {
                            case 0:
                                tabStyles = styles.tabPaddingRight;
                                break;
                            case 1:
                                tabStyles = styles.tabLeft;
                                break;
                            case 2:
                                tabStyles = styles.tabRight;
                                break;
                            case 3:
                                tabStyles = styles.tabPaddingLeft;
                                break;
                        }
                        return(
                            <TouchableOpacity onPress={() => this.selectTab(tab.screen, i)} style={tabStyles} key={i}>
                                <Icon type="FontAwesome" name={tab.icon} style={{color: activeIndex === i ? '#42b72a' : '#525252'}}/>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <TouchableOpacity style={styles.centeredTab} onPress={() => this.openModal()}>
                    <View style={styles.centeredTabInner}>
                        <Icon type="FontAwesome" name='plus-circle' style={styles.centeredTabIcon}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Tabs

