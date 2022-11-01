import { getOnlyTime } from 'helper/dateFormatter';
import React from 'react';
import { TypeMessageInfo } from 'types';

interface MessageProps {
  message: TypeMessageInfo;
}
function MyMessageBox({ message }: MessageProps) {
  return (
    <div className="message message-opponent">
      <div className="message-box message-box-opponent">{message.content}</div>
      <div className="message-info">
        <div className="unread-number">
          {message.unread > 0 ? message.unread : ''}
        </div>
        <div className="created-date">{getOnlyTime(message.createdDate)}</div>
      </div>
    </div>
  );
}

export default React.memo(MyMessageBox);
