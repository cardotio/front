import { userTokenAtom } from 'atoms';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

function Invite() {
  const teamname = useLocation().pathname.split('/')[2];
  const [token, setToken] = useRecoilState(userTokenAtom);
  const navigate = useNavigate();
  useEffect(() => {
    !token && navigate('/login', { state: { fromInvite: true } });
  }, []);

  const handleAccept = () => {};
  return (
    <div>
      <h1 style={{ color: 'white' }}>Welcome to the Team, {teamname}</h1>
      <button onClick={handleAccept}>Accept</button>
      <button>Reject</button>
    </div>
  );
}
export default Invite;
