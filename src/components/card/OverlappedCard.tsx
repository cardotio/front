import moment from 'moment';
import React from 'react';
import { FcBusinessman } from 'react-icons/fc';
import styled from 'styled-components';
import { TypeCard } from 'types';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: auto;
  padding: 5px;
`;
const Card = styled.div`
  width: 190px;
  height: 120px;
  margin-bottom: 6px;
  padding: 4px 8px;
  line-height: 25px;
  background: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: rgb(67 71 85 / 27%) 0px 0px 0.1em,
    rgb(90 125 188 / 5%) 0px 0.1em 1em;
  cursor: pointer;

  font-family: 'Noto Sans KR', sans-serif !important;

  position: relative;

  &:hover {
    background: #e8e8e8b3;
  }
`;
const Preview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  box-sizing: border-box;
  height: 100%;
`;

const Cardname = styled.div``;
const Creator = styled.div`
  display: flex;
`;
const CreatorImage = styled.div`
  display: flex;
  svg {
    width: 20px;
    height: 20px;
  }
`;
const Creatorname = styled.div`
  color: #5e6c84;
  font-size: 12px;
  line-height: 19px;
`;

const CreatedDate = styled.div`
  color: #5e6c84;
  font-size: 12px;
  line-height: 19px;
`;

const Sub = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface OverlappedCardProps {
  lastCard: TypeCard;
}

function OverlappedCard({ lastCard }: OverlappedCardProps) {
  return (
    <Wrapper>
      <Card>
        <Preview>
          <Cardname>{lastCard.cardname}</Cardname>
          <Sub>
            <Creator>
              <CreatorImage>
                <FcBusinessman />
              </CreatorImage>
              <Creatorname>{lastCard.creator?.displayname}</Creatorname>
            </Creator>

            <CreatedDate>{moment(lastCard.createdDate).fromNow()}</CreatedDate>
          </Sub>
        </Preview>
      </Card>
    </Wrapper>
  );
}

export default React.memo(OverlappedCard);
