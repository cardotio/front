import { getOnlyTime } from 'helper/dateFormatter';
import React from 'react';
import { TypeMessageInfo } from 'types';

interface MessageProps {
  message: TypeMessageInfo;
}
function MyMessageBox({ message }: MessageProps) {
  return (
    <div className="message message-my">
      <div className="message-box message-box-my">{message.content}</div>
      <div className="message-info">
        <div className="unread-number unread-number-my">
          {message.unread > 0 ? message.unread : ''}
        </div>
        <div className="created-date">{getOnlyTime(message.createdDate)}</div>
      </div>
    </div>
  );
}

export default React.memo(MyMessageBox);
