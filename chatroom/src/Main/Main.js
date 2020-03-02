import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import Cookies from 'js-cookie'
import { Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'



import ChatItems from '../ChatItems/ChatItems'
import './Main.css'
import io from 'socket.io-client'

const socket = io('ws://localhost:4000')

const { TextArea } = Input
const Main = () => {
    const [chatMsgs, setChatMsgs] = useState([]);
    const [content, setContent] = useState('')
    let history = useHistory()

    
    useEffect(() => {
        socket.on('receiveMsg', function (data) {
            setChatMsgs(chatMsgs.concat(data))
        },[chatMsgs])
    })



    const currentTime = () => {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();

        let hh = now.getHours();
        let mm = now.getMinutes();
        let ss = now.getSeconds();

        let clock = year + '-';

        if (month < 10)
            clock += '0';

        clock += month + "-";

        if (day < 10)
            clock += "0";

        clock += day + " ";

        if (hh < 10)
            clock += "0";

        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm + ":";

        if (ss < 10) clock += '0';
        clock += ss;
        return (clock);
    };

    const updateChat = () => {
        const username = Cookies.get('username');
        const create_time = currentTime();
        // axios.post('./updateChat', { username, content, create_time })
        //     .then(res => {
        //         setContent('')
        //     })
        //send msg to server
        socket.emit('sendMsg', {username, content, create_time});
        setContent('')
    };

    const onChange2 = (e) => {
        setContent(e.target.value)
    };

    const logOut = () => {
        Cookies.remove('userid');
        history.replace('./login')
    };



    const userid = Cookies.get('userid')
    if (!userid) {
        return <Redirect to='./login' />
    }
    return (
        <div className='outer'>
            <div className='inner'>
                <div className='innerHeader'>
                    <div className='roomName'>
                        Chatroom
                    </div>
                    <div>
                        <Button onClick={logOut}>Log Out</Button>
                    </div>
                </div>
                {/* display chat messages */}
                <div className='chatroomDiv'>
                    <ChatItems chatMsgs={chatMsgs} />
                </div>
                {/* input area */}
                <div className='textouter'>
                    <TextArea
                        placeholder="Autosize height with minimum and maximum number of lines"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        value={content}
                        onChange={onChange2}
                    />
                    <Button type='primary' onClick={updateChat}>Send</Button>
                </div>
            </div>

        </div>
    )
}

export default Main