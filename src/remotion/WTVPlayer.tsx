'use client';

import React from 'react';
import { Player } from '@remotion/player';
import {
  LiveFeedComposition,
  BlockReportComposition,
  MapLayerComposition,
  SearchComposition,
  SpotCardComposition,
  FoodCardComposition,
  EventCardComposition,
  TransitCardComposition,
} from './WTVCompositions';

type WTVScene =
  | 'live-feed'
  | 'block-report'
  | 'map-layer'
  | 'search'
  | 'spot-card'
  | 'food-card'
  | 'event-card'
  | 'transit-card';

const SCENES: Record<WTVScene, { component: React.ComponentType; durationInFrames: number }> = {
  'live-feed':     { component: LiveFeedComposition,    durationInFrames: 180 },
  'block-report':  { component: BlockReportComposition, durationInFrames: 150 },
  'map-layer':     { component: MapLayerComposition,    durationInFrames: 150 },
  'search':        { component: SearchComposition,      durationInFrames: 180 },
  'spot-card':     { component: SpotCardComposition,    durationInFrames: 140 },
  'food-card':     { component: FoodCardComposition,    durationInFrames: 140 },
  'event-card':    { component: EventCardComposition,   durationInFrames: 150 },
  'transit-card':  { component: TransitCardComposition, durationInFrames: 150 },
};

interface WTVPlayerProps {
  scene: WTVScene;
}

export function WTVPlayer({ scene }: WTVPlayerProps) {
  const { component, durationInFrames } = SCENES[scene];

  return (
    <Player
      component={component}
      durationInFrames={durationInFrames}
      fps={30}
      compositionWidth={390}
      compositionHeight={845}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      autoPlay
      loop
      controls={false}
      clickToPlay={false}
      spaceKeyToPlayOrPause={false}
      showVolumeControls={false}
      allowFullscreen={false}
    />
  );
}
