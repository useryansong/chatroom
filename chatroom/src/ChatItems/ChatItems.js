import React from 'react'

const ChatItems = ({ chatMsgs }) => {

    return (
        <div>
            {chatMsgs.map((chatMsgs, index) => {
                const { username, content, create_time } = chatMsgs
                return (
                    <div key={index} style={styles.chatDiv}>
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
    },
    chatDiv: {
        margin: 10
    }
}

export default ChatItems