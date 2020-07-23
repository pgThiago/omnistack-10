import React from 'react';

import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

import styles from '../Styles/ProfileStyles';


function Profile({ route }){

    const username = route.params.github_username;

    return (
        <WebView  source={{ uri: `https://github.com/${username}` }} />
    )
}

export default Profile;