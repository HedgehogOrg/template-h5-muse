import { AppName } from './config';
import iconRank from '../assets/images/icon_rank_on_81x81.png';
import iconRankOff from '../assets/images/icon_rank_off_81x81.png';
import iconHome from '../assets/images/icon_home_on_132x132.png';
import iconHomeOff from '../assets/images/icon_home_off_102x102.png';
import iconProfile from '../assets/images/icon_profile_on_81x81.png';
import iconProfileOff from '../assets/images/icon_profile_off_81x81.png';
import iconToy from '../assets/images/icon_toy_on_49x60.png';
import iconToyOff from '../assets/images/icon_toy_off_60x60.png';
import iconCabinet from '../assets/images/icon_cabinet_on_59x60.png';
import iconCabinetOff from '../assets/images/icon_cabinet_off_60x60.png';

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
