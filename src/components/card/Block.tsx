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

const Input = styled.input`
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

const TypeDropdown = styled.ul`
  position: absolute;
  top: 35px;
  left: 40px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 324px;
  min-width: 180px;
  max-width: calc(100vw - 24px);
  height: 275px;
  background: white;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.2;
  border-radius: 5px;
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
  pointer-events: auto;
`;

const ItemContainer = styled.li`
  width: 100%;
  height: 55px;
`;

const styles = {
  none: {},
  br: {
    width: '100%',
    height: '1px',
    background: 'rgba(55, 53, 47, 0.16)',
  },
  h1: {
    fontWeight: 600,
    fontSize: '1.875em',
    lineHeight: 1.3,
  },
  h2: {
    fontWeight: 600,
    fontSize: '1.5em',
    lineHeight: 1.3,
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.25em',
    lineHeight: 1.3,
  },
};
interface BlockProps {
  index: number;
  content: TypeBlock;
}

function Block({ index, content }: BlockProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [contents, setContents] = useRecoilState(contentsAtom);
  const [currentLine, setCurrentLine] = useRecoilState(currentLineAtom);
  const [showTextMenu, setShowTextMenu] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [newType, setNewType] = useState(content.type);
  const [newText, setNewText] = useState(content.text);
  const [newColor, setNewColor] = useState(content.color);

  const handleOnKeydown = (e: any) => {
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
      setContents((prev) => {
        let copy = [...prev];
        copy.splice(index, 1, {
          type: newType,
          text: inputRef.current!.value,
          color: newColor,
        });
        return copy;
      });
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
  };

  const handleOnSelect = (e: any) => {
    const selection = e.target.value.substring(
      e.target.selectionStart,
      e.target.selectionEnd,
    );
    // console.log(selection);
    // if (selection !== '') setShowTextMenu(true);
  };

  const handleOnBlur = () => {
    // setShowTextMenu(false);
  };

  const handleOnInput = (e: any) => {
    setShowTypeDropdown(e.target.value === '/');
  };

  const handleSelectType = (type: 'none' | 'h1' | 'h2' | 'h3' | 'br') => {
    setNewType(type);
    inputRef.current!.value = '';
    inputRef.current!.focus();
    setShowTypeDropdown(false);
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
      {content.type === 'br' ? (
        <div style={styles[content.type]} />
      ) : (
        <Input
          ref={inputRef}
          placeholder='명령어 사용 시 "/"를 입력하세요'
          onKeyDown={handleOnKeydown}
          onInput={handleOnInput}
          onFocus={() => setCurrentLine(index)}
          onSelect={handleOnSelect}
          onBlur={handleOnBlur}
          style={{ ...styles[newType], color: newType }}
          defaultValue={content.text}
        />
      )}
      {showTypeDropdown && (
        <TypeDropdown>
          <ItemContainer>
            <button onClick={() => handleSelectType('none')}>텍스트</button>
          </ItemContainer>
          <ItemContainer>
            <button onClick={() => handleSelectType('h1')}>제목1</button>
          </ItemContainer>
          <ItemContainer>
            <button onClick={() => handleSelectType('h2')}>제목2</button>
          </ItemContainer>
          <ItemContainer>
            <button onClick={() => handleSelectType('h3')}>제목3</button>
          </ItemContainer>
          <ItemContainer>
            <button onClick={() => handleSelectType('br')}>구분선</button>
          </ItemContainer>
        </TypeDropdown>
      )}
      {showTextMenu && <TextMenuWrapper />}
    </Wrapper>
  );
}

export default React.memo(Block);
