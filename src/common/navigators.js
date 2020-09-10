import { AppName } from './config';
import iconRank from '../assets/images/rank_on_icon.png';
import iconRankOff from '../assets/images/rank_off_icon.png';
import iconHome from '../assets/images/home_on_icon.png';
import iconHomeOff from '../assets/images/home_off_icon.png';
import iconProfile from '../assets/images/profile_on_icon.png';
import iconProfileOff from '../assets/images/profile_off_icon.png';
import iconToy from '../assets/images/toy_on_icon.png';
import iconToyOff from '../assets/images/toy_off_icon.png';
import iconCabinet from '../assets/images/cabinet_on_icon.png';
import iconCabinetOff from '../assets/images/cabinet_off_icon.png';

const list = [{
  value: 0,
  tabTitle: '排行榜',
  pageTitle: '排行榜',
  name: 'PageRank',
  icon: iconRankOff,
  activeIcon: iconRank,
  pos: 0,
}, {
  value: 3,
  tabTitle: '玩物',
  pageTitle: '玩物',
  name: 'PageToy',
  icon: iconToyOff,
  activeIcon: iconToy,
  pos: 0,
}, {
  value: 1,
  tabTitle: '主页',
  pageTitle: AppName,
  name: 'PageHome',
  icon: iconHomeOff,
  activeIcon: iconHome,
  pos: 0,
}, {
  value: 4,
  tabTitle: '蛋柜',
  pageTitle: '我的蛋柜',
  name: 'PageCabinetMain',
  icon: iconCabinetOff,
  activeIcon: iconCabinet,
  pos: 0,
}, {
  value: 2,
  tabTitle: '我的',
  pageTitle: '我的',
  name: 'PageMine',
  icon: iconProfileOff,
  activeIcon: iconProfile,
  pos: 0,
}];

export default {
  list,
};
