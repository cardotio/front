import { API_URL } from 'api';
import { selectedTeamAtom, userTokenAtom } from 'atoms';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

function Invite() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(userTokenAtom);
  const [currentTeam, setCurrentTeam] = useRecoilState(selectedTeamAtom);
  const teamId = useLocation().pathname.split('/')[2];
  const teamCode = useLocation().pathname.split('/')[3];
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const handleAccept = () => {
    console.log(`Invitation Accepted: /teams/${teamId}/users`);
    axios
      .post(
        API_URL + `/teams/${teamId}/users`,
        {
          teamCode,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        navigate(`/team/${teamId}`);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const handleReject = () => {
    alert("You've rejected the invitation");
    navigate('/team/me');
  };

  useEffect(() => {
    !token && navigate('/login', { state: { fromInvite: true } });

    console.log(`GET INVITING TEAM INFO: /teams/simple/${teamId}`);
    axios
      .get(API_URL + `/teams/simple/${teamId}`)
      .then((response: AxiosResponse) => {
        console.log(response);
        setCurrentTeam(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    currentTeam?.teamCode === teamCode && setIsValid(true);
  }, [currentTeam]);

  return (
    <div>
      {isLoading ? (
        <div style={{ color: 'white' }}>Loading...</div>
      ) : isValid ? (
        <>
          <h1 style={{ color: 'white' }}>
            Welcome to the Team, {currentTeam?.teamname}
          </h1>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleReject}>Reject</button>
        </>
      ) : (
        <div style={{ color: 'white' }}>
          ERROR CODE 404: THIS PAGE IS INVALID
        </div>
      )}
    </div>
  );
}
export default Invite;
