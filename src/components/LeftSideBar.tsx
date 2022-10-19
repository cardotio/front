import { addTeamModalOpenAtom, myTeamsAtom, userInfoAtom } from 'atoms';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeTeam } from 'types';
import Team from './Team';

const Wrapper = styled.aside`
  min-width: 240px;
  height: 100vh;
  background: #f7f7f7;
  padding: 15px 5px;
  border-right: 1px solid lightgray;
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 84px;
  padding: 7px 10px;
  margin-bottom: 14px;
  border-width: 0.1px 0.1px 0px 0.1px;
  border-style: solid;
  border-color: #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
const HeaderLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 71px;
  height: 71px;
  border-radius: 71px;
  border: 1px solid black;
  margin-right: 5px;
`;
const HeaderImg = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 65px;
  background: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhcYGRUaHR0fHRwaHBocGB8aGhocHBkeHRwcIS4lHB4rHxoaJjgnKy8xNTU1HCU7QDs0Py40NTEBDAwMEA8QHhISHjQrJCQxNDQ0NDQxNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0PzQ0NDQ0NDQ0NDQ0NP/AABEIAPUAzgMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAUDBgcCAQj/xAA/EAACAQIEAwYEBAQFAgcAAAABAgADEQQSITEFQVEGImFxgaETMpGxQlLB0Qcj4fAUFWJygjPxNEOSorLC0//EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAcEQEBAQADAQEBAAAAAAAAAAAAARECITESQWH/2gAMAwEAAhEDEQA/AOvxEQEREBERAREQEREBEiNi+8VAFhuSR9hr9bSn4t2to0LZiDfzJ+g5Rqa2OJpidp69Z1OGVKiX724YbXzA2y76HXabcK66XIB6XhWWJ8DjrPsBERAREQEREBERAREQEREBERAREQET4TPDNfyhLceMRXA7t+8RoBqfPwHiZrXaDtTTw2ZD36oANi1t9td/pLzEozLdMuY8ydNNmNtWtyEq37O0CrZ7M7/PUYKXbwGYHKPAdIqbvrmeJ7U16jMM+VSLBV0UXIJsOptudZAw2FfE1kpBrsxtcm9huTNh432HYMTh2DqdgSqkHoToNeW2smdhOzFalX+NXXIqKcqsQWYsLbAmwtcyY1q17O9kXwtdXWsHW1mBXKdeQGYgj7TYaXDlQvUY5nuSWI1C9FB+WV2E4wKlWqVv8OmR3hazEG9gT5a7zGO0SM7DMuxvrcDoPGNTtc0ndtT3VsLc2N/PafcNxEBzTJ1tdb+X9D9Jq3Ge1ZCOVy5lCt4HWxHsTKSl2g+OyOO7VU/8SCRp/fj1jSR1im4InuaPhKNf4jPd/htqvezOLC4BHgbgf1m50ahI1Fjp5f08pV8ZYiICIiAiIgIiICIiAiIgJiq1bbC5+g+swY3F5WCj5j/X20J9Jrfa7jFSlRPw0zEixb8o5mwN/wBoS6vf8xvvYdCLlb8tZU8axFSvRZKLZW1D6jbnre/tNO4J2lApMKj6tmNidbgXv62mepx9WovUVgHQrfT5le+g66zOrkSOLdqmogUqe9lytYWIsLHf+7TS8bxGs7Zs7MeZJPt0krtGqhaZR1dWBYEfhLG7Lv1N/rKak7ucp+XnYWlXpMocUqBHTMbMCLg3H9JhHG6+UoHaxFjrrboW3t4SK4yaBuett9Ok908Ulu+pJ6739YxFouPdaQTOVTW4BsWJ3v1mFcUo5292+gkTEVUZAR8w0mPBWAL2uRYAeJ2jFXCU2dbOSqE6rzNtrn1MrxTZKoVGAOYZWOlhfcz1SxSA94ln/Mdh4CRMRWzPm5coK6pR45Tw9IK+KBc7lUDH0W+nnGF7WXfJmGddL6hX01urC6t4TUex3B6VVs+IchBsoNifM8h5TY+OcHQ0UFCzPTZtWIDMuptmAF7aeUGRtGF4+nw/iO6BQdQGB7vM23BG9iOVpfgzjvFuCVKVNKmp+IjOyndGC3Yabg3uJ0LsTjGfCUg984UAE63X8GvlYekqZjYYiICIiAiIgIiICIkfGVwi3va+n9/b1gat2gxRpYo1HH8s01RTyz5mZgeh+X0nqtSLYYsBmd1uTvq21ui6zXe2PaHDuj01ZmcH8OgzA3+8ruz3bY4cGnWQug0BBBK6bG/KQV3FuAPRBzKQoGbNra50ybfNfLp4+Eo0qCxHM+3n9Zedse064ll+GmVF5n5iT1toAOk1YVSNtINZDcXtqL7TIld7WXQS17L8HNdje9t/OX3FOy2QdzQ9JNVpSU+sy/DEsH4UV0sfOe04M5IFiL9RLqKsIJkyW52lhU4SyEaXHWRkwpLkb62jR5oYYbgAjn0mPG0TcEDyA2l0uDyAabzM+CzLqD9PtGrimwTuoK3ItuPDr5ay4wGJqrbI7DW++x8jKbFM+cINxsba6+MsWcot7629b8oWLvFcddwEqEOx7o8idb22vot5d4arjERclTC3UD+UoIsN8ubYHztNBwanMGJNzz/WWQp/BYJUDsG7y1A7ak8wL2BHPQwjtVNwwDDYz1KrsupGFp3YtoxBO9i7W9rS1lQiIgIiICIiAlB2ho1MyuveQA3FwArBWsT1BJHkQPW/lV2oqFcLWYAmy6gb5cwzkeIW59Io5JxngRDNWxFYKrfJkQZ3I3stwFUfmJ9JqtSiWu6B2QfiI+5Gkt+OcSaqQpJKqAqm1tBztyvvLSr2iVkWlSoqtNVtqddtTINUp1gfmmUIm+56THjaOpYDQ/SesCmqnlKOi9lsmGph6ly7C4UbgDmbbACWbdq8K+jAgeN9+espMMMNkvUd7m2YKxGbzA5Sj4ricNmsi5AOZYlj5LMK3M8Yw2mQ299fHqJgxXE6ZuVIuAdvKaMvFKY0BbztPYx4PiD9YxW31aP8sX5WJ+s+U2orrpfraSVwVQpnZlsR8o2t521M117KSb6C+/KMMXwxtAWNixHh+88YniaMLKgPnaaq3GkPdBfzC6feSsHjKQN7/wDqVgPqRaMOmTH2+dbjqAfsekpDis+gvr15eQmzYgBhsLW5bSrelSVs2XbWwB9/WWKy8PpArr8w08RMldfiOlEMAMwFzrYsQPoJXEZru+gGirtc8hIq1cp0vnJvpvfqOkYlfoHB4ZadNKa3yooUX3sotc+MzSs7O8QavhqdRxZyCGttmUlSR52v6yzmmSIiAiIgIiICfGUEEEXB0IOxB3n2IHKO3PY9aP8AMoD+WQSU1JUi3yk7g3vrtY76CaC9bTKtgfEe07V244slFFVnClwbA31tvqAevhOG497u21rmQeM520B5jrL2jw9gq6bgGV3BML8asiH8wv5DX7Azr2G4cpA0FhpJasc0amxOWzWOgC/M7clU8hzJkvFdna6IW7im2iJa+nIsdb28Z0erwVFs6pmcDQ2u1+duY32Fpr+LFRmK/wCHdl52FRfY3+8m1XM6qONHBHgd/MX1kzhGEd6iJr3mA9P+15uWI7O1nOlNKfTm/qbk/U+kv+znZZaNnbvP1P6S6mY2NcABRCW/Bb2nHeP03Usg2F79fCdvDfy/Q+05rxjhnxlYro+tvHWL0nH9aNw+nc/MVPhoZPp4eoHAUsUI1a5IG97g6TPh+HMDlKXbmCNR+4l3g+HMv/l6c/lI+8WrFZgMQclht9vD++UOO8C23P8ASbUnDFAvlANvD9JVY7CaNp4+8asa7iRmvcnONQPw2O4HjLDspwJ8TXyg2sMzsR8q3A06tyA/aQmBOckg5c32P7Tqn8PsFSXCpVTV6g77c8ykgr4AH67yxK2PB4VKaKiCyoLAfv1POZoiVCIiAiIgIiICIiBR9q+DDE4dxkDVVVjTuPxWvl8mIA99JwJqXfZCpVrN3GuGBymwsdd5+mZW9ocMHw1ZcgZsjlQRfvKpK28QQLSDhnZBlGJXwNh43BWdgwrgACcepYNqWJRlIszCwNxo5AB8rka+E6ImKPrJarbErCenrE6cpQ4HEE7yzWqLRKliTmUDb1mE8SQOqA3c6WEh4vE2XTeQMFiaGGDPiGUV3uQDq4W2ijpfXz9I0xtoTuWmkYyqKT5H0vtJjdtqViRe/Qggytqcbp1ldagy5xYE8iL2I8QZLdXjKmthwbGwJ5GZVQAaSBw/EMFCty59RyMnF4HnEVLaSm4hUyo7WvYSTi31ldxIfyW8be8n6sjUuHAnOx2sb+Jadj7B4cpg0v8AjZmHlfKP/jf1mp9mezX+IOZu7QUi4A7zHQlQeXK55es6bSpqqhVACqAABsANABNxK9RESoREQEREBERAREQEREDkXbHBnDYmzIDSa7UmsLrc3K3/ANLcuhBkvh7lqaOdyPSdLxeCp1VyVUR1vezqGF9r2Ox1nLeFOAtRMpQU6rqENwVUsSoIOosDb0meUXVzhqlrycj3EpEOstsA458pmLVngsLchm1tsJQ/xD7OnEKj00u66G25Xl6iTMbx1aZ8LzJi+19BAACSbAki1tR4zWxMrl6O1HuOpBH5r395jJV3zgEuSNzoAOglzx3iFHEvmuLjdiVBt/x0MiYFKYN0ytY7BpNab7hUzovW32Ex17rIHD+KgELr6+UkYrEhpExGdrmS8Dws4hlp3KrfMxGpCjp4kkD1kFDLrsxiWGKVBsabs3kGQL73ier+N0w9BUUIgCqosAJkiJ0YIiICIiAiIgIiICIiAiIgJonbekKeIp1FX/qowcjbNTK5CfEh2F/9I6Te5pH8SMJXdab00LombNluWUkrY2HLTflJVihSvJCYm2015TUQKXR0zC4zAi46i+4k3C4wHeYxpsGB4elY9+5EY/GLgjlo0qZpne69+/8Au3PrJnBWWXr8PpOO+qsPGWRm1zDi/GaVY3ekgbrpce0wYakliLKQeom+cQ4JgUH/AEkzSjfgNFWDISBf5b6SXrpZULB8NRFzC9zc6n2mXlLDEFQtuUiIsiwpcpm7MYhjj0y6qQ6G35QhN/LOo9pB4jixTXT520X9TLz+GXDwvxqh1NwoJ6HvH7LNcZ2XxvsRE2wREQEREBERAREQEREBERATywPI2NxyvpfUfTn/ANp6iBrPbLBB1Ukbgi/iNR9zOYOlmI2INj5zsPaBbov+8e6tOadoOHEHOvrM1YwYXiLodNfCW6drGAtlN5qVHEG9jvJQcGZsaWGJ4m7tmJnqli3OxPrIHxhJC4kcpFifmP4jeecRjlRST/fhK3E4wKLk/uZWu5c3J8hylkLSpWZ3ztz26AeE6/2IpgYVCN2Zi3mDlHsBOWYLC35TqXYn/wANbo7D2U/rLPWb42CIibZIiICIiAiIgIiICIiAiIgIiIEHjSXpN/ps3oDr7Xmq42mGFjN3qIGBU7EEHyOk0iudNdxM8hqmO4EWJKaGUmIwboe9cfadb4dw5Ciu4LEi+5AF9hYSQeE4dtTSQ/7hf2aJxpeTjNHNm8OslM5Gt52dKSqLKoA6AAD6CQMdwuhWBD00J62ysP8AkLGX5ScnE6rl33NuvP8AoJbYDClrW25y/wCM9iGQ56BLpzQ/OB4EaN7HznzheFssnLpuXWXDYWwmzdj8UqF6RNixzL4m3eHnYA+hlUFsJHVGzqVJBBuCNwRsRMS5T10mJT8M4uWW1RSG/MB3T5jkZOPEE8T5CdNjKVEj08Wh528xM6uDsQZR9iIgIiICIiAiIgIiICIiB8c2GkiFFW5CrfmbC95KqbGRWF9OsJVfUxWR8rfK+qnlfmvnz9ZJz9JUPxBLmlVtdTz9iDI9Xi6g2U6e0z9NfK++JPLv0lVQ4ip56zN/iR1jU+Ut6kpMdQW5Zd/xD/7CSsRX0OspaJqviWCZSmRb3JFySdtOg5yW6sjO1plwFC7Fumg6eMkjhrFrDRd9bXHh4yxpYUKABJ8015RLTKomRUn0r02mpE15Xwnpm1CjfrMVWqF30M94FCRmO5+3KP4LHBpYHf1N5ImLD85lmgiIgIiICIiAiIgIiIHxhcWkGgx57jQ+Y0k53AFybCVnxgWYjQE/p/SEqp7S8A/xAzIclQbNa4Pgw5ic+x+AxFC/xKbhR+NDmT15j1nVmqTGLG9xeS8ZVnKxybDcWNxla9uR3mw0OM3A3PrMHa7gqi9WkjU3GrAC6sOZFtAefjNaweKDGx0P3mLG5d9bhWx+mhmfs7Uzux56fvNYq4gIpJOk2XsPhHKGo4t8Qlh/t5e0Q5eL3HY34ZXpcb9NvWWNM32MouNopIDjRdQfEa2PhPHDeKA27w1tz1+k1OWVnOm0Io5/0nzEYhVU/mANh5C8pOJcYy91SLnW4lJiuKlBn3cg2ueot9IvJPlNTEtVrBb3VbFunUD9fpNoRuU0zskh7zN8zEsfXb2t9Zt1N+9JFqyw3P0/WZ5Gwh39P1kmbQiIgIiICIiAiIgJ4q1AouZ5rVwviekr6lXMdYCrVLnXYbCRHYhwOVreu4/WSWU2JHQyMW1PmD9ZEemOs9o08uReeS0KyEA+s1XjfYpKpz07U3vuo7h815HxE2S8+VahioqOFdj6KKPjWrPpe98g8l5+Z9psTKF0FvCYMMddd5krCBVdosPnoOU+YAm3kL6TXaHDUamNLNbcafW0vuIYooN9/vylDWxgQMPMATPK9tyVFp0wm+p5TBjGuVLfKLk+QmTEYoOwtyFvXnI7d+olMa/ifnzuF9r+kzGm39nqZCZiLFtbdL7D6Wl5TEg4BLKBLGjNcYxU/B8/T9ZJkXBG9/T9ZKm0IiICIiAiIgJGr4jkv1/aSHW4te3lMBwo6n2gQmS+0wIhv1Nz95aDCjqfafFwSjmfb9oEblKyubEjwt6DUe1pff4YdT7TFW4arG5LDS2lv2hIp7318p9Uy1ThiD8Te37QeGp1b2/aZxVSzTCTLs8LTq3t+08/5Qn5m9v2lwVtN56ap4ywHCU/M/t+0+NwdD+J/b9oGr8VwxcHKdfOc94tjHSoyMpzc7+Otx1naG4Ih/E//t/aUPFP4e4euwdqtYEC3dNPa5PND1mfntrXJ/8AN35KJsfZDCEnOdWJuZtKfwswwN/jYg+tP/8AOX2B7J0qQsrufPL+iy3iaxYYaSZTktOGIObe37TKuCUcz7ftEjNMDz9P1kmYqFAJexOvWZZoIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiB//9k=');
  background-size: contain;
  background-repeat: no-repeat;
`;
const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
`;
const HeaderTeamname = styled.div`
  margin-bottom: 6px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
`;
const HeaderTeamSet = styled.div`
  margin-left: 8px;
  margin-bottom: 7px;
  color: #878787;
  font-family: 'IBM Plex Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 12px;
`;
const HeaderTeamPub = styled.div`
  margin-left: 8px;
  color: #878787;
  font-family: 'IBM Plex Sans', sans-serif;
  font-style: italic;
  font-weight: 600;
  font-size: 8px;
  line-height: 10px;
`;
const Teams = styled.div`
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

interface LeftBarProps {
  isFetching: boolean;
}

function LeftSideBar({ isFetching }: LeftBarProps) {
  const teamname = useLocation().pathname.split('/')[2];
  const [addTeamModalOpen, setAddTeamModalOpen] =
    useRecoilState(addTeamModalOpenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [myTeams, setMyTeams] = useRecoilState(myTeamsAtom);

  const onAddTeam = () => {
    setAddTeamModalOpen(true);
  };

  return (
    <Wrapper>
      {isFetching ? (
        <div>Loading</div>
      ) : (
        <>
          <Header>
            <HeaderLeft>
              <HeaderImg />
            </HeaderLeft>
            <HeaderRight>
              <HeaderTeamname>{teamname}</HeaderTeamname>
              <HeaderTeamSet>
                <div>Team Settings</div>
                <div>Team Plan</div>
              </HeaderTeamSet>
              <HeaderTeamPub>2022/1/17 published</HeaderTeamPub>
            </HeaderRight>
          </Header>
          <Teams>
            {myTeams.map((team, i) => (
              <Team key={i} team={team} />
            ))}
          </Teams>
        </>
      )}
      <button onClick={onAddTeam}>+</button>
    </Wrapper>
  );
}

export default React.memo(LeftSideBar);
