import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoAddOutline } from 'react-icons/io5';
import { TbDragDrop2 } from 'react-icons/tb';
import { useRecoilState } from 'recoil';
import { contentsAtom, currentLineAtom } from 'atoms';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
  min-height: 1em;
  color: rgb(122 121 118);

  svg {
    opacity: 0;
    stroke: rgba(0, 0, 0, 0.5);
  }
  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  margin-left: 5px;
  background: transparent;
  outline: none;
  border: none;
  font-size: 16px;
  line-height: 1.5;

  &::placeholder {
    color: transparent;
  }
  &:focus::placeholder {
    color: rgba(55, 53, 47, 0.5);
  }
`;

const IconContainer = styled.div`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

interface BlockProps {
  index: number;
  type?: string;
  text?: string;
}

function Block({ index, type, text }: BlockProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [contents, setContents] = useRecoilState(contentsAtom);
  const [currentLine, setCurrentLine] = useRecoilState(currentLineAtom);

  const handleOnChange = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setCurrentLine(index + 1);
      if (index + 1 === contents.length) {
        setContents((prev) => [
          ...prev,
          {
            type: 'empty',
            text: '',
          },
        ]);
      }
    }
  };

  useEffect(() => {
    index === currentLine && inputRef.current?.focus();
  }, [currentLine]);

  return (
    <Wrapper>
      <IconContainer>
        <IoAddOutline />
      </IconContainer>
      <IconContainer>
        <TbDragDrop2 />
      </IconContainer>
      <Input
        ref={inputRef}
        placeholder='명령어 사용 시 "/"를 입력하세요'
        defaultValue={text}
        onKeyDown={handleOnChange}
      />
    </Wrapper>
  );
}

export default React.memo(Block);
