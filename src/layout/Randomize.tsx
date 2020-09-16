import React, { useState } from 'react';
import Elements from '../components';
import shuffle from '../utils/shuffle';
import { Col } from '../styles/Flex';
import Input from '../Input';
import styled from 'styled-components';

import 'string_score';
import { definedThemes } from '../utils/colors';
import DynamicBanner from './DynamicLayout';
import { ElementSuggestion } from '../Input';

export type MatchedElement = { key: ElementKey; matchesWords: { value: string; score: number }[] };

type ElementKey = keyof typeof Elements;
const ElementKeys = Object.keys(Elements);
const maxIteration = 10000;
const threshold = 0.65;

const Randomize = () => {
  const [suggestion, setSuggestion] = useState<ElementSuggestion | null>(null);
  let combinations: Array<MatchedElement[]> = [];
  const ids = shuffle(ElementKeys).filter((id) => (suggestion?.[id]?.score || 0) > threshold);
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

  let i = 0;
  const findCombinations = (availableElementIds: ElementKey[], current: MatchedElement[], space: number) => {
    i++;
    if (i > maxIteration) return;
    const matched: MatchedElement[] = [];
    const remained = [...availableElementIds];
    for (let id of availableElementIds) {
      remained.pop();
      const isFirst = current.length === 0;
      const el = Elements[id];
      const size = el.meta.percentage;
      const isLast = space - size <= findMinAndCanBeLast(remained);
      const isCenter = !isLast && !isFirst;
      // check if this element can be put in this position
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
        matched.push({ key: id, matchesWords: [] });
      }
    }
    // no more elements can be put into the banner
    if (matched.length === 0 && space >= 0) {
      combinations.push(current);
    }
    // continue with next slot
    else {
      matched.forEach((m) => {
        findCombinations(
          // remove last matched one from available id list
          availableElementIds.filter((s) => s !== m.key),
          [...current, m],
          space - Elements[m.key].meta.percentage,
        );
      });
    }
  };

  findCombinations(ids, [], 100);

  console.log(`${combinations.length} combinations from ${ids.length} elements (${i} iterations)`);

  const banners = definedThemes.map((theme, i) => {
    const n = i * ~~(combinations.length / 10);
    let borderType: BannerBorderType = '';
    let rseed = Math.random();
    if (rseed < 0.2) borderType = '';
    else if (rseed < 0.4) borderType = 'dotted';
    else if (rseed < 0.6) borderType = 'dashed';
    else if (rseed < 0.8) borderType = 'solid';
    else borderType = 'solid';
    return <DynamicBanner key={i} border={borderType} colors={theme(borderType)} elements={combinations[n] || []} />;
  });

  return (
    <StyledContainer>
      <StyledLayer>
        <img src={require('../assets/imgs/header.png')} alt="foo" />
        <Input commitChange={setSuggestion} />
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
