import React from 'react';
import Header from 'react-native-elements'

function NavBar() {
    return (
        <Header
          backgroundColor="#5f9ea0"
          placement="left"
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Home', style: { color: '#fff' } }}
        />
    );
}
export default NavBar;