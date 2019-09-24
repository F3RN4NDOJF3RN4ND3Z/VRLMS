  
import {AppRegistry} from 'react-360';
import InteractiveObject from './src/Containers/InteractiveObject/InteractiveObject';
import SideMenu from './src/Components/SideMenu/SideMenu';
import DetailPanel from './src/Components/DetailPanel/DetailPanel';

AppRegistry.registerComponent('SideMenu', () => SideMenu);
AppRegistry.registerComponent('DetailPanel', () => DetailPanel);
AppRegistry.registerComponent('Scene', () => InteractiveObject);
AppRegistry.registerComponent('InteractiveObject', () => InteractiveObject);

