import React from 'react'

import Cookies from 'js-cookie'


const ChatItems = ({ chatMsgs }) => {

    return (
        <div>
            {chatMsgs.map((chatMsgs, index) => {
                const { username, content, create_time } = chatMsgs
                const username2 = Cookies.get('username');
                console.log(username2,username,index)
                return (
                    // compare username of login and username of chatMsgs, if yes, bgc is green
                
                    <div key={index} style={{margin:10, backgroundColor:(username===username2)? "green":"white"}}>
                        {console.log(username===username2)}
                        <p style={styles.chatUsername}>{username}</p>
                        <p style={styles.chatContent}>{content}</p>
                        <p>{create_time}</p>
                    </div>
                )
            })}
        </div>
    )

}

const styles = {
    chatUsername: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom:5
    },
    chatContent: {
        fontSize: 16
    }
}

export default ChatItems