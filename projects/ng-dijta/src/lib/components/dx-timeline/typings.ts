const TimelineModes = ['left', 'alternate', 'right', 'custom'] as const;
export type DxTimelineMode = typeof TimelineModes[number];

const TimelinePositions = ['left', 'right'] as const;
export type DxTimelinePosition = typeof TimelinePositions[number];

export const TimelineTimeDefaultColors = ['red', 'blue', 'green', 'grey', 'gray', 'transprant'] as const;
export type DxTimelineItemColor = typeof TimelineTimeDefaultColors[number];