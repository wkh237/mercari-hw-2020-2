import React, { useState } from 'react';
import Elements from '../components';
import shuffle from '../utils/shuffle';
import { Col } from '../styles/Flex';
import Input from '../Input';
import styled from 'styled-components';

import 'string_score';
import { definedThemes } from '../utils/colors';
import DynamicBanner from './DynamicLayout';

type ElementKey = keyof typeof Elements;

const Randomize = () => {
  const [userInput, setUserInput] = useState<string>('');

  let combinations: Array<ElementKey[]> = [];
  let maxIteration = 100;
  let i = 0;
  const ids = shuffle(Object.keys(Elements));

  const findMinAndCanBeLast = (ids: string[]) => {
    let min = 100;
    for (let id of ids) {
      const meta = Elements[id].meta;
      if (meta.percentage < min && meta.position !== 'right' && meta.position !== 'center') {
        min = meta.percentage;
      }
    }
    return min;
  };

  const findCombinations = (availableElementIds: ElementKey[], current: ElementKey[], space: number) => {
    i++;
    if (i > maxIteration) return;
    const matched: string[] = [];
    const remained = [...availableElementIds];
    for (let id of availableElementIds) {
      remained.pop();
      const isFirst = current.length === 0;
      const el = Elements[id];
      const size = el.meta.percentage;
      const isLast = space - size <= findMinAndCanBeLast(remained);
      const isCenter = !isLast && !isFirst;
      if (
        (isFirst && el.meta.position === 'right') ||
        (isLast && el.meta.position === 'left') ||
        ((isFirst || isLast) && el.meta.position === 'center') ||
        (isCenter && el.meta.position !== 'center' && el.meta.position !== 'any')
      ) {
        continue;
      }
      // found matched
      if (space - size >= 0) {
        if (matched.indexOf(id) !== -1 && el.meta.type === 'point') {
          // no op
        }
        // // check correlation
        // //@ts-ignore
        // const score = userInput.score(el.defaultProps.values.join(' '), 0.5);
        // console.log({ score });
        // if (score > 0.1) {

        // }
        matched.push(id);
      }
    }
    // no more elements can be put into the banner
    if (matched.length === 0 && space >= 0) {
      combinations.push(current);
    }
    // continue with next slot
    else {
      matched.forEach((id) => {
        findCombinations(
          // remove last matched one from available id list
          availableElementIds.filter((s) => s !== id),
          [...current, id],
          space - Elements[id].meta.percentage,
        );
      });
    }
  };
  findCombinations(ids, [], 100);
  console.log(`${combinations.length} combinations (${maxIteration} iterations)`);
  combinations = combinations.filter((combination) => {
    const combinationScore = combination.reduce((acc, cur) => {
      const values = Elements[cur].defaultProps.values.join(' ');
      //@ts-ignore
      const score = userInput.score(values, 0.5);
      acc += score;
      return acc;
    }, 0);
    return combinationScore > 0.2 ? true : false;
  });
  const banners = definedThemes.map((theme, i) => {
    const n = i * ~~(combinations.length / 10);
    let borderType: BannerBorderType = '';
    let rseed = Math.random();
    if (rseed < 0.2) borderType = '';
    else if (rseed < 0.4) borderType = 'dotted';
    else if (rseed < 0.6) borderType = 'dashed';
    else if (rseed < 0.8) borderType = 'solid';
    else borderType = 'solid';
    return (
      <DynamicBanner
        key={i}
        border={borderType}
        colors={theme(borderType)}
        elements={
          combinations[n]?.map((id) => ({
            id,
            props: {},
          })) || []
        }
      />
    );
  });
  return (
    <StyledContainer>
      <StyledLayer>
        <img src={require('../assets/imgs/header.png')} alt="foo" />
        <Input setUserInput={setUserInput} />
        <Col>{banners}</Col>
      </StyledLayer>
    </StyledContainer>
  );
};

const StyledLayer = styled(Col)`
  width: 700px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  > img {
    margin-bottom: 16px;
    width: 600px;
  }
  > div {
    width: 600px;
  }
`;

const StyledContainer = styled(Col)`
  align-items: center;
  justify-content: center;
`;

export default Randomize;
