import { useLocation } from 'react-router-dom';

function Invite() {
  const { pathname } = useLocation();

  const handleAccept = () => {};
  return (
    <div>
      <h1 style={{ color: 'white' }}>
        Welcome to the Team, {pathname.split('/')[2]}
      </h1>
      <button onClick={handleAccept}>Accept</button>
      <button>Reject</button>
    </div>
  );
}
export default Invite;
