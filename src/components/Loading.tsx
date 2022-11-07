import Spinner from 'react-spinner-material';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 830px;
`;

function Loading() {
  return (
    <Wrapper>
      <Spinner radius={50} color={'#fff'} stroke={1} visible={true} />
    </Wrapper>
  );
}

export default Loading;
