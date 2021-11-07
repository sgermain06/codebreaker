import ImportantDevicesTwoToneIcon from "@mui/icons-material/ImportantDevicesTwoTone";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import CalendarViewDayTwoToneIcon from "@mui/icons-material/CalendarViewDayTwoTone";
import ApartmentTwoToneIcon from "@mui/icons-material/ApartmentTwoTone";
import RouterTwoToneIcon from "@mui/icons-material/RouterTwoTone";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import PublishTwoToneIcon from "@mui/icons-material/PublishTwoTone";
import SettingsBackupRestoreTwoToneIcon from "@mui/icons-material/SettingsBackupRestoreTwoTone";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';

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
        title: 'Forums',
        link: '/forums',
        icon: <ForumTwoToneIcon />,
        iconLarge: <ForumTwoToneIcon className="Logo" />
    },
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