import ImportantDevicesTwoToneIcon from "@material-ui/icons/ImportantDevicesTwoTone";
import StorageTwoToneIcon from "@material-ui/icons/StorageTwoTone";
import CalendarViewDayTwoToneIcon from "@material-ui/icons/CalendarViewDayTwoTone";
import ApartmentTwoToneIcon from "@material-ui/icons/ApartmentTwoTone";
import RouterTwoToneIcon from "@material-ui/icons/RouterTwoTone";
import PublicTwoToneIcon from "@material-ui/icons/PublicTwoTone";
import PublishTwoToneIcon from "@material-ui/icons/PublishTwoTone";
import SettingsBackupRestoreTwoToneIcon from "@material-ui/icons/SettingsBackupRestoreTwoTone";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ShareTwoToneIcon from "@material-ui/icons/ShareTwoTone";

export const mainNavigation = [
    {
        title: 'Station',
        link: '/',
        icon: <ImportantDevicesTwoToneIcon />,
        iconLarge: <ImportantDevicesTwoToneIcon className="Logo" />
    },
    {
        title: 'Servers',
        link: '/servers',
        icon: <StorageTwoToneIcon />,
        iconLarge: <StorageTwoToneIcon className="Logo" />
    },
    {
        title: 'Server Racks',
        link: '/racks',
        icon: <CalendarViewDayTwoToneIcon />,
        iconLarge: <CalendarViewDayTwoToneIcon className="Logo" />
    },
    {
        title: 'Data Centers',
        link: '/dataCenters',
        icon: <ApartmentTwoToneIcon />,
        iconLarge: <ApartmentTwoToneIcon className="Logo" />
    },
    {
        title: 'Networks',
        link: '/networks',
        icon: <RouterTwoToneIcon />,
        iconLarge: <RouterTwoToneIcon className="Logo" />
    },
    {
        title: 'Dark Web',
        link: '/darkWeb',
        icon: <PublicTwoToneIcon />,
        iconLarge: <PublicTwoToneIcon className="Logo" />
    },
    {
        title: 'Neural Net',
        link: '/neuralNet',
        icon: <ShareTwoToneIcon />,
        iconLarge: <ShareTwoToneIcon className="Logo" />
    },
];

export const secondaryNavigation = [
    {
        title: 'Perm Upgrades',
        link: '/upgrades',
        icon: <PublishTwoToneIcon />,
        iconLarge: <PublishTwoToneIcon className="Logo" />
    },
    {
        title: 'Prestige',
        link: '/prestige',
        icon: <SettingsBackupRestoreTwoToneIcon />,
        iconLarge: <SettingsBackupRestoreTwoToneIcon className="Logo" />
    },
    {
        title: 'Statistics',
        link: '/stats',
        icon: <AssignmentIcon />,
        iconLarge: <AssignmentIcon className="Logo" />
    },
];