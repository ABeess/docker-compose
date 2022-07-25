// components
import { PATH_DASHBOARD } from 'src/routes/paths';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const sidebarConfig = [
  {
    subheader: 'general v3.3.0',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.courses.list, icon: ICONS.dashboard },
      { title: 'Courses', path: PATH_DASHBOARD.courses.list, icon: ICONS.ecommerce },
    ],
  },
];

export default sidebarConfig;
