import { PanelPlugin } from '@grafana/data';
import { TabbedTimeSeriesPanel } from './TabbedTimeSeriesPanel';
import { TabbedTimeSeriesOptions } from './types';

export const plugin = new PanelPlugin<TabbedTimeSeriesOptions>(TabbedTimeSeriesPanel)
  .useFieldConfig()
  .setPanelOptions((builder, context) => {
    const opts = context?.data?.series?.map((s) => ({
      label: s.name || s.refId || '',
      value: s.refId || ''
    })) || [];

    builder.addSelect({
      path: 'initialQueryRefId',
      name: 'Initial query',
      description: 'Select which query to show first',
      settings: {
        options: opts
      },
      defaultValue: ''
    });

    builder.addBooleanSwitch({
      path: 'rememberLast',
      name: 'Remember last tab',
      defaultValue: false
    });
  });
