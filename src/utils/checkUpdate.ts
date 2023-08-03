import axios from 'axios';
import {compare} from 'compare-versions';
import DeviceInfo from 'react-native-device-info';

const updateList = [
    'https://gitee.com/orange886/MusicCorgi/raw/master/release/version.json',
    'https://raw.githubusercontent.com/orange886/MusicCorgi/master/release/version.json',
];

interface IUpdateInfo {
    needUpdate: boolean;
    data: {
        version: string;
        changeLog: string[];
        download: string[];
    };
}

export default async function checkUpdate(): Promise<IUpdateInfo | undefined> {
    const currentVersion = DeviceInfo.getVersion();
    for (let i = 0; i < updateList.length; ++i) {
        try {
            const rawInfo = (await axios.get(updateList[i])).data;
            if (compare(rawInfo.version, currentVersion, '>')) {
                return {
                    needUpdate: true,
                    data: rawInfo,
                };
            }
        } catch {}
    }
}
