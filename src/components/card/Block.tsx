import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoAddOutline } from 'react-icons/io5';
import { TbDragDrop2 } from 'react-icons/tb';
import { useRecoilState } from 'recoil';
import { contentsAtom, currentLineAtom } from 'atoms';
import { TypeBlock } from 'types';

const Wrapper = styled.div`
  position: relative;
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

const Input = styled.div`
  width: 100%;
  margin-left: 5px;
  background: transparent;
  outline: none;
  border: none;
  font-size: 16px;
  line-height: 1.5;
  resize: none;

  &::placeholder {
    color: transparent;
  }
  &:focus::placeholder {
    color: rgba(55, 53, 47, 0.5);
  }
  [contenteditable][placeholder]:empty:before {
    color: rgba(55, 53, 47, 0.5);
  }
`;

const IconContainer = styled.div`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const TextMenuWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  top: -40px;
  left: 0px;
  display: flex;
  width: 550px;
  height: 32px;
  background: white;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.2;
  border-radius: 5px;
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
  pointer-events: auto;
`;

interface BlockProps {
  index: number;
  content: TypeBlock;
}

function Block({ index, content }: BlockProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [contents, setContents] = useRecoilState(contentsAtom);
  const [currentLine, setCurrentLine] = useRecoilState(currentLineAtom);
  const [showTextMenu, setShowTextMenu] = useState(false);

  const handleOnChange = (e: any) => {
    console.log(e.key, index);

    if (e.key === 'ArrowDown' && !e.shiftKey) {
      e.preventDefault();
      contents[index + 1]?.type === 'br'
        ? index <= contents.length - 2 && setCurrentLine(index + 2)
        : index <= contents.length - 1 && setCurrentLine(index + 1);
    }

    if (e.key === 'ArrowUp' && !e.shiftKey) {
      e.preventDefault();
      contents[index - 1]?.type === 'br'
        ? index >= 2 && setCurrentLine(index - 2)
        : index >= 1 && setCurrentLine(index - 1);
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setCurrentLine(index + 1);

      if (index + 1 === contents.length || contents[index + 1].type === 'br') {
        e.preventDefault();
        setContents((prev) => {
          let copy = [...prev];
          copy.splice(index, 0, {
            type: 'none',
            color: '#000000',
            text: '',
          });
          return copy;
        });
      }
    }

    if (e.key === 'Backspace' && !e.shiftKey) {
      if (e.target.value === '') {
        contents[index - 1]?.type === 'br'
          ? index >= 2 && setCurrentLine(index - 2)
          : index >= 1 && setCurrentLine(index - 1);
        setContents((prev) => {
          let copy = [...prev];
          copy.splice(index, 1);
          return copy;
        });
        e.preventDefault();
      }
    }

    if (e.key === '/') {
    }
  };

  const handleOnSelect = (e: any) => {
    const selection = e.target.value.substring(
      e.target.selectionStart,
      e.target.selectionEnd,
    );
    console.log(selection);
    if (selection !== '') setShowTextMenu(true);
  };

  const handleOnBlur = () => {
    setShowTextMenu(false);
  };

  useEffect(() => {
    index === currentLine && inputRef.current?.focus();
  }, [currentLine]);

  return (
    <Wrapper ref={wrapperRef}>
      <IconContainer>
        <IoAddOutline />
      </IconContainer>
      <IconContainer>
        <TbDragDrop2 />
      </IconContainer>
      <Input
        ref={inputRef}
        placeholder='명령어 사용 시 "/"를 입력하세요'
        onKeyDown={handleOnChange}
        onFocus={() => setCurrentLine(index)}
        onSelect={handleOnSelect}
        onBlur={handleOnBlur}
        style={{ color: content.color, fontWeight: 'normal' }}
        contentEditable
      >
        <i>{content.text}</i>
      </Input>
      {showTextMenu && <TextMenuWrapper />}
    </Wrapper>
  );
}

export default React.memo(Block);
