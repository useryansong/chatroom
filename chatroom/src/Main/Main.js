import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import ChatItems from '../ChatItems/ChatItems'
import './Main.css'

const { TextArea } = Input
const Main = () => {
    const [chatMsgs, setChatMsgs] = useState([]);
    const [content, setContent] = useState('')
    console.log(chatMsgs)


    useEffect(() => {
        axios.get('./main')
            .then(res => {
                setChatMsgs(
                    res.data.data.map(s => ({
                        ...s
                    }))
                );
            })
    }, []);

    const updateChat = () => {
        const username = Cookies.get('username');
        axios.post('./updateChat', { username, content })
            .then(res => {
                setContent('')
            })
    };

    const onChange2 = (e) => {
        setContent(e.target.value)
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
                        <Button>Log Out</Button>
                    </div>
                </div>
                <div className='chatroomDiv'>
                    <ChatItems chatMsgs={chatMsgs}/>
                </div>
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