import React, { useState } from 'react';
import Elements from '../components';
import { Col } from '../styles/Flex';
import Input from '../Input';
import styled from 'styled-components';

import 'string_score';
import { definedThemes } from '../utils/colors';
import DynamicBanner from './DynamicLayout';
import { ElementSuggestion } from '../Input';

export type MatchedElement = { key: ElementKey; predictedValues: string[] | null; debug?: any };

type ElementKey = keyof typeof Elements;
const ElementKeys = Object.keys(Elements);
const maxIteration = 10000;
const threshold = 0.45;
const maxResults = 25;

const Randomize = () => {
  const [suggestion, setSuggestion] = useState<ElementSuggestion | null>(null);
  let combinations: Array<{ score: number; els: MatchedElement[] }> = [];
  const ids = ElementKeys.filter((id) => (suggestion?.[id]?.score || 0) > threshold);
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
  const findCombinations = (
    availableElementIds: ElementKey[],
    current: MatchedElement[],
    space: number,
    score: number = 0,
  ) => {
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
      const predict = el.predict;
      const hasPredict = predict && suggestion;
      let predictedValues = null;
      let predictFulfill = false;
      if (predict && suggestion) {
        const predictResult = predict(suggestion[id]);
        if (predictResult.fulfill) {
          predictFulfill = predictResult.fulfill;
          predictedValues = predictResult.values;
        }
      }
      // check if this element can be put in this position
      if (
        (isFirst && el.meta.position === 'right') ||
        (isLast && el.meta.position === 'left') ||
        ((isFirst || isLast) && el.meta.position === 'center') ||
        (isCenter && el.meta.position !== 'center' && el.meta.position !== 'any') ||
        // when the element provides predict function and it failed to pass it
        // we consider all the words are not suitable for that element
        (hasPredict && predictFulfill === false)
      ) {
        continue;
      }
      // found matched
      if (space - size >= 0) {
        matched.push({ key: id, predictedValues, debug: suggestion?.[id] });
      }
    }
    // no more elements can be put into the banner
    if (matched.length === 0 && space >= 0) {
      combinations.push({ els: current, score });
    }
    // continue with next slot
    else {
      matched.forEach((m) => {
        findCombinations(
          // remove last matched one from available id list
          availableElementIds.filter((s) => s !== m.key),
          [...current, m],
          space - Elements[m.key].meta.percentage,
          score + (suggestion?.[m.key]?.score || 0),
        );
      });
    }
  };

  findCombinations(ids, [], 100);
  combinations = combinations.sort((a, b) => -(a.score - b.score));
  console.log(`${combinations.length} combinations from ${ids.length} elements (${i} iterations)`);
  console.log(combinations.slice(0, maxResults));
  const banners = combinations.slice(0, maxResults).map((comb, i) => {
    let borderType: BannerBorderType = '';
    let rseed = Math.random();
    if (rseed < 0.2) borderType = '';
    else if (rseed < 0.4) borderType = 'dotted';
    else if (rseed < 0.6) borderType = 'dashed';
    else if (rseed < 0.8) borderType = 'double';
    else borderType = 'solid';
    return (
      <DynamicBanner
        key={i}
        border={borderType}
        colors={definedThemes[i % definedThemes.length](borderType)}
        elements={comb.els || []}
        suggestion={suggestion}
      />
    );
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
