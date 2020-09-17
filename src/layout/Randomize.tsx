import React, { useState, useCallback, useMemo } from 'react';
import Elements from '../components';
import { Col } from '../styles/Flex';
import Input from '../Input';
import styled from 'styled-components';

import 'string_score';
import { definedThemes } from '../utils/colors';
import DynamicBanner from './DynamicLayout';

export type MatchedElement = {
  key: ElementKey;
  predictedValues: string[] | null;
  debug?: any;
  consumedWords?: string[];
};

type ElementKey = keyof typeof Elements;
const ElementKeys = Object.keys(Elements);
const maxIteration = 10000;
const threshold = 0.35;
const maxResults = 30;

const Randomize = () => {
  const [suggestion, setSuggestion] = useState<ElementSuggestion | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const ids = ElementKeys.filter((id) => (suggestion?.[id]?.score || 0) > threshold).sort(
    (a, b) => -((suggestion?.[a].score || -1) - (suggestion?.[b].score || -1)),
  );
  console.table(
    ids.map((id) => {
      return [id, suggestion?.[id].score] || 0;
    }),
  );
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
  const combinationsMemo = useMemo(() => {
    let combinations: Array<{ score: number; els: MatchedElement[] }> = [];
    const findCombinations = (
      availableElementIds: ElementKey[],
      current: MatchedElement[],
      space: number,
      score: number = 0,
      dictionary: Record<string, boolean>,
    ) => {
      i++;
      if (i > maxIteration) return;
      const matched: MatchedElement[] = [];
      const remained = [...availableElementIds];

      for (let id of availableElementIds) {
        remained.shift();
        const isFirst = current.length === 0;
        const el = Elements[id];
        const size = el.meta.percentage;
        const isLast = space - size <= findMinAndCanBeLast(remained);
        const isCenter = !isLast && !isFirst;
        const predict = el.predict;
        const hasPredict = predict && suggestion;
        let predictedResult = null;
        if (predict && suggestion) {
          predictedResult = predict(suggestion[id], { ...dictionary });
        }
        // check if this element can be put in this position
        if (
          (isFirst && el.meta.position === 'right') ||
          (isLast && el.meta.position === 'left') ||
          ((isFirst || isLast) && el.meta.position === 'center') ||
          (isCenter && el.meta.position !== 'center' && el.meta.position !== 'any') ||
          // when the element provides predict function and it failed to pass it
          // we consider all the words are not suitable for that element
          (hasPredict && !predictedResult?.fulfill)
        ) {
          continue;
        }
        // found matched
        if (space - size >= 0) {
          matched.push({
            key: id,
            predictedValues: predictedResult?.values || [],
            debug: suggestion?.[id],
            consumedWords: hasPredict ? predictedResult?.consumedWords || [] : [],
          });
        }
      }
      // no more elements can be put into the banner
      if (matched.length === 0 && space >= 0 && score > 0) {
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
            {
              ...dictionary,
              // remove used words from dictionary so they won't repeat
              ...(m.consumedWords || []).reduce<typeof dictionary>((removed, word) => {
                removed[word] = false;
                return removed;
              }, {}),
            },
          );
        });
      }
    };

    findCombinations(
      ids,
      [],
      96,
      0,
      words.reduce<Record<string, boolean>>((dict, word) => {
        dict[word] = true;
        return dict;
      }, {}),
    );
    return combinations.sort((a, b) => -(a.score - b.score));
  }, [words.join('')]);

  console.log(`${combinationsMemo.length} combinations from ${ids.length} elements (${i} iterations)`);
  console.log(combinationsMemo.slice(0, maxResults));
  const banners = combinationsMemo.slice(0, maxResults).map((comb, i) => {
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
  const onChangeCallback = useCallback((nextSuggestion: ElementSuggestion, nextWords: string[]) => {
    setSuggestion(nextSuggestion);
    setWords(nextWords);
  }, []);

  return (
    <StyledContainer>
      <StyledLayer>
        <img src={require('../assets/imgs/header.png')} alt="foo" />
        <Input commitChange={onChangeCallback} />
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
