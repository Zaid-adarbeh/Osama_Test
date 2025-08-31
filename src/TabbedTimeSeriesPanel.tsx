import React, { useEffect, useMemo, useState } from 'react';
import { PanelProps, DataFrame } from '@grafana/data';
import { TabsBar, Tab, TimeSeries, NoDataOverlay } from '@grafana/ui';
import { TabbedTimeSeriesOptions } from './types';

export const TabbedTimeSeriesPanel: React.FC<PanelProps<TabbedTimeSeriesOptions>> = (props) => {
  const { data, width, height, timeRange, options, fieldConfig, id, timeZone, onFieldConfigChange, replaceVariables, theme } = props;

  const frames = data.series || [];

  const tabs = useMemo(() => {
    return frames.map((f) => ({
      refId: f.refId || '',
      label: f.name || f.refId || ''
    }));
  }, [frames]);

  const storageKey = `tabbed-timeseries-panel-${id}`;

  const initial = useMemo(() => {
    const stored = options.rememberLast ? window.localStorage.getItem(storageKey) : undefined;
    if (stored && tabs.some((t) => t.refId === stored)) {
      return stored;
    }
    if (options.initialQueryRefId && tabs.some((t) => t.refId === options.initialQueryRefId)) {
      return options.initialQueryRefId;
    }
    return tabs[0]?.refId;
  }, [options.initialQueryRefId, options.rememberLast, tabs, storageKey]);

  const [active, setActive] = useState<string | undefined>(initial);

  useEffect(() => {
    if (options.rememberLast && active) {
      window.localStorage.setItem(storageKey, active);
    }
  }, [active, options.rememberLast, storageKey]);

  // ensure active tab exists when data updates
  useEffect(() => {
    if (!active && tabs.length > 0) {
      setActive(tabs[0].refId);
    } else if (active && tabs.every((t) => t.refId !== active)) {
      setActive(tabs[0]?.refId);
    }
  }, [tabs, active]);

  const filtered = useMemo(() => {
    const series = frames.filter((f) => f.refId === active);
    return { ...data, series };
  }, [data, frames, active]);

  if (frames.length === 0) {
    return <NoDataOverlay width={width} height={height} />;
  }

  const TAB_HEIGHT = 32;
  return (
    <div style={{ width, height, display: 'flex', flexDirection: 'column' }}>
      <TabsBar>
        {tabs.map((t) => (
          <Tab key={t.refId} label={t.label} active={t.refId === active} onChangeTab={() => setActive(t.refId)} />
        ))}
      </TabsBar>
      <div style={{ flexGrow: 1 }}>
        {filtered.series.length > 0 ? (
          <TimeSeries
            {...props}
            width={width}
            height={height - TAB_HEIGHT}
            data={filtered}
            timeRange={timeRange}
            timeZone={timeZone}
            fieldConfig={fieldConfig}
            onFieldConfigChange={onFieldConfigChange}
            replaceVariables={replaceVariables}
            theme={theme}
          />
        ) : (
          <NoDataOverlay width={width} height={height - TAB_HEIGHT} />
        )}
      </div>
    </div>
  );
};
