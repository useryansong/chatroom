import React from 'react'

const ChatItems = ({ chatMsgs }) => {
    return (
        <div>
            {chatMsgs.map((chatMsgs, index) => {
                const { username, content} = chatMsgs
                return (
                    <div key={index}><p>{username}: {content}</p></div>
                )
            })}
        </div>
    )

}

export default ChatItems