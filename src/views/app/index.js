import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import VCode from 'react-validation-code';
import 'moment/locale/zh-cn';
import 'normalize.css';

import './index.less';

import UnsplashJPG from '../../assets/images/jasmin-chew-3nu3sAP0RbY-unsplash.jpg';

moment.locale('zh-cn');

function getResult(r) {
    console.log(r);
}

function App() {
    return (
        <div className="App">
            <ConfigProvider locale={zhCN}>
                <VCode
                    getResult={getResult}
                    tips
                    tipsWord="换一张"
                    placeholder="xxx"
                    doneCom='正确'
                />
                <img src={UnsplashJPG} alt="UnsplashJPG" />
            </ConfigProvider>
        </div>
    );
}

export default App;
